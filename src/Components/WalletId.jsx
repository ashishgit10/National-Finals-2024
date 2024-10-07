import React from 'react';
import '../../src/App.css';

const WalletId = ({ toggleSidebar }) => {
    let id = localStorage.getItem("walletId");

    return (
        <div>
            <header className="border-b border-black relative flex justify-start flex-nowrap w-full text-sm py-5 glasseffect">
                <nav className="max-w-[85rem] w-full mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center justify-between">

                        <button
                            onClick={toggleSidebar}
                            className="p-2 text-white bg-blue-500 rounded lg:hidden"
                        >
                            Toggle Sidebar
                        </button>
                    </div>
                    <div id="hs-navbar-example" className="hs-collapse overflow-hidden transition-all duration-300 basis-full grow block" aria-labelledby="hs-navbar-example-collapse">
                        <div className="flex gap-5 flex-row items-center justify-end ps-5">
                            <div className='flex'>
                                <h3 className='text-black'>ETH Wallet ID</h3>
                                <div className='text-black text-ellipsis'>&nbsp;- {id}</div>
                            </div>
                        </div>
                    </div>

                </nav>
            </header>
        </div>
    );
};

export default WalletId;
