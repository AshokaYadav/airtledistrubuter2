'use client'
import MasterForm from '@/components/Master/MasterForm';
import MasterTable from '@/components/Master/MasterTable';
// pages/Home.js
import { useState } from 'react';
// import MasterForm from '../components/MasterForm';
// import MasterTable from '../components/MasterTable';

const Home = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (data) => {
    setEditData(data);
    setIsFormOpen(true);
  };

  return (
    <div className="p-4">
      <div className='flex justify-end'>
      <button
        onClick={() => {
          setEditData(null);
          setIsFormOpen(true);
        }}
        className="bg-green-500 text-white p-2 rounded mb-4"
      >
        Add Data
      </button>

      </div>
      {isFormOpen && <MasterForm editData={editData} onClose={() => setIsFormOpen(false)} />}
      <MasterTable onEdit={handleEdit} />
    </div>
  );
};

export default Home;