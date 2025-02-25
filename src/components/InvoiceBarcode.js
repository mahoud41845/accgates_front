import React from "react";
import Barcode from "react-barcode";

const InvoiceBarcode = ({ invoiceNumber }) => {
  return (
    <div>
      <h3>فاتورة رقم: {invoiceNumber}</h3>
      <Barcode value={invoiceNumber} />
    </div>
  );
};

export default InvoiceBarcode;
