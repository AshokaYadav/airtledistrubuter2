// TransactionPopup.js
import React from 'react';
import { useSelector } from 'react-redux';
import { resetTransactionState } from '../../app/redux/slices/transactionSlice';

const TransactionPopup = ({ transactio, onClose }) => {
    const {collectorTransaction}=useSelector(state=>state.transaction);
    console.log(collectorTransaction?.transaction)
    // console.log(collectorTransaction?.transaction.collectorcollectorTransaction?.transaction?.collectorTransaction?.transaction);
  if (!collectorTransaction?.transaction) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Collection Successful</h2>
        <div className="space-y-2 text-gray-800">
          <p><strong>Retailer Name:</strong> {collectorTransaction?.transaction.Retailer_Name}</p>
          <p><strong>Amount:</strong> ₹{collectorTransaction?.transaction.amount}</p>
          <p><strong>Type:</strong> {collectorTransaction?.transaction.type}</p>
          <p><strong>Remark:</strong> {collectorTransaction?.transaction.remark}</p>
          <p><strong>Collector Mobile:</strong> {collectorTransaction?.transaction.collectorMobileno}</p>
          <p><strong>Shop Mobile:</strong> {collectorTransaction?.transaction.shopMobileno}</p>
          <p><strong>Collector Balance Before:</strong> ₹{collectorTransaction?.transaction.collectorBalanceBefore}</p>
          <p><strong>Collector Balance After:</strong> ₹{collectorTransaction?.transaction.collectorBalanceAfter}</p>
          <p><strong>Shop Balance Before:</strong> ₹{collectorTransaction?.transaction.shopBalanceBefore}</p>
          <p><strong>Shop Balance After:</strong> ₹{collectorTransaction?.transaction.shopBalanceAfter}</p>
          <p><strong>Time:</strong> {new Date(collectorTransaction?.transaction.createdAt).toLocaleString()}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TransactionPopup;
