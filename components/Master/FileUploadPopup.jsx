import React, { useState } from "react";
import UploadExcelButton from "./UploadExcelButton";
import FileUploadForm from "./FileUploadForm";
import TransactionTable from "./TransactionTable";
import { AiOutlineClose } from "react-icons/ai"; // ✅ Correct import

const FileUploadPopup = ({ open, handleClose }) => {
  const [clicked, setClicked] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-full  max-h-[90vh] overflow-y-auto relative p-6">
        
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
          onClick={handleClose}
        >
          <AiOutlineClose className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-semibold text-blue-600">
            Upload Excel File
          </h2>
          <p className="text-sm text-gray-500">
            Upload your transaction file and review below.
          </p>
        </div>

        {/* Upload Button */}
        <div className="flex justify-center mb-4">
          <UploadExcelButton onClick={() => setClicked(true)} handleClose={handleClose} />
        </div>

        {/* Upload Form (Conditional) */}
        {clicked && (
          <div className="mb-6">
            <FileUploadForm
              onClose={() => {
                setClicked(false);
              }}
            />
          </div>
        )}

        {/* Transaction Table */}
        <div>
          <TransactionTable />
        </div>
      </div>
    </div>
  );
};

export default FileUploadPopup;
