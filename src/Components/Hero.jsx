import { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import axios from 'axios';
import glass from "/home/glass.webp";
import blurimg from "/home/blurimg.webp";
import blurimg2 from "/home/blurimg2.webp";
import g1 from "/green/g1.webp";
import hero from "/Bg/Hero.webp";
import globe from "/globe/planet.webp";
import ring from "/globe/ring.svg";
import orbit from "/globe/orbit.svg";
import g3 from "/green/g3.webp";
import g4 from "/green/g4.webp";
import g2 from "/green/g2.webp";
import g6 from "/green/g6.webp";
import g5 from "/green/g5.webp";

const Hero = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { disconnectWallet, walletAddress, connectMetaMask } = useWallet(); // Include connectMetaMask
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      console.log("Wallet disconnected successfully");
      navigate('/');
    } catch (error) {
      console.error("Error disconnecting wallet", error);
    }
  };

  const handleConnectMetaMask = async () => {
    try {
      setLoading(true);
      await connectMetaMask(); // Connect wallet
      // No navigation here
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
      navigate('/'); 
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Failed to register. Please try again.');
    }
  };

  const handleGoToDashboard = () => {
    if (walletAddress) {
      navigate("/dashboard"); // Navigate to dashboard only if wallet is connected
    } else {
      alert('Please connect your wallet first.');
    }
  };

  return (
    <div className=''>
      <div className='md:h-screen z-[1] overflow-hidden bg-black pt-5 relative'>
        <img srcSet={hero} className='z-[-1] md:w-[80%] scale-[2] absolute md:top-[-20rem] top-[-20px] bottom-full md:bottom-full rotate-[20deg]' />
        <Navbar />
        <div className='bg-black overflow-hidden m-auto mx-3 rounded-3xl'>
          <div className='pt-56 relative md:h-screen'>
            <div className='w-full'>
              <img srcSet={glass} className='absolute w-[686px] top-20 rotate-[70deg] left-[-245px]' />
              <img srcSet={blurimg} className='absolute w-[400px] top-32 rotate-[-20deg] right-[-145px]' />
              <img srcSet={blurimg2} className='absolute w-[400px] top-60 rotate-[-50deg] right-[-145px]' />
            </div>
            <div className='relative z-10'>
              <span className='md:text-6xl text-5xl md:pb-4 mb-5 font-medium flex flex-wrap justify-center items-center text-white text-center'>
                Revolutionizing
                <span className=''>Energy Trading</span>
              </span>
              <div className='pb-4 px-7 flex justify-center items-center flex-col'>
                <h2 className='text-center text-white md:text-xl text-md'>Empowering Individuals and Communities</h2>
                <span className='text-center text-white md:text-xl text-md mb-5'>
                  to Trade Energy Seamlessly and Securely
                </span>
                <div className='flex justify-center items-center gap-2'>
                  <button onClick={handleGoToDashboard} type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg text-gray-800 shadow-sm hover:shadow-2xl shadow-[#23f7dd] focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none bg-[#23f7dd]">
                    Go to DashBoard
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </button>
                  <button
                    onClick={handleConnectMetaMask}
                    className="px-4 py-3 text-sm bg-[#2e2e2e] text-white rounded-lg"
                    disabled={loading}
                  >
                    {loading ? 'Connecting...' : walletAddress ? 'Connected Wallet' : "Connect MetaMask"}
                  </button>
                </div>
              </div>
            </div>
            <div className='bg-[linear-gradient(#0a0a0a00_20%,_#090909_61%)] absolute top-4 bottom-[-220px] w-full'></div>
          </div>
        </div>
      </div>
      <div>
        <div className='bg-black overflow-hidden md:h-[120vh] relative z-0 md:pt-72 pt-32 pb-[50rem]'>
          <div className='relative max-w-[160%]'>
            <img srcSet={g6} className='absolute md:w-[200px] w-[100px] md:left-[50px] left-[10px] top-[-70px] md:top-[-180px]' />
            <img srcSet={g3} className='absolute md:w-[250px] w-[140px] z-[-1] md:right-[-30px] right-[-30px] md:top-[-115px] top-[-75px]' />
            <div className='bg-[linear-gradient(#0a0a0a00_20%,_#d9d9d9_61)] py-6 m-auto md:max-w-[95%] rounded-3xl'>
              <div className='flex items-center relative justify-center'>
                <div className='absolute text-white z-[20]'>
                  <h1 className='lg:text-[70px] text-5xl md:leading-[70px] font-medium'>Future-Proof<br /> in Every Way</h1>
                </div>
                <div className='flex items-center relative justify-center md:w-[70%] h-full'>
                  <img className='md:w-[65%] max-w-[110%] z-[2] animate-spin-slow-1 opacity-[0.90] mix-blend-normal' srcSet={globe} />
                  <img className='md:w-[85%] max-w-[140%] z-[2] absolute animate-spin-slow' srcSet={ring} />
                  <img className='md:w-[85%] max-w-[140%] z-[2] absolute' srcSet={orbit} />
                </div>
                <div className='absolute z-[1] bg-green-500 md:w-[45%] w-[105%] h-full rounded-[100%] md:blur-[20px] blur-[70px] opacity-90'></div>
                <div className='absolute z-[1] bg-green-500 md:w-[45%] w-[125%] h-full rounded-[100%] md:blur-[150px] blur-[40px] opacity-90 '></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
