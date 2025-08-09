"use client";
import { fetchBanks } from "@/app/redux/slices/bankSlice";
import { fetchDistributorBankTransactions,deleteBankTransactiondata } from "@/app/redux/slices/distributorledger/distributorBankTransactionSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BankDropdown from '../../component/BankDropdown';

const DistributorBankTransactionTable = () => {
  const [selectedId, setSelectedId] = useState("");

  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector((state) => state.distributorBankTransaction);
  const { banks } = useSelector((state) => state.banks);
  // useSelector

  console.log(transactions);

  console.log(banks);
  useEffect(() => {
    dispatch(fetchBanks());
  }, [dispatch]);
  
  const handleChange = (e) => {
    setSelectedId(e.target.value);
    console.log("Selected Bank ID:", +e.target.value);
    dispatch(fetchDistributorBankTransactions(+e.target.value)); // ✅ Distributor ID से data fetch कर रहा है
  };

  return (
    <div className=" mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Distributor Bank Transactions</h2>
      <BankDropdown bankAccounts={banks} handleChange={handleChange} selectedId={selectedId} />
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Remark</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Bank Balance Before</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Bank Balance After</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.length > 0 ? (
              transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-100">
                  <td className="border p-2 text-center">{txn.id}</td>
                  <td className="border p-2 text-center">{txn.remark}</td>
                  <td className="border p-2 text-center">{txn.type}</td>
                  <td className="border p-2 text-center">₹{txn.bankBalanceBefore}</td>
                  <td className="border p-2 text-center">₹{txn.amount}</td>
                  <td className="border p-2 text-center">₹{txn.bankBalanceAfter}</td>
                  <td className="border p-2 text-center">{new Date(txn.createdAt).toLocaleString()}</td>
                  <td className="border p-2 text-center">

                  <button
                  onClick={() => dispatch(deleteBankTransactiondata(txn))}
                  className="bg-red-500 text-white p-1 rounded ml-2"
                >
                  Delete
                </button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="border p-4 text-center">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DistributorBankTransactionTable;
