import React, { useState, useEffect } from 'react';
import web3 from '../web3';
import listingcontractABI from '../abi/ListingContract.json';
import Sidebar from '../Components/Sidebar';
import WalletId from '../Components/WalletId';
import gridact from '/card/gridact.webp';
import secure from '/card/secure.webp';
import block from '/card/block.webp';
import toast, { Toaster } from 'react-hot-toast';


const listingContractAddress = process.env.listingContractAddress

const SellEnergy = () => {
    const [amount, setAmount] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");

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

    const Clear = async () => {
        setData({ energy: '', amount: '', duration: '' });
    }



    const createListing = async () => {
        if (!listingContract) {
            toast.error("Contract not loaded yet. Please wait.");
            return;
        }

        // Validate the inputs
        if (!amount || !price || !duration) {
            toast.error("Please fill in all fields.");
            return;
        }

        // Ensure that the amount, price, and duration are valid numbers
        if (isNaN(amount) || isNaN(price) || isNaN(duration)) {
            toast.error("Amount, Price, and Duration must be valid numbers.");
            return;
        }

        const accounts = await web3.eth.getAccounts();

        try {
            setLoading(true);

            // Send transaction
            await listingContract.methods.createListing(amount, price, duration).send({ from: accounts[0] });

            toast.success("Listing created successfully!");
            await fetchListings()
            Clear();
        } catch (error) {
            console.error("Error creating listing", error);
            toast.error("Error creating listing: " + error.message);
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
                <div className='flex lg:justify-evenly justify-center flex-wrap lg:max-w-full'>
                    <div className='flex flex-col flex-wrap lg:max-w-[65%]'>
                        <div className='p-4 rounded-xl bg-neutral-700 border-1 '>
                            <h1 className="text-lg font-bold border-gray-700 text-white">List Energy</h1>
                            <div className='mt-4'>
                                <input
                                    type="number"
                                    placeholder="Amount (kWh)"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}

                                    className="py-2 px-3 bg-transparent placeholder:text-neutral-500 border-b-[1px] border-b-[#23f7dd]  w-full text-white "
                                    disabled={loading} // Disable input during loading
                                />
                                <input
                                    type="number"
                                    name="amount"
                                    placeholder="Price (Wei)"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="py-2 px-3 mt-2 bg-transparent border-b-[1px] border-b-[#23f7dd]  block w-full text-white outline-none  "
                                    disabled={loading} // Disable input during loading
                                />
                                <input
                                    type="number"
                                    name="duration"
                                    placeholder="Duration (Days)"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}

                                    className="py-2 px-3 mt-2 bg-transparent border-b-[1px] border-b-[#23f7dd]  block w-full text-white outline-none  "
                                    disabled={loading} // Disable input during loading
                                />
                                <div className='flex justify-end'>
                                    <div className='flex '>

                                        <button onClick={Clear} className='text-white bg-black mr-2 rounded-2xl w-full py-1 px-6 mt-4'>
                                            Clear
                                        </button>
                                        <button className='text-black bg-[#23f7dd] rounded-2xl w-full py-1 px-6 mt-4' onClick={createListing} disabled={loading}>
                                            {loading ? <div className='flex justify-center items-center' role="status">
                                                <svg aria-hidden="true" class="w-6 h-6 text-transparent animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                            </div> : 'List'}
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className='text-lg font-bold text-white mt-4'>Active Energy Listings</h2>
                        <div className="overflow-x-auto w-full  [&::-webkit-scrollbar]:h-2
                             [&::-webkit-scrollbar-track]:bg-gray-100 
                             [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:w-2">
                            <table className=" min-w-full border-[1px] border-gray-700 rounded-lg mt-2">
                                <thead className='bg-neutral-700'>
                                    <tr>
                                        <th className="py-2 px-4 text-xs text-gray-200 uppercase dark:text-neutral-400">Producer</th>
                                        <th className="py-2 px-4 text-xs text-gray-200 uppercase dark:text-neutral-400">Energy (kWh)</th>
                                        <th className="py-2 px-4 text-xs text-gray-200 uppercase dark:text-neutral-400">Amount (wei)</th>
                                        <th className="py-2 px-4 text-xs text-gray-200 uppercase dark:text-neutral-400">Duration (hours)</th>
                                        <th className="py-2 px-4 text-xs text-gray-200 uppercase dark:text-neutral-400">Status</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200 dark:divide-neutral-700'>
                                    {listings.length > 0 ? (
                                        listings.map((listing, index) => (
                                            <tr key={index}>
                                                <td className="px-4 text-center py-2 text-sm text-neutral-200 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">{listing[0]}</td>
                                                <td className="px-4 text-center py-2 whitespace-nowrap text-sm text-neutral-200">{listing[1].toString()}</td>
                                                <td className="px-4 text-center py-2 whitespace-nowrap text-sm text-neutral-200">{listing[2].toString()}</td>
                                                <td className="px-4 text-center py-2 whitespace-nowrap text-sm text-neutral-200">{listing[3].toString()}</td>
                                                <td className="px-4 text-center py-2 whitespace-nowrap text-sm text-neutral-200">{listing[4] ? <div className='text-green-600 font-bold'>Active</div> : <div className='text-red-600 font-bold'>Not Active</div>}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center text-white py-2">No active energy available.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='text-white lg:max-w-[30%] overflow-hidden flex flex-col justify-center items-center'>
                        <div className='relative w-full flex justify-center bg-[#1a1a1a] items-center border border-zinc-700 rounded-3xl'>
                            <div className='absolute text-left text-white w-full px-8'>
                                <div className='text-2xl text-left text-[#737373]'>Active Microgrids</div>
                                <div className='text-right text-7xl text-[#23f7dd]'>56</div>
                            </div>
                            <img className='object-cover' srcSet={gridact} />
                        </div>

                        <div className='relative w-full flex justify-center mt-6 overflow-hidden bg-[#1a1a1a] items-center border border-zinc-700 rounded-3xl'>
                            <div className=' flex flex-col px-4 py-6 text-left text-white w-full z-10'>
                                <div className='text-2xl text-right text-white'>Decentralised</div>
                                <div className='text-right text-3xl text-[#23f7dd]'>With</div>
                                <div className='text-right text-6xl text-[#23f7dd]'>Blockchain</div>
                            </div>
                            <img className='w-[45%] absolute object-cover left-6 -top-20' srcSet={block} />
                        </div>

                        <div className='relative overflow-hidden w-full min-h-80 px-2 py-4 flex justify-center mt-6 bg-[#1a1a1a] border border-zinc-700 rounded-3xl'>
                            <div className='flex flex-col text-white text-center w-full z-10'>
                                <div className='text-3xl text-white'>Secure Transaction</div>
                                <div className='text-3xl text-white'>with</div>
                                <div className='text-3xl text-[#23f7dd]'>Escrow</div>
                            </div>
                            <img className='w-60 -bottom-12 absolute object-cover' srcSet={secure} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

export default SellEnergy;
