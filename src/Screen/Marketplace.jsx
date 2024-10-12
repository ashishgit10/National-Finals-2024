import React, { useEffect, useState } from 'react';
import web3 from '../web3';
import MatchingContractABI from '../abi/MatchingContract.json';
import TrackingContractABI from '../abi/TrackingContract.json';
import EscrowContractABI from '../abi/EscrowContract.json';
import Sidebar from '../Components/Sidebar';
import WalletId from '../Components/WalletId';

const matchingContractAddress = process.env.matchingContractAddress;
const escrowContractAddress = process.env.escrowContractAddress;
const trackingContractAddress = process.env.trackingContractAddress;

const Marketplace = () => {
    const [matchingContract, setMatchingContract] = useState(null);
    const [trackingContract, setTrackingContract] = useState(null);
    const [escrowContract, setEscrowContract] = useState(null);
    const [amount, setAmount] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
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
    const placeBid = async () => {
        if (!amount || !price || !duration) {
            alert("Please provide all inputs.");
            return;
        }

        const accounts = await web3.eth.getAccounts();
        const totalCost = web3.utils.toWei((amount * price).toString(), "ether");
        try {
            await matchingContract.methods.placeBid(amount, price, duration).send({ from: accounts[0], value: totalCost });
            alert("Bid placed successfully!");
        } catch (error) {
            console.error("Error placing bid", error);
            alert("Error placing bid: " + error.message);
        }
    };

    const batchMatch = async () => {
        const accounts = await web3.eth.getAccounts();
        try {
            await matchingContract.methods.batchMatch().send({ from: accounts[0] });
            alert("Batch match executed!");
        } catch (error) {
            console.error("Error executing batch match", error);
            alert("Error executing batch match: " + error.message);
        }
    };

    const markEnergyDelivered = async () => {
        if (!transactionId) {
            alert("Please provide a transaction ID.");
            return;
        }

        if (!producerAddress) {
            alert("Please provide the producer's address.");
            return;
        }

        const accounts = await web3.eth.getAccounts();
        try {
            // Mark energy as delivered
            await trackingContract.methods.markEnergyDelivered(transactionId).send({ from: accounts[0] });
            alert("Energy marked as delivered!");

            // Release funds from escrow
            await escrowContract.methods.release(producerAddress).send({ from: accounts[0] });
            alert("Funds released to producer!");
        } catch (error) {
            console.error("Error marking energy delivered", error);
            alert("Error marking energy delivered: " + error.message);
        }
    };


    return (
        <div className='bg-black h-screen'>
            <Sidebar />
            <WalletId />
            {/*  <div className='max-w-5xl lg:pt-24 m-auto lg:pl-3'>
                <h2 className='text-lg font-bold text-white'>Bid Status</h2>
                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-200">Bidder</th>
                                <th className="py-2 px-4 border-b border-gray-200">Amount</th>
                                <th className="py-2 px-4 border-b border-gray-200">Price</th>
                                <th className="py-2 px-4 border-b border-gray-200">Duration</th>
                                <th className="py-2 px-4 border-b border-gray-200">Status</th>
                                <th className="py-2 px-4 border-b border-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bids.length > 0 ? (
                                bids.map((bid, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border-b border-gray-200">{bid.bidder}</td>
                                        <td className="px-4 py-2 border-b border-gray-200">{bid.amount.toString()} kWh</td>
                                        <td className="px-4 py-2 border-b border-gray-200">{bid.price.toString()} wei</td>
                                        <td className="px-4 py-2 border-b border-gray-200">{bid.duration.toString()} hours</td>
                                        <td className="px-4 py-2 border-b border-gray-200">{bid.isActive ? "Active" : "Inactive"}</td>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                            <button className='text-white border' onClick={() => releaseFunds(index)} className='bg-green-500 text-white rounded px-2 py-1'>Release Funds</button>
                                            <button className='text-white border' onClick={() => requestRefund(index)} className='bg-red-500 text-white rounded px-2 py-1'>Request Refund</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-2">No bids available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <h2 className='text-white'>Find Match</h2>
                <button className='text-white border' onClick={batchMatch}>Batch Match</button>


                <h2 className='text-white'>Mark Energy Delivered</h2>
                <input
                    type="text"
                    placeholder="Transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Producer Address"
                    value={producerAddress}
                    onChange={(e) => setProducerAddress(e.target.value)}
                />
                <button className='text-white border' onClick={markEnergyDelivered}>Mark Energy Delivered</button>

                <div className='text-white mt-4'>
                    <h2 className='text-lg font-bold'>Escrow Balance: {escrowBalance} ETH</h2>
                </div>
            </div> */}
            <div className='pl-[300px] pt-[300px]'>
                <h2 className='text-white'>Place Bid</h2>
                <input
                    type="text"
                    placeholder="Amount (kWh)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Price (Wei)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Duration (Days)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
                <button className='text-white border' onClick={placeBid}>Place Bid</button>

                <h2 className='text-white'>Find Match</h2>
                <button className='text-white border' onClick={batchMatch}>Batch Match</button>

                <h2 className='text-white'>Mark Energy Delivered</h2>
                <input
                    type="text"
                    placeholder="Transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Producer Address"
                    value={producerAddress}
                    onChange={(e) => setProducerAddress(e.target.value)}
                />
                <button className='text-white border' onClick={markEnergyDelivered}>Mark Energy Delivered</button>
            </div>
        </div>
    );
};

export default Marketplace;
