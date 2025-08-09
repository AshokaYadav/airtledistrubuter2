import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const PaymentPopup = ({ show, onClose, currentItem }) => {
  const [type, setType] = useState('');
  const [bankId, setBankId] = useState('');
  const [amount, setAmount] = useState('');
  const [slip, setSlip] = useState(null);
  const [utr, setUtr] = useState('');
  const [remark, setRemark] = useState('');

  const { banks } = useSelector((state) => state.banks);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!type || !amount || !utr || !slip) {
      alert('Please fill all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('mode', type);
    formData.append('collectorId', currentItem?.id || '');
    formData.append('distributorId', currentItem?.distributorId || '');
    formData.append('bankId', type === 'Bank' ? bankId : '');
    formData.append('utrno', utr);
    formData.append('amount', amount);
    formData.append('remark', remark);
    formData.append('fileUrl', slip);

    try {
      const res = await fetch(
        'https://gsr9qc3n-3012.inc1.devtunnels.ms/api/bank-transaction/createUnifiedTransaction',
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await res.json();
      console.log('API Response:', result);

      if (res.ok) {
        alert('Transaction submitted successfully');
        // Reset form
        setType('');
        setBankId('');
        setAmount('');
        setSlip(null);
        setUtr('');
        setRemark('');
        onClose();
      } else {
        alert(result?.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Payment Form</h2>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 text-xl"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit}>
          {/* Type dropdown */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-2 w-full rounded-md mb-3"
          >
            <option value="" disabled>Select Type</option>
            <option value="Bank">Bank</option>
            <option value="Distributor">Distributor</option>
          </select>

          {/* Bank dropdown */}
          {type === 'Bank' && (
            <select
              value={bankId}
              onChange={(e) => setBankId(e.target.value)}
              className="border p-2 w-full rounded-md mb-3"
            >
              <option value="" disabled>Select Bank</option>
              {banks?.length > 0 ? (
                banks.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.bankName}
                  </option>
                ))
              ) : (
                <option disabled>No banks available</option>
              )}
            </select>
          )}

          {/* Amount */}
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 w-full rounded-md mb-3"
          />

          {/* UTR */}
          <input
            type="text"
            placeholder="Enter UTR"
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
            className="border p-2 w-full rounded-md mb-3"
          />

          {/* Slip Upload */}
          <input
            type="file"
            onChange={(e) => setSlip(e.target.files[0])}
            className="border p-2 w-full rounded-md mb-3"
          />

          {/* Remark */}
          <input
            type="text"
            placeholder="Remark"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            className="border p-2 w-full rounded-md mb-3"
          />

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPopup;
