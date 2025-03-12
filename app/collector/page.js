'use client'
import CollectorForm from '@/components/Collector/CollectorForm';
import { useEffect, useState } from 'react';
import { fetchMasterData } from '../redux/slices/masterSlice';
import { useDispatch, useSelector } from 'react-redux';
import CollectorTable from '@/components/Collector/CollectorTable';
import { fetchcollectorData } from '../redux/slices/collectorSlice';
const Home = () => {
  const dispatch = useDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const { data, status } = useSelector((state) => state.master);

  console.log(data,status);

  //  useEffect(() => {
  //     // dispatch(fetchMasterData());
  //     dispatch(fetchcollectorData())
  //   }, [dispatch]);

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
        Add Collector
      </button>

      </div>
      {isFormOpen && <CollectorForm editData={editData} onClose={() => setIsFormOpen(false)}  data={data}/>}
      <CollectorTable onEdit={handleEdit} />
    </div>
  );
};

export default Home;