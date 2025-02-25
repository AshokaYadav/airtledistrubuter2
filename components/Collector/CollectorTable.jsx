// components/MasterTable.js
import { deletecollectorData, fetchcollectorData } from '@/app/redux/slices/collectorSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CollectorTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.collector);


  useEffect(() => {
    dispatch(fetchcollectorData());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
          <th className="p-2 border">Sr</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Mobile No</th>
            {/* <th className="p-2 border">Password</th> */}
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item,index) => (
            <tr key={item.id}>
                 <td className="p-2 border text-center">{index+1}</td>
              <td className="p-2 border text-center">{item.name}</td>
              <td className="p-2 border text-center">{item.mobileno}</td>
              {/* <td className="p-2 border text-center">{item.password}</td> */}
              <td className="p-2 border text-center">
                <button onClick={() => onEdit(item)} className="bg-yellow-500 text-white p-1 rounded">
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deletecollectorData(item.id))}
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

export default CollectorTable;