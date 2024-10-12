import React, { useState } from 'react';
import '../../src/App.css';

const WalletId = ({ toggleSidebar }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [walletId, setWalletId] = useState(localStorage.getItem("walletId"));

    const handleDisconnect = () => {
        localStorage.removeItem("walletId");
        setWalletId(null); // Clear the wallet ID from the state
    };

    const containerStyle = {
        maxWidth: isHovered ? '400px' : '150px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        transition: 'max-width 0.3s ease',
        color: 'black',
        backgroundColor: '#23f7dd',
        padding: '5px',
        borderRadius: '5px',
    };

    return (
        <div>
            <header className="z-10 flex fixed justify-start flex-nowrap w-full text-sm py-5 border-b-[1px] border-[#2e2e2e] bg-black backdrop-blur-none glasseffect">
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
                            <div className='flex items-center gap-3'>
                                <h3 className='text-white'>ETH Wallet ID - </h3>
                                <div style={containerStyle}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}>{walletId}
                                </div>
                                {walletId && (
                                    <button
                                        onClick={handleDisconnect}
                                        className="p-2 text-white bg-[#2e2e2e] rounded"
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
