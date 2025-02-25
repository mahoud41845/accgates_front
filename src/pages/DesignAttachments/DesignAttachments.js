import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import Title from "../../components/title";
import React, { useState } from "react";
import Modal from "react-modal";
import "./DesignAttachments.css";
import { saveAs } from "file-saver";

function DesignAttachments() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  // List of images to avoid repeating URLs
  const images = [
    {
      src: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      name: "مرفق 1",
    },
    {
      src: "https://i0.wp.com/picjumbo.com/wp-content/uploads/amazing-stone-path-in-forest-free-image.jpg?w=600&quality=80",
      name: "مرفق 2",
    },
    {
      src: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
      name: "مرفق 3",
    },
    {
      src: "https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?s=612x612&w=0&k=20&c=i4HYO7xhao7CkGy7Zc_8XSNX_iqG0vAwNsrH1ERmw2Q=",
      name: "مرفق 4",
    },
  ];

  const openModal = (src) => {
    setImageSrc(src);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setImageSrc("");
  };

  const handleCheckboxChange = (src) => {
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.includes(src)
        ? prevSelectedImages.filter((image) => image !== src)
        : [...prevSelectedImages, src]
    );
  };

  const handleSelectAll = () => {
    // If all images are selected, unselect them. Otherwise, select all.
    setSelectedImages(selectedImages.length === images.length ? [] : images.map((img) => img.src));
  };

  const handleDownload = () => {
    selectedImages.forEach((imageSrc) => {
      const fileName = imageSrc.split("/").pop().split("?")[0]; 
      saveAs(imageSrc, fileName); 
    });
  };

  return (
    <>
      <div className="designattachments">
        <Title title="عرض المرفقات" icon={<FontAwesomeIcon icon={faPaperclip} />} />
        <div className="designattachments-container">
          <div className="attachSelect">
            <button className="styled-download-button" onClick={handleSelectAll}>
              تحديد الكل
            </button>
          </div>

          <div className="attachments-row">
            {images.map((image, index) => (
              <div key={index} className="attachmentElementCont">
                <div className="attachmentElement" id="scrollimage">
                  <img
                    width="450px"
                    src={image.src}
                    alt={image.name}
                    onClick={() => openModal(image.src)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div className="attachmentElementText">
                  <input
                    type="checkbox"
                    className="minus-checkbox"
                    checked={selectedImages.includes(image.src)}
                    onChange={() => handleCheckboxChange(image.src)}
                  />
                  <p className="attachName">{image.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="attachments-row">
            <button className="attachdownload" onClick={handleDownload}>
              تحميل
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Image Modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <img src={imageSrc} alt="Attachment" style={{ width: "100%" }} />
        </div>
      </Modal>
    </>
  );
}

export default DesignAttachments;
