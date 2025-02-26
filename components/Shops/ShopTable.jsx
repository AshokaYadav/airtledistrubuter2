// import { deleteTransaction } from '@/app/redux/slices/transactionSlice';
import { deleteshop } from '@/app/redux/slices/shopSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { deleteTransaction } from '../features/transactionSlice';

const ShopTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { shops, status } = useSelector((state) => state.shop);
  console.log(shops);

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
            <th className="p-2 border">Balance</th>
            <th className="p-2 border">Collector Id</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {shops.data?.map((shop,index) => (
            <tr key={shop.id}>
                  <td className="p-2 border text-center">{index+1}</td>
              <td className="p-2 border text-center">{shop.Retailer_Name}</td>
              <td className="p-2 border  text-center">{shop.mobileno}</td>
              <td className="p-2 border  text-center">{shop.balance}</td>
              <td className="p-2 border  text-center">{shop.CollectorId}</td>
              <td className="p-2 border  text-center">
                <button
                  onClick={() => onEdit(shop)}
                  className="bg-yellow-500 text-white p-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteshop(shop.id))}
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

export default ShopTable;