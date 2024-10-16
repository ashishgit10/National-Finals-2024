
import React from 'react'
import { Toaster } from 'react-hot-toast'
import WalletId from '../Components/WalletId'
import Sidebar from '../Components/Sidebar'
import Nft from '../Components/Nft'
import Progress from '../Components/Progress'


const data = [
  {
    img: '/nft/n2.jpg'
  },
  {
    img: '/nft/n3.jpg'
  },
  {
    img: '/nft/n4.jpg'
  },
  {
    img: '/nft/n5.jpg'
  },
  {
    img: '/nft/n6.jpg'
  }
]
const Quest = () => {
  return (
    <div className='bg-black h-[180vh]'>
      <Toaster
        position="bottom-left" />
      <Sidebar />
      <WalletId />
      <div className='lg:pl-[280px] flex justify-center flex-col flex-wrap pt-[110px] lg:pt-[80px]'>

        <div className='text-white w-full'>
          <div className='bg-neutral-900 text-center flex justify-center items-center flex-col max-w-[235px] p-6 rounded-lg border border-cyan-300/40'>
            <div>
              <h1 className='text-white font-semibold'>Weekly Rewards</h1>
              <span className='text-white mt-4 mb-4'>Your weekly Progress</span>
            </div>
            <Progress />
            <div><h1 className='text-white py-2'>Completed</h1></div>
          </div>



          <div className='flex flex-wrap mt-3 flex-col'>
            <h1 className='text-2xl py-3'>NFT Rewards</h1>
            <div className='flex flex-wrap gap-3'>
              {
                data.map((data, ind) => (
                  <div key={ind}>
                    <Nft data={data.img} />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quest