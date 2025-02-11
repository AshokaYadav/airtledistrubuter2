// components/MasterTable.js
import { deleteMasterData, fetchMasterData } from '@/app/redux/slices/masterSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MasterTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.master);


  useEffect(() => {
    dispatch(fetchMasterData());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Mobile No</th>
            <th className="p-2 border">Company</th>
            <th className="p-2 border">Balance</th>
            <th className="p-2 border">seft commision</th>
            <th className="p-2 border">main balance</th>

            <th className="p-2 border">Actions</th>
            
            
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="p-2 border text-center">{item.name}</td>
              <td className="p-2 border text-center">{item.mobileno}</td>
              <td className="p-2 border text-center">{item.company}</td>
              <td className="p-2 border text-center">{item.balance}</td>
              <td className="p-2 border text-center">{item.total_self_com}</td>
              <td className="p-2 border text-center">{item.main_balance}</td>
              <td className="p-2 border text-center">
                <button onClick={() => onEdit(item)} className="bg-yellow-500 text-white p-1 rounded">
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteMasterData(item.id))}
                  className="bg-red-500 text-white p-1 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MasterTable;