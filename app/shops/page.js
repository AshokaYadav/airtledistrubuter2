'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { fetchMasterData, fetchBanks } from '../redux/slices/masterSlice';
import TransactionTable from '@/components/Transaction/TransactionTable';
import TransactionForm from '@/components/Transaction/TransactionForm';
import { fetchBanks } from '../redux/slices/bankSlice';
import { fetchMasterData } from '../redux/slices/masterSlice';
import { fetchTransactions } from '../redux/slices/transactionSlice';
import ShopForm from '@/components/Shops/ShopForm';
import ShopTable from '@/components/Shops/ShopTable';
import { fetchshops, uploadExcelFile } from '../redux/slices/shopSlice';
// import TransactionForm from '../components/TransactionForm';
// import TransactionTable from '../components/TransactionTable';

const Shops = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  React.useEffect(() => {
    // dispatch(fetchMasterData());
    // dispatch(fetchBanks());
    dispatch(fetchshops())
  }, [dispatch]);

  const handleEdit = (data) => {
    setEditData(data);
    setIsModalOpen(true);
  };
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('file got seleceted brother...!')
      dispatch(uploadExcelFile(file));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between m-4">
      <input
          type="file"
          id="file-upload"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
          accept=".xlsx, .xls"
        />
        <label htmlFor="file-upload" className="bg-blue-500 text-white p-2 rounded cursor-pointer">
          Upload Excel
        </label>
        <button
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Shops
        </button>
      </div>

      <ShopTable onEdit={handleEdit} />
      {isModalOpen && (
        <ShopForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editData={editData}
        />
      )}
    </div>
  );
};

export default Shops;