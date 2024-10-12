import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import listingcontractABI from '../abi/ListingContract.json';
import Sidebar from '../Components/Sidebar';
import WalletId from '../Components/WalletId';
import gridact from '/card/gridact.webp';
import secure from '/card/secure.webp';
import block from '/card/block.webp';


const listingContractAddress = process.env.listingContractAddress;

const Transaction = () => {
    const [data, setData] = useState({
        energy: '',
        amount: '',
        duration: ''
    });

    const [account, setAccount] = useState('');
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const loadWeb3 = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
                const accounts = await web3Instance.eth.requestAccounts();
                setAccount(accounts[0]);
                const contractInstance = new web3Instance.eth.Contract(listingcontractABI, listingContractAddress);
                setContract(contractInstance);
                await fetchListings(contractInstance);
            } else {
                alert('Please install MetaMask to use this feature.');
            }
        };
        loadWeb3();
    }, []);

    const fetchListings = async (contractInstance) => {
        try {
            const listingId = await contractInstance.methods.listingId().call();
            console.log("Total listings:", listingId);

            const fetchedListings = [];
            for (let i = 0; i < listingId; i++) {
                const listing = await contractInstance.methods.getListing(i).call();
                console.log(`Fetched Listing ${i}:`, listing);
                fetchedListings.push(listing);
            }

            setListings(fetchedListings);
        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    };

    const formData = async (e) => {
        e.preventDefault();
        if (contract) {
            try {
                const { energy, amount, duration } = data;
                await contract.methods.createListing(parseInt(amount), parseInt(energy), parseInt(duration)).send({
                    from: account,
                    gas: 8000000,
                });
                console.log('Listing created successfully!');
                await fetchListings(contract);
                setData({ energy: '', amount: '', duration: '' }); // Reset form fields
            } catch (error) {
                console.error('Error creating listing:', error);
            }
        }
    };

    const handleData = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className='bg-black '>
            <Sidebar />
            <WalletId />
            <div className='lg:pt-24 lg:pl-64'>
                <div className='flex justify-evenly flex-wrap max-w-full'>
                    <div className='flex flex-col flex-wrap mx-w-[50%]'>
                        <form onSubmit={formData} className='p-4 rounded-xl bg-white/30 border-white border-1  backdrop-blur-md'>
                            <h1 className="text-lg font-bold border-gray-700 text-black">Sell Energy</h1>
                            <div className='mt-4'>
                                <input type="number" name='energy' value={data.energy} onChange={handleData} placeholder="Energy (kWh)" className="py-2 px-3 bg-transparent border-2 block w-full border-white text-black font-bold rounded-md" />
                                <input type="number" name='amount' value={data.amount} onChange={handleData} placeholder="Amount" className="py-2 px-3 mt-2 bg-transparent border-2 block w-full border-white text-black font-bold rounded-md" />
                                <input type="number" name='duration' value={data.duration} onChange={handleData} placeholder="Duration (hours)" className="py-2 px-3 mt-2 bg-transparent border-2 block w-full border-white text-black font-bold rounded-md" />
                                <button className='text-black bg-[#23f7dd] rounded-lg w-full py-1 mt-4' type='submit'>Sell</button>
                            </div>
                        </form>

                        <h2 className='text-lg font-bold text-white mt-4'>Active Energy Listings</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 mt-2">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b border-gray-200">Producer</th>
                                        <th className="py-2 px-4 border-b border-gray-200">Energy (kWh)</th>
                                        <th className="py-2 px-4 border-b border-gray-200">Amount (wei)</th>
                                        <th className="py-2 px-4 border-b border-gray-200">Duration (hours)</th>
                                        <th className="py-2 px-4 border-b border-gray-200">Active</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listings.length > 0 ? (
                                        listings.map((listing, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2 border-b border-gray-200">{listing[0]}</td>
                                                <td className="px-4 py-2 border-b border-gray-200">{listing[1].toString()} kWh</td>
                                                <td className="px-4 py-2 border-b border-gray-200">{listing[2].toString()} wei</td>
                                                <td className="px-4 py-2 border-b border-gray-200">{listing[3].toString()} hours</td>
                                                <td className="px-4 py-2 border-b border-gray-200">{listing[4] ? "Yes" : "No"}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-2">No active listings available.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='text-white  max-w-[30%] overflow-hidden flex flex-col justify-center items-center'>
                        <div className='relative flex justify-center bg-[#1a1a1a] items-center border border-zinc-700 rounded-3xl'>
                            <div className=' absolute text-left text-white w-full p-10'>
                                <div className='text-2xl text-left text-[#737373]'>Active Microgrids</div>
                                <div className='text-right text-7xl text-[#23f7dd]'>56</div>
                            </div>

                            <img srcSet={gridact} />
                        </div>

                        <div className='relative flex justify-center mt-6  overflow-hidden bg-[#1a1a1a] items-center border border-zinc-700 rounded-3xl'>
                            <div className=' absolute text-left text-white w-full px-10 pt-28 pb-10 z-10'>
                                <div className='text-2xl text-right text-white'>Decentralised</div>
                                <div className='text-right text-3xl text-[#23f7dd]'>With</div>
                                <div className='text-right text-6xl pb-6 text-[#23f7dd]'>Blockchain</div>
                            </div>

                            <img className='w-[45%] relative -left-20 -top-20' srcSet={block} />
                        </div>

                        <div className='relative flex justify-center mt-6 px-6 pt-8 pb-20 bg-[#1a1a1a] w-[75%]  border border-zinc-700 rounded-3xl'>
                            <div className=' absolute text-white text-center w-full z-10'>
                                <div className='text-2xl text-white'>Secure Transaction</div>
                                <div className='text-2xl text-white'>with</div>
                                <div className='text-2xl text-[#23f7dd]'>Escrow</div>
                                
                            </div>

                            <img className='w-60 -bottom-28 relative' srcSet={secure} />


                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Transaction;
