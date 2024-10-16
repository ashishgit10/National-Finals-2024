
import React from 'react'
import { Toaster } from 'react-hot-toast'
import WalletId from '../Components/WalletId'
import Sidebar from '../Components/Sidebar'
import Nft from '../Components/Nft'
import Progress from '../Components/Progress'
import QuestCard from '../Components/QuestCard'
import CarbonSavingsCard from '../Components/CarbonSavingsCard'
import WeeklyChallengesCard from '../Components/WeeklyChallengesCard'
import MonthlyChallengesCard from '../Components/MonthlyChallengesCard'


const data = [
  {
    img: '/nft/n1.webp'
  },
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
const questdata = [
  {
    img: '/nft/n1.webp'
  },
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

        <div className='text-white flex flex-col flex-wrap2 gap-3 w-full'>
          <div className='flex gap-3 flex-wrap'>
            <QuestCard />
            <CarbonSavingsCard />
          </div>

          <div className='flex gap-3 flex-wrap'>
            <WeeklyChallengesCard />
            <MonthlyChallengesCard />
          </div>


          {/*      <div className='flex flex-wrap mt-3 flex-col'>
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
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Quest