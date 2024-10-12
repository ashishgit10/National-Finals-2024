import React, { useState } from 'react'


const Sidebar = () => {
  const [open, setopen] = useState(false)

  return (<div>
    <div className={` ${open ? "translate-x-[-100%]" : "translate-x-[0%]"} md:!translate-x-[0%] transition-all duration-300 transform fixed top-0 start-0 bottom-0 z-[60] w-64 bg-black lg:backdrop-filter-md  border-r-[1px] border-[#2e2e2e] pt-7 pb-10 overflow-y-auto   [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}>
      <div className='flex justify-end items-center px-8'>
        <button className='text-white lg:hidden' onClick={() => setopen(!open)}> ☰ </button>
      </div>

      <nav className="hs-accordion-group p-6 mt-5 w-full flex flex-col flex-wrap" >
        <ul className="space-y-1.5">
          <li className='text-white'>
            <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-lg dark:text-white" href="/">
              <svg className="size-4 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              <span className='text-white'>Home</span>
            </a>
          </li>

          <li className='text-white'>
            <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-lg dark:text-white" href="/dashboard">
              <svg className="size-4 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              <span className='text-white'>Dashboard</span>
            </a>
          </li>

          <li className='text-white'>
            <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-lg dark:text-white" href="/">
              <svg className="size-4 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z" /><path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8" /><path d="M15 2v5h5" /></svg>
              <span className='text-white'>Connect Wallet</span>
            </a>
          </li>

          <li className='text-white'>
            <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-lg dark:text-white" href="/transact">
              <svg className="size-4 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="15" r="3" /><circle cx="9" cy="7" r="4" /><path d="M10 15H6a4 4 0 0 0-4 4v2" /><path d="m21.7 16.4-.9-.3" /><path d="m15.2 13.9-.9-.3" /><path d="m16.6 18.7.3-.9" /><path d="m19.1 12.2.3-.9" /><path d="m19.6 18.7-.4-1" /><path d="m16.8 12.3-.4-1" /><path d="m14.3 16.6 1-.4" /><path d="m20.7 13.8 1-.4" /></svg>
              <span className='text-white'> Sell Energy</span>
            </a>
          </li>
          <li className='text-white'>
            <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-lg dark:text-white" href="/buy">
              <svg className="size-4 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z" /><path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8" /><path d="M15 2v5h5" /></svg>
              <span className='text-white'>Buy Energy</span>
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