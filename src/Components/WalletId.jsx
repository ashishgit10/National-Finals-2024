import React, { useState } from 'react';
import '../../src/App.css';
import toast, { Toaster } from 'react-hot-toast';

const WalletId = ({ toggleSidebar }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [walletId, setWalletId] = useState(localStorage.getItem("walletId"));

    const handleDisconnect = () => {
        localStorage.removeItem("walletId");
        setWalletId(null); // Clear the wallet ID from the state
        toast("Wallet Disconnected",
            {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            }
        );
    };

    const containerStyle = {
        maxWidth: isHovered ? '400px' : '85px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        transition: 'max-width 0.3s ease',
        color: 'black',
        backgroundColor: '#23f7dd',
        padding: '5px',
        borderRadius: '5px',
        fontSize:"12px"
    };

    return (
        <div>
            <Toaster
                position="bottom-left" />
            <header className="z-10 flex fixed justify-start flex-nowrap w-full text-sm py-5 border-b-[1px] border-[#2e2e2e] bg-black backdrop-blur-none glasseffect">
                <nav className="max-w-[85rem] w-full mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 text-white bg-neutral-700 rounded lg:hidden"
                        >
                         ☰ 
                        </button>
                    </div>
                    <div id="hs-navbar-example" className="hs-collapse overflow-hidden transition-all duration-300 basis-full grow block" aria-labelledby="hs-navbar-example-collapse">
                        <div className="flex gap-5 flex-row items-center justify-end ps-5">
                            <div className='flex items-center gap-3'>
                            <div className='flex items-center gap-3 border bg-neutral-700 border-gray-700 pl-2 rounded-lg'>
                                <h3 className='text-white text-xs lg:text-sm'>ETH Wallet ID</h3>
                                <div style={containerStyle}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}>{walletId}
                                </div>
                            </div>
                                {walletId && (
                                    <button
                                        onClick={handleDisconnect}
                                        className="p-2 text-white text-xs lg:text-sm bg-[#2e2e2e] rounded"
                                    >
                                        Disconnect MetaMask
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default WalletId;
