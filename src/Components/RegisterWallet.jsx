import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import axios from 'axios'; 
import dash from '/Bg/dash.jpg';

const RegisterWallet = () => {
  const { connectMetaMask, walletAddress } = useWallet();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (walletAddress) {
      navigate('/home');
    }
  }, [walletAddress, navigate]);

  const handleConnectMetaMask = async () => {
    try {
      setLoading(true);
      await connectMetaMask();
    } catch (error) {
      console.error('Failed to connect MetaMask:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet first.');
      return;
    }

    if (!userName) {
      alert('Please enter a username.');
      return;
    }

    try {
   
      await axios.post('/api/register', { userName, walletAddress });
      navigate('/home'); 
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="dashboard bg-neutral-700 h-full"
      style={{
        backgroundImage: `url(${dash})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: 'white'
      }}>
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Connect Your Wallet</h1>
          <p className="mt-4">To continue, please connect your MetaMask wallet.</p>

          <button
            onClick={handleConnectMetaMask}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
            disabled={loading}
          >
            {loading ? 'Connecting...' : 'Connect MetaMask'}
          </button>

        </div>
      </div>
    </div>
  );
};

export default RegisterWallet;
