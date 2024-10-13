import React, { useEffect, useState } from 'react';
import web3 from '../web3';
import MatchingContractABI from '../abi/MatchingContract.json';
import TrackingContractABI from '../abi/TrackingContract.json';
import EscrowContractABI from '../abi/EscrowContract.json';
import Sidebar from '../Components/Sidebar';
import WalletId from '../Components/WalletId';
import toast, { Toaster } from 'react-hot-toast';

const matchingContractAddress = process.env.matchingContractAddress;
const escrowContractAddress = process.env.escrowContractAddress;
const trackingContractAddress = process.env.trackingContractAddress;

const BuyEnergy = () => {
    const [matchingContract, setMatchingContract] = useState(null);
    const [trackingContract, setTrackingContract] = useState(null);
    const [escrowContract, setEscrowContract] = useState(null);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        energy: '',
        amount: '',
        duration: '',
        producerAddress: '',
        transactionId: ""
    });
    const [transactionId, setTransactionId] = useState("");
    const [producerAddress, setProducerAddress] = useState("");

    useEffect(() => {
        const loadContracts = async () => {
            const matching = new web3.eth.Contract(MatchingContractABI, matchingContractAddress);
            const tracking = new web3.eth.Contract(TrackingContractABI, trackingContractAddress);
            const escrow = new web3.eth.Contract(EscrowContractABI, escrowContractAddress);

            setMatchingContract(matching);
            setTrackingContract(tracking);
            setEscrowContract(escrow);
        };
        loadContracts();
    }, []);

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

    /*     const fetchBids = async (web3Instance) => {
            try {
                const matchingContract = new web3Instance.eth.Contract(MatchingABI, matchingContractAddress);
                const bidCount = await matchingContract.methods.bidId().call(); // Get total bid count
                const fetchedBids = [];
    
                for (let i = 0; i < bidCount; i++) {
                    const bid = await matchingContract.methods.bids(i).call(); // Fetch each bid
                    fetchedBids.push(bid);
                }
    
                setBids(fetchedBids);
            } catch (error) {
                console.error("Error fetching bids:", error);
            }
        }; */
    const placeBid = async (e) => {
        e.preventDefault();
        if (!amount || !price || !duration) {
            toast.error("Please provide all inputs.",
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

        const accounts = await web3.eth.getAccounts();
        const totalCost = web3.utils.toWei((amount * price).toString(), "ether");
        try {
            await matchingContract.methods.placeBid(amount, price, duration).send({ from: accounts[0], value: totalCost });
            toast("Bid placed successfully!",
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        } catch (error) {
            console.error("Error placing bid", error);
            toast("Oops! Error placing bid",
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }
    };

    const batchMatch = async () => {
        const accounts = await web3.eth.getAccounts();
        try {
            await matchingContract.methods.batchMatch().send({ from: accounts[0] });
            toast.success("Batch match executed successfully!",
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );

        } catch (error) {
            console.error("Error executing batch match", error);
            toast("Oops! Error executing batch match",
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }
    };

    const markEnergyDelivered = async () => {
        if (!transactionId) {
            toast("Please provide a transaction ID.",
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

        if (!producerAddress) {
            toast("Please provide the producer's address.",
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

        const accounts = await web3.eth.getAccounts();
        try {
            // Mark energy as delivered
            await trackingContract.methods.markEnergyDelivered(transactionId).send({ from: accounts[0] });
            toast("Energy marked as delivered!",
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );

            // Release funds from escrow
            await escrowContract.methods.release(producerAddress).send({ from: accounts[0] });
            toast("Funds released to producer!",
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );

        } catch (error) {
            console.error("Error marking energy delivered", error);
            alert("Error marking energy delivered: " + error.message);
            toast("Error marking energy delivered",
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }
    };


    return (
        <div className='bg-black h-screen'>
            <Toaster
                position="bottom-left" />
            <Sidebar />
            <WalletId />

            <div className='lg:pl-[280px] flex justify-center flex-col flex-wrap pt-[110px] lg:pt-[80px]'>
                <div className='flex flex-col w-full lg:w-[50%]'>
                    <h2 className='text-white'>Place Bid</h2>
                    <form onSubmit={placeBid} className='p-4 w-full rounded-xl bg-white/30 border-1  backdrop-blur-md'>
                        <h1 className="text-lg font-bold border-gray-700 text-white">Sell Energy</h1>
                        <div className='mt-4'>
                            <input

                                type="number"
                                name="energy"
                                value={data.energy}
                                onChange={handleData}
                                placeholder="Energy (kWh)"
                                className="py-2 px-3 bg-transparent border-b-[1px] border-gray-300 block w-full text-white outline-none  "
                                disabled={loading}
                            />
                            <input
                                type="number"
                                name="amount"
                                value={data.amount}
                                onChange={handleData}
                                placeholder="Amount"
                                className="py-2 px-3 mt-2 bg-transparent border-b-[1px] border-gray-300 block w-full text-white outline-none  "
                                disabled={loading}
                            />
                            <input
                                type="number"
                                name="duration"
                                value={data.duration}
                                onChange={handleData}
                                placeholder="Duration (hours)"
                                className="py-2 px-3 mt-2 bg-transparent border-b-[1px] border-gray-300 block w-full text-white outline-none  "
                                disabled={loading}
                            />
                            <div className='flex justify-end'>
                                <div className='flex '>

                                    <button onClick={Clear} className='text-white bg-black mr-2 rounded-2xl w-full py-1 px-6 mt-4'>
                                        Clear
                                    </button>
                                    <button className='text-black bg-[#23f7dd] rounded-2xl text-[14px] w-full py-1 px-6 mt-4' type='submit' disabled={loading}>
                                        {loading ? 'Processing...' : <span >Order</span>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='my-3 border-[1px] p-4 bg-neutral-600 rounded-lg border-gray-700 w-full lg:w-[50%]'>
                    <h2 className='text-white'>Auto Match Energy</h2>
                    <span className='text-white text-xs'>Automatic matches energy which is available</span>
                    <div className='flex justify-end'>
                        <div className='flex '>

                            <button className='text-black bg-[#23f7dd] rounded-2xl text-[14px] py-1 px-6' onClick={batchMatch}>Batch Match</button>
                        </div>
                    </div>
                </div>

                <form onSubmit={markEnergyDelivered} className='p-4 w-full lg:w-[50%] rounded-xl bg-white/30 border-1  backdrop-blur-md'>
                    <h1 className="text-lg font-bold border-gray-700 text-white">Energy Delivered</h1>
                    <div className='mt-4'>
                        <input
                            type="text"
                            placeholder="Transaction ID"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            className="py-2 px-3 bg-transparent border-b-[1px] border-gray-300 block w-full text-white outline-none  "
                            disabled={loading}
                        />
                        <input
                            type="text"
                            placeholder="Producer Address"
                            value={data.producerAddress}
                            onChange={(e) => setProducerAddress(e.target.value)}
                            className="py-2 px-3 bg-transparent border-b-[1px] border-gray-300 block w-full text-white outline-none  "
                            disabled={loading}
                        />
                        <div className='flex justify-end'>
                            <div className='flex '>

                                <button onClick={Clear} className='text-white bg-black mr-2 rounded-2xl w-full py-1 px-6 mt-4'>
                                    Clear
                                </button>
                                <button className='text-black bg-[#23f7dd] rounded-2xl text-[14px] w-full py-1 px-6 mt-4' type='submit' disabled={loading}>
                                    {loading ? 'Processing...' : <span className=''>Delivered</span>}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BuyEnergy;
