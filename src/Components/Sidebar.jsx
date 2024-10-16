import React, { useState } from 'react'
import { MdDashboard } from "react-icons/md";
import { MdEnergySavingsLeaf } from "react-icons/md";
import { GrConnect } from "react-icons/gr";
import { FaGift } from "react-icons/fa6";


const Sidebar = () => {
  const [open, setopen] = useState(false)

  return (<div>
    <div className={` ${open ? "translate-x-[-100%]" : "translate-x-[0%]"} md:!translate-x-[0%] transition-all duration-300 transform fixed top-0 start-0 bottom-0 z-[60] w-64 bg-black lg:backdrop-filter-md  border-r-[1px] border-[#2e2e2e] pt-7 pb-10 overflow-y-auto   [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}>
      <div className='flex justify-end items-center px-8'>
        <button className='text-white text-lg lg:hidden' onClick={() => setopen(!open)}>x</button>
      </div>

      <nav className="hs-accordion-group p-6 mt-5 w-full flex flex-col flex-wrap" >
        <ul className="space-y-1.5">
          <li className='text-white'>
            <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-lg text-white rounded-lg dark:text-white" href="/">
              <svg className="size-4 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              <span className='text-white'>Home</span>
            </a>
          </li>

          <li className='text-white'>
            <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-lg text-white rounded-lg dark:text-white" href="/dashboard">
              <MdDashboard />
              <span className='text-white'>Dashboard</span>
            </a>
          </li>

          <li className='text-white'>
            <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-lg text-white rounded-lg dark:text-white" href="/transact">
              <MdEnergySavingsLeaf />
              <span className='text-white'> Sell Energy</span>
            </a>
          </li>
          <li className='text-white'>
            <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-lg text-white rounded-lg dark:text-white" href="/buy">
              <GrConnect />
              <span className='text-white'>Buy Energy</span>
            </a>
          </li>
          <li className='text-white'>
            <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-lg text-white rounded-lg dark:text-white" href="/quest">
              <FaGift />
              <span className='text-white'>Quest</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <script src="../scripts/js/open-modals-on-init.js"></script>

  </div>

  );
};


export default Sidebar