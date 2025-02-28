'use client';

import { useRouter } from 'next/navigation';
import { FaMobileAlt } from 'react-icons/fa';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-600 text-white">
      <div className="max-w-lg w-full bg-white text-gray-900  rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Airtel Distributor</h1>
        <p className="text-lg mb-6">Join the Airtel Network and grow your business with us.</p>
        
        <div className="flex justify-center mb-6">
          <FaMobileAlt className="text-red-600 text-6xl" />
        </div>

        <button
          onClick={() => router.push('/dashboard')}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
