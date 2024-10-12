import React, { useState, useEffect } from 'react';
import web3 from '../web3';
import listingcontractABI from '../abi/ListingContract.json';
import Sidebar from '../Components/Sidebar';
import WalletId from '../Components/WalletId';
import gridact from '/card/gridact.webp';
import secure from '/card/secure.webp';
import block from '/card/block.webp';
import toast, { Toaster } from 'react-hot-toast';

const listingContractAddress = process.env.listingContractAddress;

const Transaction = () => {
    const [data, setData] = useState({
        energy: '',
        amount: '',
        duration: ''
    });

    const [listingContract, setListingContract] = useState(null);
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state for async operations
    const [account, setAccount] = useState(null); // Store user's wallet account

    // Load contract and accounts on component mount
    useEffect(() => {
        const loadContractAndAccounts = async () => {
            try {
                setLoading(true);
                const accounts = await web3.eth.requestAccounts();
                setAccount(accounts[0]);
                const contract = new web3.eth.Contract(listingcontractABI, listingContractAddress);
                setListingContract(contract);
                await fetchListings(contract);
            } catch (error) {
                console.error("Error loading contract or fetching accounts", error);
            } finally {
                setLoading(false);
            }
        };
        loadContractAndAccounts();
    }, []);

    // Fetch all listings from the contract
    const fetchListings = async (contractInstance) => {
        try {
            setLoading(true);
            const listingId = await contractInstance.methods.listingId().call();
            console.log("Total listings:", listingId);

            const fetchedListings = [];
            for (let i = 0; i < listingId; i++) {
                const listing = await contractInstance.methods.getListing(i).call();
                fetchedListings.push(listing);
            }

            setListings(fetchedListings);
        } catch (error) {
            console.error("Error fetching listings:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle form data changes
    const handleData = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const Clear = async () => {
        setData({ energy: '', amount: '', duration: '' });
    }
    // Create a new listing on form submission
    const formData = async (e) => {
        e.preventDefault();
        if (!listingContract || !account) {
            toast("Contract not loaded or account not connected.",
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
            return;
        }

        const { energy, amount, duration } = data;
        if (!energy || !amount || !duration) {
            toast("Please fill in all fields.",
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
            return;
        }

        try {
            setLoading(true);
            await listingContract.methods.createListing(parseInt(amount), parseInt(energy), parseInt(duration)).send({ from: account });
            console.log("Listing created successfully!");
            await fetchListings(listingContract); // Refresh listings after creation
            setData({ energy: '', amount: '', duration: '' }); // Reset form fields
        } catch (error) {
            console.error("Error creating listing:", error);
        } finally {
            setLoading(false);
        }
    };

    return (<>
        <Toaster
            position="bottom-left" />
        <div className='bg-black'>
            <Sidebar />
            <WalletId />
            <div className='lg:pt-24 lg:pl-64'>
                <div className='flex justify-evenly flex-wrap max-w-full'>
                    <div className='flex flex-col flex-wrap max-w-[65%]'>
                        <form onSubmit={formData} className='p-4 w-[50%] rounded-xl bg-white/30 border-1  backdrop-blur-md'>
                            <h1 className="text-lg font-bold border-gray-700 text-white">Sell Energy</h1>
                            <div className='mt-4'>
                                <input
                                    type="number"
                                    name="energy"
                                    value={data.energy}
                                    onChange={handleData}
                                    placeholder="Energy (kWh)"
                                    className="py-2 px-3 bg-transparent border-b-[1px] border-gray-300 block w-full text-white outline-none  "
                                    disabled={loading} // Disable input during loading
                                />
                                <input
                                    type="number"
                                    name="amount"
                                    value={data.amount}
                                    onChange={handleData}
                                    placeholder="Amount"
                                    className="py-2 px-3 mt-2 bg-transparent border-b-[1px] border-gray-300 block w-full text-white outline-none  "
                                    disabled={loading} // Disable input during loading
                                />
                                <input
                                    type="number"
                                    name="duration"
                                    value={data.duration}
                                    onChange={handleData}
                                    placeholder="Duration (hours)"
                                    className="py-2 px-3 mt-2 bg-transparent border-b-[1px] border-gray-300 block w-full text-white outline-none  "
                                    disabled={loading} // Disable input during loading
                                />
                                <div className='flex justify-end'>
                                    <div className='flex '>

                                        <button onClick={Clear} className='text-white bg-black mr-2 rounded-2xl w-full py-1 px-6 mt-4'>
                                            Clear
                                        </button>
                                        <button className='text-black bg-[#23f7dd] rounded-2xl w-full py-1 px-6 mt-4' type='submit' disabled={loading}>
                                            {loading ? 'Processing...' : 'Sell'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <h2 className='text-lg font-bold text-white mt-4'>Active Energy Listings</h2>
                        <div className="overflow-x-auto w-full  [&::-webkit-scrollbar]:h-2
  [&::-webkit-scrollbar-track]:bg-gray-100 
  [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:w-2">
                            <table className=" min-w-full border-[1px] border-gray-700 rounded-lg mt-2">
                                <thead className='bg-gray-50 dark:bg-neutral-700'>
                                    <tr>
                                        <th className="py-2 px-4 text-xs text-gray-500 uppercase dark:text-neutral-400">Producer</th>
                                        <th className="py-2 px-4 text-xs text-gray-500 uppercase dark:text-neutral-400">Energy (kWh)</th>
                                        <th className="py-2 px-4 text-xs text-gray-500 uppercase dark:text-neutral-400">Amount (wei)</th>
                                        <th className="py-2 px-4 text-xs text-gray-500 uppercase dark:text-neutral-400">Duration (hours)</th>
                                        <th className="py-2 px-4 text-xs text-gray-500 uppercase dark:text-neutral-400">Status</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200 dark:divide-neutral-700'>
                                    {listings.length > 0 ? (
                                        listings.map((listing, index) => (
                                            <tr key={index}>
                                                <td className="px-4 text-center py-2 text-sm text-gray-800 dark:text-neutral-200 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">{listing[0]}</td>
                                                <td className="px-4 text-center py-2 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{listing[2].toString()}</td>
                                                <td className="px-4 text-center py-2 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{listing[1].toString()}</td>
                                                <td className="px-4 text-center py-2 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{listing[3].toString()}</td>
                                                <td className="px-4 text-center py-2 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{listing[4] ? <div className='text-green-600 font-bold'>Active</div> : <div className='text-red-600 font-bold'>Not Active</div>}</td>
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
                    <div className='text-white max-w-[30%] overflow-hidden flex flex-col justify-center items-center'>
                        <div className='relative flex justify-center bg-[#1a1a1a] items-center border border-zinc-700 rounded-3xl'>
                            <div className='absolute text-left text-white w-full p-10'>
                                <div className='text-2xl text-left text-[#737373]'>Active Microgrids</div>
                                <div className='text-right text-7xl text-[#23f7dd]'>56</div>
                            </div>
                            <img srcSet={gridact} />
                        </div>

                        <div className='relative flex justify-center mt-6 overflow-hidden bg-[#1a1a1a] items-center border border-zinc-700 rounded-3xl'>
                            <div className='absolute text-left text-white w-full px-10 pt-28 pb-10 z-10'>
                                <div className='text-2xl text-right text-white'>Decentralised</div>
                                <div className='text-right text-3xl text-[#23f7dd]'>With</div>
                                <div className='text-right text-6xl pb-6 text-[#23f7dd]'>Blockchain</div>
                            </div>
                            <img className='w-[45%] relative -left-20 -top-20' srcSet={block} />
                        </div>

                        <div className='relative flex justify-center mt-6 px-6 pt-8 pb-20 bg-[#1a1a1a] w-[75%] border border-zinc-700 rounded-3xl'>
                            <div className='absolute text-white text-center w-full z-10'>
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
    </>
    );
};

export default Transaction;
