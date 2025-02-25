import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectComponent from "../../components/SelectComponent";
import Title from "../../components/title";
import {
  faReceipt,
  faEye,
  faXmark,
  faEdit,
  faExclamationCircle,
  faTrash,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form } from "react-bootstrap";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import RegisterTextbox from "../../components/RegisterTextBox";
import CustomButton from "../../components/CustomButton";
import { useTranslation } from "react-i18next";
import'../AccountingEntry/AccountingEntry.css'
import '../CustomerReport/CustomerReport.css'
 
function SupplieRreports() {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicesPerPage] = useState(5);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [supplierData, setSupplierData] = useState({
    name: "",
    phone: "",
    email: "",
    balance: 0,
    description: "",
  });
  const [formMessage, setFormMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState({
    id: null,
    name: "",
  });

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          alert("يجب تسجيل الدخول أولاً");
          navigate("/login");
          return;
        }

        const response = await fetch("http://127.0.0.1:8000/api/suppliers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSuppliers(Array.isArray(data.data) ? data.data : []);
        } else {
          console.error("Failed to fetch suppliers");
          alert("فشل في جلب بيانات الموردين");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("حدث خطأ أثناء جلب البيانات");
      }
    };

    fetchSuppliers();
  }, [navigate, setSuppliers]); // إضافة `setSuppliers` كمُعتمد لضمان إعادة الجلب عند التحديث

  const supplierOptions = Array.isArray(suppliers)
    ? suppliers.map((supplier) => ({
        value: supplier.id,
        label: supplier.name,
      }))
    : [];

  const handleSelectChange = (selectedOption) => {
    setSelectedSupplierId(selectedOption ? selectedOption.value : null);
  };

  const filteredSuppliers = Array.isArray(suppliers)
    ? selectedSupplierId
      ? suppliers.filter((supplier) => supplier.id === selectedSupplierId)
      : suppliers
    : [];
  const openModal = (supplier) => {
    setSelectedSupplier(supplier);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSupplier(null);
  };

  const paginateInvoices = (invoices) => {
    const indexOfLastInvoice = currentPage * invoicesPerPage;
    const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
    return invoices.slice(indexOfFirstInvoice, indexOfLastInvoice);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalInvoices = selectedSupplier?.invoices?.length || 0;
  const totalPages = Math.ceil(totalInvoices / invoicesPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleDelete = (supplierId, supplierName) => {
    setSupplierToDelete({ id: supplierId, name: supplierName });
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `http://127.0.0.1:8000/api/suppliers/${supplierToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok) {
        setSuppliers(
          suppliers.filter((supplier) => supplier.id !== supplierToDelete.id)
        );
        alert("تم حذف المورد بنجاح");
      } else {
        alert("فشل في حذف المورد");
      }
    } catch (error) {
      console.error("Error deleting supplier:", error);
      alert("حدث خطأ أثناء الحذف");
    } finally {
      setShowDeleteModal(false);
      setSupplierToDelete({ id: null, name: "" });
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSupplierData((prev) => ({
      ...prev,
      [id]: id === "balance" ? Number(value) : value,
    }));
    if (formMessage) setFormMessage("");
  };

  const handleAddSupplierSubmit = async (e) => {
    e.preventDefault();
    setFormMessage("");

    if (!supplierData.name) {
      setFormMessage("اسم المورد هو حقل إلزامي.");
      return;
    }

    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch("http://127.0.0.1:8000/api/supplier/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(supplierData),
      });

      if (response.ok) {
        setFormMessage("تم إضافة المورد بنجاح.");
        const updatedResponse = await fetch(
          "http://127.0.0.1:8000/api/suppliers",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const updatedData = await updatedResponse.json();
        setSuppliers(Array.isArray(updatedData.data) ? updatedData.data : []);

        setTimeout(() => {
          setShowAddSupplierModal(false);
          setSupplierData({
            name: "",
            phone: "",
            email: "",
            balance: 0,
            description: "",
          });
        }, 2000);
      } else {
        setFormMessage("حدث خطأ أثناء إضافة المورد.");
      }
    } catch (error) {
      console.error("Error:", error);
      setFormMessage("حدث خطأ أثناء إرسال البيانات.");
    }
  };

  // مودل التعديل

  const handleUpdateClientSubmit = async (e) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `http://127.0.0.1:8000/api/customer/update/${editClientData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(editClientData),
        }
      );

      if (response.ok) {
        alert("تم تعديل بيانات العميل بنجاح");
        setShowEditClientModal(false);

        const updatedResponse = await fetch(
          "http://127.0.0.1:8000/api/suppliers",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const updatedData = await updatedResponse.json();
        setSuppliers(updatedData);
      } else {
        alert("حدث خطأ أثناء تعديل بيانات العميل.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ أثناء إرسال البيانات.");
    }
  };
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [editClientData, setEditClientData] = useState({
    id: null,
    name: "",
    phone: "",
    email: "",
    balance: 0,
    description: "",
  });
  const handleEdit = (supplier) => {
    setEditClientData({
      id: supplier.id,
      name: supplier.name,
      phone: supplier.phone,
      email: supplier.email,
      balance: supplier.account?.balance || 0,
      description: supplier.description,
    });
    setShowEditClientModal(true);
  };
  const handleEditInputChange = (e) => {
    const { id, value } = e.target;
    setEditClientData((prev) => ({
      ...prev,
      [id]: id === "balance" ? Number(value) : value,
    }));
  };

  return (
    <>
      <Title
        title={t("Supplier-reports")}
        icon={<FontAwesomeIcon icon={faReceipt} />}
      />
      <div className="CustomerReport">
        <div className="form-CustomerReport">
          <SelectComponent
            label={t("supplierName")}
            placeholder={t("supplierName")}
            options={supplierOptions}
            onChange={handleSelectChange}
            containerStyle={{ width: "20%" }}
          />
          <RegisterTextbox
            parentStyle={{ width: "20%" }}
            id="leaveTimer"
            label="من"
            type="date"
            stylee={{ width: "55%" }}
          />
          <RegisterTextbox
            parentStyle={{ width: "20%" }}
            id="arrivalTimer"
            label="الي"
            type="date"
            stylee={{ width: "55%" }}
          />
        </div>
        <div className="add-clint-btn-con">
          <CustomButton
            text={t("Add-supplier")}
            icon={<FontAwesomeIcon icon={faPlusSquare} />}
            onClick={() => setShowAddSupplierModal(true)}
            style={{ width: "150px", marginLeft: "10px" }}
            className="add-clint-btn"
          />
        </div>
      </div>
      <div className="table-rportconyaner">
        <table className="table-rport">
          <thead>
            <tr>
              <th>{t("supplierName")}</th>
              <th>{t("phoneNumber")}</th>
              <th>{t("email")}</th>
              <th>{t("Balance")}</th>
              <th>{t("Description")}</th>
              <th>{t("Actions")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.map((supplier) => (
              <tr key={supplier.id} onClick={() => openModal(supplier)}>
                <td>{supplier.name}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.email}</td>
                <td>{supplier.account.balance}</td>
                <td>{supplier.description}</td>
                <td>
                  <div className="action-buttons">
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="edit-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(supplier);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faEye}
                      className="details-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(supplier);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Supplier Details Modal */}
      <Modal className="custom-modal-alt" show={modalOpen} onHide={closeModal}>
        <Modal.Header className="head-dedtal">
          <Button
            className="custom-close-button"
            variant="link"
            onClick={closeModal}
          >
            <FontAwesomeIcon icon={faXmark} className="closeModal" />
          </Button>
          <Modal.Title>{t("Supplier-Details")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSupplier &&
          selectedSupplier.invoices &&
          selectedSupplier.invoices.length > 0 ? (
            <>
              <table className="table-customer-report">
                <thead className="klklk">
                  <tr className="head-cusromer-Table">
                    <th>{t("serial")}</th>
                    <th>{t("date")}</th>
                    <th>{t("InvoiceNO")}</th>
                    <th>{t("type")}</th>
                    <th>{t("paymentMethod")}</th>
                    <th>{t("Balance")}</th>
                  </tr>
                </thead>
                <tbody className="table-customer-report-body">
                  {paginateInvoices(selectedSupplier.invoices).map(
                    (invoice) => (
                      <tr key={invoice.id}>
                        <td>{invoice.id}</td>
                        <td>{invoice.date}</td>
                        <td>{invoice.invoice_number}</td>
                        <td>{invoice.invoice_type}</td>
                        <td>{invoice.payment_method}</td>
                        <td>{invoice.paid}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>

              <div className="pagination-numbers">
                <Button
                  className="pagination-arrow"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </Button>

                {pageNumbers.map((number) => (
                  <Button
                    key={number}
                    className={`pagination-button ${
                      currentPage === number ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(number)}
                  >
                    {number}
                  </Button>
                ))}

                <Button
                  className="pagination-arrow"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </Button>
              </div>
            </>
          ) : (
            <p>{t("No-invoices-for-supplier")}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            {t("close")}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        className="delete-confirmation-modal"
      >
        <Modal.Body className="text-center py-4">
          <div className="icon-container">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="custom-exclamation"
            />
          </div>
          <h5 className="mb-3">هل أنت متأكد من حذف المورد؟</h5>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="danger" onClick={confirmDelete} className="px-4">
              نعم
            </Button>
            <Button
              className="btn-close-delete"
              onClick={() => setShowDeleteModal(false)}
            >
              إغلاق
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Add Supplier Modal */}
      <Modal
        show={showAddSupplierModal}
        onHide={() => {
          setShowAddSupplierModal(false);
          setFormMessage("");
          setSupplierData({
            name: "",
            phone: "",
            email: "",
            balance: 0,
            description: "",
          });
        }}
        centered
        size="lg"
        className="add-client-modal"
      >
        <Modal.Header className="head-dedtal">
          <Modal.Title className="modal-title-custom  tableEntry">
            {t("Add-supplier")}
            <FontAwesomeIcon icon={faPlusSquare} className="icon-addclint" />
          </Modal.Title>
          <Button
            className="custom-close-button"
            variant="link"
            onClick={closeModal}
          >
            <FontAwesomeIcon icon={faXmark} className="closeModal" />
          </Button>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <form
            onSubmit={handleAddSupplierSubmit}
            className="input-AddSupplier"
          >
            <div className="row g-3">
              <div className="col-md-12">
                <RegisterTextbox
                  id="name"
                  label={t("supplierName")}
                  type="text"
                  value={supplierData.name}
                  onChange={handleInputChange}
                  required
                />

                {formMessage && (
                  <div
                    className={`alert ${
                      formMessage.includes("خطأ")
                        ? "alert-danger"
                        : "alert-success"
                    }`}
                  >
                    {formMessage}
                  </div>
                )}
                <RegisterTextbox
                  id="phone"
                  label={t("phoneNumber")}
                  type="tel"
                  value={supplierData.phone}
                  onChange={handleInputChange}
                />

                <RegisterTextbox
                  id="email"
                  label={t("email")}
                  type="email"
                  value={supplierData.email}
                  onChange={handleInputChange}
                />

                <RegisterTextbox
                  id="balance"
                  label={t("Opening-balance")}
                  type="number"
                  value={supplierData.balance}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-des-addsupplier">
                <RegisterTextbox
                  id="description"
                  label={t("Description")}
                  type="text"
                  value={supplierData.description}
                  onChange={handleInputChange}
                  parentStyle={{ width: "100%" }}
                  stylee={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="text-center mt-4">
              <CustomButton text={t("save")} type="submit" className="px-5" />
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* مود التعديل */}
      <Modal
        show={showEditClientModal}
        onHide={() => setShowEditClientModal(false)}
        centered
        size="lg"
        className="edit-client-modal"
      >
        <Modal.Header className="head-dedtal">
          <Modal.Title className="modal-title-custom tableEntry">
            {t("Edit-supplier")}
            <FontAwesomeIcon icon={faEdit} className="icon-edit-client" />
          </Modal.Title>
          <Button
            className="custom-close-button"
            variant="link"
            onClick={() => setShowEditClientModal(false)}
          >
            <FontAwesomeIcon icon={faXmark} className="closeModal" />
          </Button>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <form
            onSubmit={handleUpdateClientSubmit}
            className="input-EditSupplier"
          >
            <div className="row g-3">
              <div className="col-md-12">
                <Form.Group className="EditSupplier-form">
                  <Form.Label>حالة الحساب</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="غير فعال"
                      name="calculateDepreciation"
                      value="no"
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="فعال"
                      name="calculateDepreciation"
                      value="yes"
                    />
                  </div>
                </Form.Group>

                <RegisterTextbox
                  id="name"
                  label={t("Customer-name")}
                  type="text"
                  value={editClientData.name}
                  onChange={handleEditInputChange}
                  required
                />
                <RegisterTextbox
                  id="phone"
                  label={t("phoneNumber")}
                  type="tel"
                  value={editClientData.phone}
                  onChange={handleEditInputChange}
                />
                <RegisterTextbox
                  id="email"
                  label={t("email")}
                  type="email"
                  value={editClientData.email}
                  onChange={handleEditInputChange}
                />
                <RegisterTextbox
                  id="balance"
                  label={t("Opening-balance")}
                  type="number"
                  value={editClientData.balance}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="input-des-edit-client">
                <RegisterTextbox
                  id="description"
                  label={t("Description")}
                  type="text"
                  value={editClientData.description}
                  onChange={handleEditInputChange}
                  parentStyle={{ width: "100%" }}
                  stylee={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="text-center mt-4">
              <CustomButton text={t("save")} type="submit" className="px-5" />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SupplieRreports;
