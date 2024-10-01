import { useState } from 'react'
import { useWallet } from '../context/WalletContext'
import { useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar'
import glass from "../../public/home/glass.webp"
import blurimg from "../../public/home/blurimg.webp"
import blurimg2 from "../../public/home/blurimg2.webp"



const Hero = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { disconnectWallet, walletAddress } = useWallet();
  const navigate = useNavigate()
  if (walletAddress == '') {
    navigate('/');
  }
  console.log(walletAddress)
  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      console.log("Wallet disconnected successfully");
      navigate('/');
    } catch (error) {
      console.error("Error disconnecting wallet", error);
    }
  };


  function dashboard() {
    navigate("/dashboard")
  }
  return (
    <div className=''>
      <div className='bg-gray-800 h-screen pt-5'>
        <Navbar />
        <div className='bg-black max-w-screen-2xl overflow-hidden m-auto mx-3 rounded-3xl'>
          <div className='pt-56 relative h-screen'>
            <div className='w-full'>
              <img srcSet={glass} className='absolute w-[700px] top-20 rotate-[70deg] left-[-245px]' />
              <img srcSet={blurimg} className='absolute w-[400px] top-32 rotate-[-20deg] right-[-145px]' />
              <img srcSet={blurimg2} className='absolute w-[400px] top-60 rotate-[-50deg] right-[-145px]' />
            </div>
            <div className='relative z-10'>
              <span className='text-6xl font-medium flex flex-wrap justify-center items-center text-white text-center'>
                Revolutionizing
                <span className='gradient-text leading-[100px] pb-4 md:pb-0'>Energy Trading</span>
              </span>
              <div className='pb-4 px-7 flex justify-center items-center flex-col'>
                <h2 className='text-center text-gray-400 text-xl'>Empowering Individuals and Communities
                </h2>
                <span className='text-center text-gray-400 text-xl mb-5'>
                  to Trade Energy Seamlessly and Securely
                </span>

                <button onClick={dashboard} type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200  text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none bg-black dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                  Go to DashBoard
                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className=' bg-[linear-gradient(#0a0a0a00_20%,_#0a0a0a_61%)] absolute top-4 bottom-[-220px] w-full'></div>
          </div>
        </div>
      </div>
      <div>
        <div className='bg-red-500 h-screen'></div>
      </div>
    </div>
  );
}

export default Hero;