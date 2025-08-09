import React, { useState } from "react";

export default function BankDropdown({bankAccounts,handleChange,selectedId}) {
  

  

  return (
    <div className="p-4">
      <label htmlFor="bank-select" className="block mb-2 font-semibold">
        Select Bank:
      </label>
      <select
        id="bank-select"
        value={selectedId}
        onChange={handleChange}
        className="border border-gray-300 p-2 rounded w-full"
      >
        <option value="">-- Select a Bank --</option>
        {bankAccounts.map((bank) => (
          <option key={bank.id} value={bank.id}>
            {bank.bankName}
          </option>
        ))}
      </select>

      {selectedId && (
        <p className="mt-4 text-green-600">Selected ID: {selectedId}</p>
      )}
    </div>
  );
}
