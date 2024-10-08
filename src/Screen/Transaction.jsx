import React, { useState, useEffect } from 'react';
import dashbg from '/Bg/dash.jpg';
import Web3 from 'web3';
import ContractABI from '../ContractABI/contractABI.json'; // Make sure this path is correct
const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';

const Transaction = () => {
    const [data, setData] = useState({
        energy: '',
        amount: '',
        duration: ''
    });

    const [buy, setBuy] = useState(true);
    const [account, setAccount] = useState('');
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [listings, setListings] = useState([]); // State to hold listings

    useEffect(() => {
        const loadWeb3 = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
                const accounts = await web3Instance.eth.requestAccounts();
                setAccount(accounts[0]);
                const contractInstance = new web3Instance.eth.Contract(ContractABI, contractAddress);
                setContract(contractInstance);
                await fetchListings(contractInstance); // Fetch listings when the contract is set
            } else {
                alert('Please install MetaMask to use this feature.');
            }
        };

        loadWeb3();
    }, []);

    const fetchListings = async (contractInstance) => {
        const listingId = await contractInstance.methods.listingId().call();
        const fetchedListings = [];

        for (let i = 0; i < listingId; i++) {
            const listing = await contractInstance.methods.getListing(i).call();
            fetchedListings.push(listing);
        }

        setListings(fetchedListings);
    };

    const formData = async (e) => {
        e.preventDefault();
        if (contract) {
            try {
                const { energy, amount, duration } = data;
                await contract.methods.createListing(amount, energy, duration).send({
                    from: account,
                    gas: 2000000, // Adjust gas limit as necessary
                });
                console.log('Listing created successfully!');
                await fetchListings(contract); // Refresh the listings after creating a new one
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
        <div className='bg-white h-[100vh]'
            style={{
                backgroundImage: `url(${dashbg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                color: 'white'
            }}
        >
            <div>
                <form onSubmit={formData}>
                    <div className="w-[300px] p-4 flex flex-col justify-start rounded-xl bg-white/30 border-white border-2 backdrop-blur-md">
                        <div className='pb-3 border-b-[1px] flex justify-between items-center'>
                            <h1 className="text-lg font-bold border-gray-700 text-black">Exchange</h1>
                            <div className='flex border items-center py-1 px-2 rounded-lg gap-2'>
                                <div onClick={() => setBuy(!buy)} className={`text-black border px-2 rounded-lg cursor-pointer ${buy ? "bg-white" : ""}`}>Buy</div>
                                <div onClick={() => setBuy(!buy)} className={`text-black border px-2 rounded-lg cursor-pointer ${buy ? "" : "bg-white"}`}>Sell</div>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <div className="flex rounded-lg shadow-sm">
                                <input type="number" name='energy' value={data.energy} onChange={handleData} className="py-2 px-3 pe-11 bg-transparent border-2 outline-none block w-full border-white shadow-sm rounded-s-md text-sm focus:z-10 focus:border-bltext-black focus:ring-bltext-black" />
                                <span className="px-4 inline-flex items-center min-w-fit rounded-r-md border-2 border-l-0 border-white bg-transparent font-bold text-sm text-black">Energy</span>
                            </div>
                            <div className="flex rounded-lg shadow-sm mt-2">
                                <input type="number" name='amount' value={data.amount} onChange={handleData} className="py-2 px-3 pe-11 bg-transparent border-2 outline-none block w-full border-white shadow-sm rounded-s-md text-sm focus:z-10 focus:border-bltext-black focus:ring-bltext-black" />
                                <span className="px-2 inline-flex items-center min-w-fit rounded-r-md border-2 border-l-0 border-white bg-transparent font-bold text-sm text-black">Address</span>
                            </div>
                            <div className="flex rounded-lg shadow-sm mt-2">
                                <input type="number" name='duration' value={data.duration} onChange={handleData} className="py-2 px-3 pe-11 bg-transparent border-2 outline-none block w-full border-white shadow-sm rounded-s-md text-sm focus:z-10 focus:border-bltext-black focus:ring-bltext-black" />
                                <span className="px-2 inline-flex items-center min-w-fit rounded-r-md border-2 border-l-0 border-white bg-transparent font-bold text-sm text-black">Duration</span>
                            </div>
                        </div>
                        <div>
                            <button className='text-black text-[13px] bg-gradient-to-r from-orange-500 to-orange-300 rounded-sm w-full py-1 mt-4' type='submit'>BUY</button>
                        </div>
                    </div>
                </form>

                {/* Display Listings */}
                <div className='mt-4'>
                    <h2 className='text-lg font-bold text-black'>Active Listings</h2>
                    <ul className='list-disc pl-5'>
                        {listings.map((listing, index) => (
                            <li key={index} className='py-2'>
                                <div>
                                    <span className='font-bold'>Producer:</span> {listing[0]}
                                </div>
                                <div>
                                    <span className='font-bold'>Amount:</span> {listing[1]}
                                </div>
                                <div>
                                    <span className='font-bold'>Price:</span> {listing[2]}
                                </div>
                                <div>
                                    <span className='font-bold'>Duration:</span> {listing[3]}
                                </div>
                                <div>
                                    <span className='font-bold'>Active:</span> {listing[4] ? "Yes" : "No"}
                                </div>
                                <hr />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Transaction;
