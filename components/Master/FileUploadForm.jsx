// components/FileUploadForm.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getfileAsync, resetUpload, uploadFileAsync } from "@/app/redux/slices/fileUploadSlice";

const FileUploadForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [selectedBank, setSelectedBank] = React.useState("");

  const { successMessage, loading, error } = useSelector((state) => state.fileUpload);
  const { banks } = useSelector((state) => state.banks);

  const handleSubmit = async() => {
    if (selectedFile && selectedBank) {
      const resultAction=await dispatch(uploadFileAsync({ file: selectedFile, bankId: selectedBank }));
      
      console.log(resultAction);

      if(uploadFileAsync.fulfilled.match(resultAction)){
        dispatch(getfileAsync(2));
      }

      setTimeout(() => {
        dispatch(resetUpload());
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload File</h2>

        {loading ? (
          <p className="text-blue-600 font-medium">Uploading...</p>
        ) : successMessage ? (
          <p className="text-green-600 font-semibold">{successMessage}</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <>
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="border p-2 w-full rounded-md mb-3"
            />
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="border p-2 w-full rounded-md mb-3"
            >
              <option value="" disabled>Select Bank</option>
              {banks?.length > 0 ? (
                banks.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.bankName}
                  </option>
                ))
              ) : (
                <option disabled>No banks available</option>
              )}
            </select>
          </>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            disabled={!selectedFile || !selectedBank || loading}
          >
            {loading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadForm;
