import React, { useEffect, useState } from 'react';
import web3 from '../web3';
import Sidebar from '../Components/Sidebar';
import WalletId from '../Components/WalletId';
import toast, { Toaster } from 'react-hot-toast';
import MatchingContractABI from '../abi/MatchingContract.json';
import TrackingContractABI from '../abi/TrackingContract.json';
import EscrowContractABI from '../abi/EscrowContract.json';
import FetchListing from '../Components/FetchListing';
import styled from 'styled-components';  // Added to style the Loader

const matchingContractAddress = process.env.matchingContractAddress;
const escrowContractAddress = process.env.escrowContractAddress;
const trackingContractAddress = process.env.trackingContractAddress;

const Loader = ({ text }) => {
    return (
        <StyledWrapper>
            <div className="loader" />
            <p>{text}</p>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  
  .loader {
    width: 45px;
    height: 40px;
    background: linear-gradient(#0000 calc(1*100%/6),#fff 0 calc(3*100%/6),#0000 0),
                linear-gradient(#0000 calc(2*100%/6),#fff 0 calc(4*100%/6),#0000 0),
                linear-gradient(#0000 calc(3*100%/6),#fff 0 calc(5*100%/6),#0000 0);
    background-size: 10px 400%;
    background-repeat: no-repeat;
    animation: matrix 1s infinite linear;
  }

  @keyframes matrix {
    0% {
      background-position: 0% 100%, 50% 100%, 100% 100%;
    }
    100% {
      background-position: 0% 0%, 50% 0%, 100% 0%;
    }
  }

  p {
    color: white;
    font-size: 14px;
    margin-top: 10px;
  }
`;

const BuyEnergy = () => {
    const [matchingContract, setMatchingContract] = useState(null);
    const [trackingContract, setTrackingContract] = useState(null);
    const [escrowContract, setEscrowContract] = useState(null);
    const [loading, setLoading] = useState(false);
    const [energydelivered, setenergydelivered] = useState(false);
    const [DebugFindMatch, setDebugFindMatch] = useState([]);
    const [fetchBidDetails, setfetchBidDetails] = useState([]);
    const [id, setid] = useState('');
    const [batchLoading, setBatchLoading] = useState(false);

    const [amount, setAmount] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [producerAddress, setProducerAddress] = useState("");

    useEffect(() => {
        const loadContracts = async () => {
            try {
                const matching = new web3.eth.Contract(MatchingContractABI, matchingContractAddress);
                const tracking = new web3.eth.Contract(TrackingContractABI, trackingContractAddress);
                const escrow = new web3.eth.Contract(EscrowContractABI, escrowContractAddress);

                setMatchingContract(matching);
                setTrackingContract(tracking);
                setEscrowContract(escrow);
            } catch (error) {
                console.error("Error loading contracts", error);
                toast.error("Error loading contracts");
            }
        };
        loadContracts();
    }, []);

    const Clear = async () => {
        setAmount("");
        setPrice("");
        setDuration("");
    }

    const placeBid = async () => {
        if (!amount || !price || !duration) {
            toast.error("Please provide all inputs.");
            return;
        }

        const accounts = await web3.eth.getAccounts();

        const parsedAmount = parseFloat(amount);
        const parsedPrice = parseFloat(price);
        const parsedDuration = parseInt(duration, 10);

        if (isNaN(parsedAmount) || isNaN(parsedPrice) || isNaN(parsedDuration)) {
            toast.error("Please provide valid number inputs.");
            return;
        }

        const totalCost = web3.utils.toWei((parsedAmount * parsedPrice).toString(), "wei");

        try {
            setLoading(true);

            const gasEstimate = await matchingContract.methods.placeBid(parsedAmount, parsedPrice, parsedDuration).estimateGas({
                from: accounts[0],
                value: totalCost,
            });

            const transaction = await matchingContract.methods.placeBid(parsedAmount, parsedPrice, parsedDuration).send({
                from: accounts[0],
                value: totalCost,
                gas: gasEstimate,
            });

            const setBidData = await transaction.events.BidPlaced.returnValues;
            setfetchBidDetails((prevDetails) => [...prevDetails, setBidData]);

            toast.success("Bid placed successfully!", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
            setAmount("");
            setPrice("");
            setDuration("");
        } catch (error) {
            console.error("Error placing bid", error);
            toast.error("Error placing bid: " + error.message);
        } finally {
            setLoading(false);
        }
    };
    const batchMatch = async () => {
        const accounts = await web3.eth.getAccounts();
        console.log("Acc", accounts);
        try {
            setBatchLoading(true); // Start loader for batch matching
            // Estimate gas for batchMatch function
            const gasEstimate = await matchingContract.methods.batchMatch().estimateGas({
                from: accounts[0],
            });
            console.log(gasEstimate);
            const transaction = await matchingContract.methods.batchMatch().send({
                from: accounts[0],
                gas: gasEstimate,
            });
            const DebugFindMatch = await transaction.events.DebugFindMatch.returnValues;
            setDebugFindMatch((prevDetails) => [...prevDetails, DebugFindMatch]);
            console.log("DebugFindMatch", DebugFindMatch);

            const id = await matchingContract.methods.bidId().call({
                from: accounts[0],
            });
            console.log("bidId", id);
            setid(id);
            toast.success("Batch match executed successfully!");
        } catch (error) {
            console.error("Error executing batch match", error);
            toast.error("Error executing batch match: " + error.message);
        } finally {
            setBatchLoading(false); // Stop loader for batch matching
        }
    };


    const markEnergyDelivered = async () => {
        if (!transactionId) {
            toast.error("Please provide a transaction ID.");
            return;
        }

        if (!web3.utils.isAddress(producerAddress)) {
            toast.error("Please provide a valid producer address.");
            return;
        }

        const accounts = await web3.eth.getAccounts();

        try {
            setLoading(true);
            setenergydelivered(true)
            // Estimate gas for markEnergyDelivered function
            const gasEstimate = await trackingContract.methods.markEnergyDelivered(transactionId).estimateGas({
                from: accounts[0],
            });

            // Mark energy as delivered
            await trackingContract.methods.markEnergyDelivered(transactionId).send({
                from: accounts[0],
                gas: gasEstimate,
            });
            toast.success("Energy marked as delivered!");

            // Estimate gas for release function in EscrowContract
            const escrowGasEstimate = await escrowContract.methods.release(producerAddress).estimateGas({
                from: accounts[0],
            });

            // Release funds from escrow
            await escrowContract.methods.release(producerAddress).send({
                from: accounts[0],
                gas: escrowGasEstimate,
            });
            toast.success("Funds released to producer!");
        } catch (error) {
            console.error("Error marking energy delivered", error);
            /*      toast.error("Error marking energy delivered: " + error.message); */
        } finally {
            setenergydelivered(false)
        }
    };


    return (
        <>
            <div className='bg-black h-[180vh]'>
                <Toaster position="top-center" />
                <Sidebar />
                <WalletId />
                <div className='lg:pl-[280px] flex justify-center flex-col flex-wrap pt-[110px] lg:pt-[80px]'>
                    <div className='flex justify-center flex-col gap-20 items-center'>
                        <div className='flex flex-col w-full bg-neutral-900 p-4 rounded-lg lg:w-[55%]'>
                            <h1 className="text-lg font-bold border-gray-700 text-white mb-2">Place a Bid</h1>

                            {loading ? (
                                <Loader text="Placing a bid..." />
                            ) : (
                                <div className='p-4 w-full rounded-xl bg-neutral-700 border-1  backdrop-blur-md'>
                                    <h1 className="text-lg font-bold border-gray-700 text-white">Bid Energy</h1>
                                    <div className='mt-4'>
                                        <input
                                            type="number"
                                            name="energy"
                                            placeholder="Amount (kWh)"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="py-2 px-3 mt-2 bg-transparent border-b-[1px] border-b-[#23f7dd]  block w-full text-white outline-none"
                                        />
                                        <input
                                            type="number"
                                            name="price"
                                            placeholder="Price (Wei)"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className="py-2 px-3 mt-2 bg-transparent border-b-[1px] border-b-[#23f7dd]  block w-full text-white outline-none"
                                        />
                                        <input
                                            type="number"
                                            name="duration"
                                            placeholder="Duration (Days)"
                                            value={duration}
                                            onChange={(e) => setDuration(e.target.value)}
                                            className="py-2 px-3 mt-2 bg-transparent border-b-[1px] border-b-[#23f7dd]  block w-full text-white outline-none"
                                        />
                                        <div className='flex justify-end'>
                                            <div className='flex'>
                                                <button onClick={Clear} className='text-white bg-black mr-2 rounded-2xl w-full py-1 px-6 mt-4'>
                                                    Clear
                                                </button>
                                                <button className='text-black bg-[#23f7dd] font-semibold rounded-2xl text-[14px] w-full py-1 px-6 mt-4' onClick={placeBid}>
                                                    Bid
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div>

                                <h2 className='text-lg  text-white font-semibold mt-4'>Your Bids</h2>
                                <div className="overflow-x-auto  w-full  [&::-webkit-scrollbar]:h-2
 [&::-webkit-scrollbar-track]:bg-gray-100 
 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:w-2">
                                    <table className=" min-w-full border-[1px] border-gray-700 rounded-lg mt-2">
                                        <thead className='bg-neutral-700'>
                                            <tr>
                                                <th className="py-2 px-4 text-xs text-gray-200 uppercase dark:text-neutral-400">Energy (kWh)</th>
                                                <th className="py-2 px-4 text-xs text-gray-200 uppercase dark:text-neutral-400">Price (wei)</th>
                                                <th className="py-2 px-4 text-xs text-gray-200 uppercase dark:text-neutral-400">Duration (hours)</th>

                                            </tr>
                                        </thead>
                                        <tbody className='divide-y divide-gray-200 dark:divide-neutral-700'>
                                            {fetchBidDetails && fetchBidDetails.length > 0 ? (
                                                fetchBidDetails.map((bidData, index) => (
                                                    <tr key={index}>
                                                        <td className="px-4 text-center py-2 whitespace-nowrap text-sm text-neutral-200">{bidData.amount.toString()}</td>
                                                        <td className="px-4 text-center py-2 whitespace-nowrap text-sm text-neutral-200">{bidData.price.toString()}</td>
                                                        <td className="px-4 text-center py-2 whitespace-nowrap text-sm text-neutral-200">{bidData.duration.toString()}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center text-white py-2">No Bids Available</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className='my-3 border-[1px] p-4 bg-neutral-900 rounded-lg border-gray-700 w-full lg:w-[55%]'>
                        <div className='bg-neutral-700 rounded-lg p-4'>
                            <h2 className='text-white'>Auto Match Energy</h2>
                            <span className='text-white text-xs'>Automatic matches energy which is available</span>
                            {batchLoading ? (
                                <Loader text="Finding the Best Match..." />
                            ) : (
                                <>
                                    <div className='flex justify-end mt-2'>
                                        <div className='flex '>

                                            <button className='text-black bg-[#23f7dd] font-semibold rounded-2xl text-[14px] py-1 px-6' onClick={batchMatch}>Batch Match</button>
                                        </div>
                                    </div>
                                </>)}
                                     
                        </div>
                            <div className="overflow-x-auto  w-full [&::-webkit-scrollbar]:h-2
                             [&::-webkit-scrollbar-track]:bg-gray-100 
                             [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:w-2">
                                <table className=" min-w-full border-[1px] border-gray-700 rounded-lg mt-2">
                                    <thead className='bg-neutral-700'>
                                        <tr>
                                            <th className="py-2 px-4 text-xs text-gray-200 uppercase dark:text-neutral-400">Bid Id</th>
                                            <th className="py-2 px-4 text-xs text-gray-200 uppercase dark:text-neutral-400">Energy (kWh)</th>
                                            <th className="py-2 px-4 text-xs text-gray-200 uppercase dark:text-neutral-400">Price (wei)</th>
                                            <th className="py-2 px-4 text-xs text-gray-200 uppercase dark:text-neutral-400">Duration (hours)</th>
                                            <th className="py-2 px-4 text-xs text-gray-200 uppercase dark:text-neutral-400">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-200 dark:divide-neutral-700'>
                                        {DebugFindMatch && DebugFindMatch.length > 0 ? (
                                            DebugFindMatch.map((data, index) => (
                                                <tr key={index}>
                                                    <td className="px-4 text-center py-2 whitespace-nowrap text-sm text-neutral-200">{id.toString()}</td>
                                                    <td className="px-4 text-center py-2 whitespace-nowrap text-sm text-neutral-200">{data.listingPrice.toString()}</td>
                                                    <td className="px-4 text-center py-2 whitespace-nowrap text-sm text-neutral-200">{data.listingAmount.toString()}</td>
                                                    <td className="px-4 text-center py-2 whitespace-nowrap text-sm text-neutral-200">{data.listingDuration.toString()}</td>
                                                    <td className="px-4 text-center py-2 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{data.listingActive ? <div className='text-[#00ffae] font-bold'>Active</div> : <div className='text-red-600 font-bold'>Not Active</div>}</td>

                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center text-white py-2">No Match Available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                        </div>

                        <div className='p-4 w-full lg:w-[55%] rounded-xl bg-neutral-900 border-1 '>
                            <h1 className="text-lg font-bold border-gray-700 text-white">Energy Delivered</h1>
                            <div className='mt-4 bg-neutral-700 py-3 px-4 rounded-lg'>
                                <h1 className='text-white'>Did the Energy Delivered?</h1>
                                {energydelivered ? (
                                    <Loader text="Making sure the energy is delivered..." />
                                ) : (
                                    <>
                                        <input
                                            type="text"

                                            placeholder="Transaction ID"
                                            value={transactionId}
                                            onChange={(e) => setTransactionId(e.target.value)}
                                            className="py-2 px-3 mt-2 bg-transparent border-b-[1px] border-b-[#23f7dd]  block w-full text-white outline-none  "
                                            disabled={loading}
                                        />
                                        <input
                                            type="text"
                                            name='producerAddress'
                                            placeholder="Producer Address"
                                            value={producerAddress}
                                            onChange={(e) => setProducerAddress(e.target.value)}
                                            className="py-2 px-3 mt-2 bg-transparent border-b-[1px] border-b-[#23f7dd]  block w-full text-white outline-none  "
                                            disabled={loading}
                                        />
                                    </>)}
                                <div className='flex justify-end'>
                                    <div className='flex '>

                                        <button onClick={Clear} className='text-white bg-black mr-2 rounded-2xl w-full py-1 px-6 mt-4'>
                                            Clear
                                        </button>
                                        <button className='text-black bg-[#23f7dd] font-semibold rounded-2xl text-[14px] w-full py-1 px-6 mt-4' onClick={markEnergyDelivered} disabled={loading}>
                                            {loading ? 'Processing...' : <span className=''>Delivered</span>}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BuyEnergy;
