import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectComponent from "../../components/SelectComponent";
import Title from "../../components/title";
import { faReceipt, faEye, faXmark , faEdit } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form } from "react-bootstrap";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"; // Add icons for arrows
import "./CustomerReport.css";
import { useNavigate } from "react-router-dom";
import RegisterTextbox from "../../components/RegisterTextBox";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../../components/CustomButton";
import { useTranslation } from "react-i18next";
import "../AccountingEntry/AccountingEntry.css";



function CustomerReport() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const [invoicesPerPage] = useState(5); // Limit of 5 invoices per page
  const navigate = useNavigate();
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const { t } = useTranslation(); 
  
  const [clientData, setClientData] = useState({
    name: "",
    phone: "",
    email: "",
    balance: 0,
    description: "",
  });
  const [formMessage, setFormMessage] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [clientToDelete, setClientToDelete] = useState({
      id: null,
      name: "",
    });


useEffect(() => {
  const fetchCustomers = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      const response = await fetch("http://127.0.0.1:8000/api/customers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCustomers(data.data); // Fix: Access the "data" array inside the response
      } else {
        console.error("Failed to fetch customers");
        alert("فشل في جلب بيانات العملاء");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ أثناء جلب البيانات");
    }
  };

  fetchCustomers();
}, [navigate]);

const customerOptions = Array.isArray(customers)
  ? customers.map((customer) => ({
      value: customer.id,
      label: customer.name,
    }))
  : [];


  const handleSelectChange = (selectedOption) => {
    setSelectedCustomerId(selectedOption ? selectedOption.value : null);
  };

  const filteredCustomers = selectedCustomerId
    ? customers.filter((customer) => customer.id === selectedCustomerId)
    : customers;

   const openModal = (customer) => {
    setSelectedCustomer(customer);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCustomer(null);
    setShowAddClientModal(false);
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

   const totalInvoices = selectedCustomer?.invoices?.length || 0;
  const totalPages = Math.ceil(totalInvoices / invoicesPerPage);

   const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  


 
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setClientData((prev) => ({
      ...prev,
      [id]: id === "balance" ? Number(value) : value,
    }));
    if (formMessage) setFormMessage("");
  };

  const handleAddClientSubmit = async (e) => {
    e.preventDefault();
    setFormMessage("");

    if (!clientData.name) {
      setFormMessage("اسم العميل هو حقل إلزامي.");
      return;
    }

    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch("http://127.0.0.1:8000/api/customer/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(clientData),
      });

      if (response.ok) {
        setFormMessage("تم إضافة العميل بنجاح.");
         const updatedResponse = await fetch(
          "http://127.0.0.1:8000/api/customers",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const updatedData = await updatedResponse.json();
        setCustomers(updatedData);

         setTimeout(() => {
          setShowAddClientModal(false);
          setClientData({
            name: "",
            phone: "",
            email: "",
            balance: 0,
            description: "",
          });
        }, 2000);
      } else {
        setFormMessage("حدث خطأ أثناء إضافة العميل.");
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
          "http://127.0.0.1:8000/api/customers",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const updatedData = await updatedResponse.json();
        setCustomers(updatedData);
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
  const handleEdit = (customer) => {
    setEditClientData({
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      balance: customer.account?.balance || 0,
      description: customer.description,
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
        title={t("Customer-reports")}
        icon={<FontAwesomeIcon icon={faReceipt} />}
      />
      <div className="CustomerReport">
        <div className="form-CustomerReport">
          <SelectComponent
            label={t("Customer-name")}
            placeholder={t("Customer-name")}
            options={customerOptions}
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
            text={t("Add-customer")}
            icon={<FontAwesomeIcon icon={faPlusSquare} />}
            onClick={() => setShowAddClientModal(true)}
            style={{ width: "150px", marginLeft: "10px" }}
            className="add-clint-btn"
          />
        </div>
      </div>
      <div className="table-rportconyaner">
        <table className="table-rport">
          <thead>
            <tr>
              <th> {t("Customer-name")}</th>
              <th> {t("phoneNumber")}</th>
              <th> {t("email")} </th>
              <th> {t("Balance")}</th>
              <th>{t("Description")}</th>
              <th> {t("Actions")}</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredCustomers) &&
            filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <tr key={customer.id} onClick={() => openModal(customer)}>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
                  <td>{customer.account?.balance}</td>
                  <td>{customer.description}</td>
                  <td>
                    <div className="action-buttons">
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="edit-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(customer);
                        }}
                      />

                      <FontAwesomeIcon
                        icon={faEye}
                        className="details-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(customer);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">لا توجد بيانات متاحة</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal className="custom-modal-alt" show={modalOpen} onHide={closeModal}>
        <Modal.Header className="head-dedtal">
          <Button
            className="custom-close-button"
            variant="link"
            onClick={closeModal}
          >
            <FontAwesomeIcon icon={faXmark} className="closeModal" />
          </Button>
          <Modal.Title>{t("Customer-Details")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCustomer &&
          selectedCustomer.invoices &&
          selectedCustomer.invoices.length > 0 ? (
            <>
              <table className="table-customer-report">
                <thead className="klklk ">
                  <tr className="head-cusromer-Table">
                    <th>{t("serial")}</th>
                    <th> {t("date")}</th>
                    <th> {t("InvoiceNO")}</th>
                    <th>{t("type")}</th>
                    <th>{t("paymentMethod")}</th>
                    <th>{t("Balance")}</th>
                  </tr>
                </thead>
                <tbody className="table-customer-report-body">
                  {paginateInvoices(selectedCustomer.invoices).map(
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
            <p>{t("No-invoices-for-customer")}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="dsgwg">
            <Button onClick={closeModal}>{t("close")}</Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showAddClientModal}
        onHide={() => {
          setShowAddClientModal(false);
          setFormMessage("");
          setClientData({
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
            {t("Add-new-customer")}
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
          <form onSubmit={handleAddClientSubmit} className="input-AddSupplier">
            <div className="row g-3">
              <div className="col-md-12">
                <RegisterTextbox
                  id="name"
                  label={t("Customer-name")}
                  type="text"
                  value={clientData.name}
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
                )}{" "}
                <RegisterTextbox
                  id="phone"
                  label={t("phoneNumber")}
                  type="tel"
                  value={clientData.phone}
                  onChange={handleInputChange}
                />
                <RegisterTextbox
                  id="email"
                  label={t("email")}
                  type="email"
                  value={clientData.email}
                  onChange={handleInputChange}
                />
                <RegisterTextbox
                  id="balance"
                  label={t("Opening-balance")}
                  type="number"
                  value={clientData.balance}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-des-addclint">
                <RegisterTextbox
                  id="description"
                  label={t("Description")}
                  type="text"
                  value={clientData.description}
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
      {/* مودل التعديل */}
      <Modal
        show={showEditClientModal}
        onHide={() => setShowEditClientModal(false)}
        centered
        size="lg"
        className="edit-client-modal"
      >
        <Modal.Header className="head-dedtal">
          <Modal.Title className="modal-title-custom tableEntry">
            {t("Edit-customer")}
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

export default CustomerReport;
