import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from "ethers";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState(() => {
        return localStorage.getItem("walletId") || "";
    });

  
    const connectMetaMask = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const userWallet = accounts[0]; 
                setWalletAddress(userWallet);
                localStorage.setItem("walletId", userWallet); 
              
            } catch (error) {
                console.log('User rejected the connection request');
            }
        } else {
            alert('Please install MetaMask to continue.');
        }
    };

 
    const disconnectWallet = () => {
        setWalletAddress("");
        localStorage.removeItem("walletId"); 
    };

    useEffect(() => {
        const savedAddress = localStorage.getItem("walletId");
        if (savedAddress) {
            setWalletAddress(savedAddress); 
        }
    }, []);

    return (
        <WalletContext.Provider value={{ walletAddress, connectMetaMask, disconnectWallet }}>
            {children}
        </WalletContext.Provider>
    );
};


export const useWallet = () => {
    return useContext(WalletContext);
};
