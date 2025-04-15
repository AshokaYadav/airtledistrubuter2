"use client";

import { getfileAsync } from "@/app/redux/slices/fileUploadSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const getRowColor = (status2) => {
  switch (status2) {
    case "REFILL_TRANSFER_SUCCESS":
      return "bg-green-100";
    case "REFILL_COLLECTED":
      return "bg-red-100";
    case "refill.digital.collection.complete":
      return "bg-yellow-100";
    default:
      return "bg-white";
  }
};

const TransactionTable = () => {
  const [data, setData] = useState([]);
  const dispatch =useDispatch();
  const {fileData}=useSelector(state=>state.fileUpload);
 
  

  // console.log(ashoka);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("https://gsr9qc3n-3012.inc1.devtunnels.ms/api/bank-transaction/shopuploadlog/bycollectorid/2");
        const json = await res.json();
        setData(json.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };
    
    dispatch(getfileAsync(2))

    fetchTransactions();


  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>
      
      {/* Scrollable container */}
      <div className="overflow-auto max-h-[500px] border border-gray-300 rounded-md">
        <table className="min-w-[1000px] w-full table-auto">
          <thead className="sticky top-0 bg-gray-200 z-10">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Shop Mobile No</th>
              <th className="border px-4 py-2">Collector ID</th>
              <th className="border px-4 py-2">Balance</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Transaction Status</th>
              <th className="border px-4 py-2">Status2</th>
              <th className="border px-4 py-2">Remark</th>
            </tr>
          </thead>
          <tbody>
            {fileData?.map((row) => (
              <tr key={row.id} className={getRowColor(row.status2)}>
                <td className="border px-4 py-2 text-center">{row.id}</td>
                <td className="border px-4 py-2 text-center">{row.shopMobileno}</td>
                <td className="border px-4 py-2 text-center">{row.collectorId}</td>
                <td className="border px-4 py-2 text-center">{row.shopBalance}</td>
                <td className="border px-4 py-2 text-center">{row.status}</td>
                <td className="border px-4 py-2 text-center">{row.transactionStatus}</td>
                <td className="border px-4 py-2 text-center">{row.status2}</td>
                <td className="border px-4 py-2 text-center">{row.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
