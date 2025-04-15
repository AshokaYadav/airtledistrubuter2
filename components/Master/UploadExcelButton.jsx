// components/UploadExcelButton.js
import React from "react";

const UploadExcelButton = ({ onClick,handleClose }) => {
  return (
    <div className="flex justify-between p-3 ">
      <button
        onClick={onClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Upload Excel
      </button>
      <button
            onClick={handleClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
    </div>
  );
};

export default UploadExcelButton;
