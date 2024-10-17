import React, { useEffect, useState } from 'react'
import listingcontractABI from "../abi/ListingContract.json"


const listingContractAddress = '0x79B41C78A2B5ac1DdC3c80877449b1CC8f850C46'

const FetchListing = () => {
    const [listings, setListings] = useState([]);
    const [listingContract, setListingContract] = useState(null);
    const [account, setAccount] = useState(null);
    // Load contract and accounts on component mount
    useEffect(() => {
        const loadContractAndAccounts = async () => {
            try {
              
                const accounts = await web3.eth.requestAccounts();
                setAccount(accounts[0]);
                const contract = new web3.eth.Contract(listingcontractABI, listingContractAddress);
                setListingContract(contract);
                await fetchListings(contract);
            } catch (error) {
                console.error("Error loading contract or fetching accounts", error);
            } 
        };
        loadContractAndAccounts();
    }, []);

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


    return (
        <div>
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
                                    <td className="px-4 text-center py-2 whitespace-nowrap text-sm text-neutral-200">{listing[2].toString()}</td>
                                    <td className="px-4 text-center py-2 whitespace-nowrap text-sm text-neutral-200">{listing[1].toString()}</td>
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
    )
}

export default FetchListing