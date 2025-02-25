import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../components/title";
import {
  faAngleLeft,
  faAngleRight,
  faDiagramProject,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./ProjectStatus.css";
import { Link } from "react-router";

function ProjectStatus() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      projectName: "Project Alpha",
      date: "2023-01-10",
      status: "مكتمل",
      amountPaid: "1000",
    },
    {
      id: 2,
      projectName: "Project Beta",
      date: "2023-05-20",
      status: "قيد التنفيذ",
      amountPaid: "2000",
    },
    {
      id: 3,
      projectName: "Project Gamma",
      date: "2024-01-01",
      status: "معلق",
      amountPaid: "0",
    },
    {
      id: 4,
      projectName: "Project Delta",
      date: "2024-02-15",
      status: "مكتمل",
      amountPaid: "1500",
    },
    {
      id: 5,
      projectName: "Project Epsilon",
      date: "2024-03-01",
      status: "قيد التنفيذ",
      amountPaid: "3000",
    },
    {
      id: 6,
      projectName: "Project Zeta",
      date: "2024-04-10",
      status: "معلق",
      amountPaid: "0",
    },
    {
      id: 7,
      projectName: "Project Eta",
      date: "2024-05-12",
      status: "مكتمل",
      amountPaid: "5000",
    },
    {
      id: 8,
      projectName: "Project Theta",
      date: "2024-06-22",
      status: "In Progress",
      amountPaid: "2500",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showInProgress, setShowInProgress] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  const rowsPerPage = 4;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const filteredProjects = projects.filter((project) => {
    if (showCompleted && showInProgress) {
      return true;
    } else if (showCompleted) {
      return project.status === "مكتمل";
    } else if (showInProgress) {
      return project.status !== "مكتمل";
    }
    return true;
  });

  const currentProjects = filteredProjects.slice(
    indexOfFirstRow,
    indexOfLastRow
  );
  const totalPages = Math.ceil(filteredProjects.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const toggleActionMenu = (projectId) => {
    console.log("Toggling menu for project:", projectId);
    setActionMenuOpen((prev) => (prev === projectId ? null : projectId));
  };

  return (
    <>
      <div className="project-status">
        <Title
          title="حالة المشاريع"
          icon={<FontAwesomeIcon icon={faDiagramProject} />}
          style={{ width: "unset" }}
        />

        <div className="projectTable-con">
          <table className="projectTable" border="1">
            <thead>
              <tr>
                <th>تسلسل</th>
                <th>إسم المشروع</th>
                <th>التاريخ</th>
                <th>حالة المشروع</th>
                <th>المبلغ المدفوع</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((project, index) => (
                <tr key={project.id}>
                  <td>{indexOfFirstRow + index + 1}</td>
                  <td>{project.projectName}</td>
                  <td>{project.date}</td>
                  <td>{project.status}</td>
                  <td>{project.amountPaid}</td>
                  <td>
                    <div className="projectActions-container">
                      <button
                        className="ellipsis-button"
                        onClick={() => {
                          toggleActionMenu(project.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </button>
                      {actionMenuOpen === project.id && (
                        <div className="dropdown-menuStatus">
                          <Link to="/paymentvoucher" className="statusAc">عملية دفع</Link>
                          <Link to="/receiptvoucher" className="statusAc">عملية قبض</Link>
                          <Link to="/casedetailschart" className="statusAc">عرض المشروع</Link>
                          <Link to="/viewdonations" className="statusAc">عرض التبرعات</Link>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan="6" className="projectTable-tfoot">
                  <div className="pagination">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </button>

                    {[...Array(totalPages).keys()].map((page) => (
                      <button
                        key={page + 1}
                        onClick={() => handlePageChange(page + 1)}
                        className={currentPage === page + 1 ? "active" : ""}
                      >
                        {page + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="projectTable-checksCon">
          <div className="projectTable-checks">
            <input
              type="checkbox"
              className="minus-checkbox"
              onChange={() => setShowCompleted(!showCompleted)}
              checked={showCompleted}
            />
            <p style={{ margin: "unset", width: "150px", textAlign: "right" }}>
              المشاريع المكتملة
            </p>
          </div>
          <div className="projectTable-checks">
            <input
              type="checkbox"
              className="minus-checkbox"
              onChange={() => setShowInProgress(!showInProgress)}
              checked={showInProgress}
            />
            <p style={{ margin: "unset", width: "150px", textAlign: "right" }}>
              المشاريع غير المكتملة
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectStatus;
