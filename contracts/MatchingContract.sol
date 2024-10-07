// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ListingContract.sol";
import "./EnergyToken.sol";
import "./TrackingContract.sol";
import "./EscrowContract.sol";

contract MatchingContract {
    struct Bid {
        address bidder;
        uint256 amount;
        uint256 price;
        uint256 duration;
        bool isActive;
        uint256 totalCost; // Total ETH locked in bid
    }

    mapping(uint256 => Bid) public bids;
    uint256 public bidId;
    uint256 public totalEnergySupply;   // Total energy listed in marketplace (supply)
    uint256 public totalEnergyDemand;   // Total energy requested in marketplace (demand)

    ListingContract public listingContract;
    EnergyToken public energyToken;
    TrackingContract public trackingContract;
    EscrowContract public escrowContract;

    event BidPlaced(uint256 bidId, address indexed bidder, uint256 amount, uint256 price, uint256 duration);
    event MatchFound(uint256 bidId, uint256 listingId, address producer);
    event AutomaticListingCreated(address producer, uint256 amount, uint256 price, uint256 duration);

    constructor(
        address _listingContractAddress,
        address _energyTokenAddress,
        address _trackingContractAddress,
        address payable _escrowContractAddress
    ) {
        listingContract = ListingContract(_listingContractAddress);
        energyToken = EnergyToken(_energyTokenAddress);
        trackingContract = TrackingContract(_trackingContractAddress);
        escrowContract = EscrowContract(_escrowContractAddress);
    }

    // Place a bid to buy energy and lock ETH in escrow
    function placeBid(uint256 _amount, uint256 _price, uint256 _duration) public payable {
        uint256 totalCost = _amount * _price;

        // Require that the ETH sent matches the total cost
        require(msg.value >= totalCost, "Not enough ETH sent for the bid");

        // Track the bid and lock ETH
        bids[bidId] = Bid(msg.sender, _amount, _price, _duration, true, totalCost);
        totalEnergyDemand += _amount; // Track demand

        emit BidPlaced(bidId, msg.sender, _amount, _price, _duration);
        bidId++;
    }

    // Batch match bids and listings
    function batchMatch() public {
        for (uint256 i = 0; i < bidId; i++) {
            Bid storage bid = bids[i];
            if (bid.isActive) {
                // Try to find and match a listing
                bool matched = findAndMatchListing(bid.amount, bid.price, bid.duration, i);
                if (matched) {
                    bid.isActive = false;
                }
            }
        }
    }

    // Manually find a matching listing for a bid
    function findAndMatchListing(uint256 _amount, uint256 _price, uint256 _duration, uint256 _bidId) internal returns (bool) {
        for (uint256 i = 0; i < listingContract.listingId(); i++) {
            ( , uint256 amount, uint256 price, uint256 duration, bool isActive) = listingContract.getListing(i);
            
            if (isActive && amount >= _amount && price <= _price && duration >= _duration) {
                matchEnergy(_bidId, i);
                return true;
            }
        }
        return false;
    }

    // Match a specific bid with a listing
    function matchEnergy(uint256 _bidId, uint256 _listingId) internal {
        Bid storage bid = bids[_bidId];
        require(bid.isActive, "Bid is not active");

        (address producer, uint256 amount, uint256 price, , bool isActive) = listingContract.getListing(_listingId);
        require(isActive, "Listing is not active");
        require(amount >= bid.amount, "Not enough energy in the listing");
        require(price <= bid.price, "Bid price is lower than listing price");

        // ETH already locked, no need to transfer dynamically
        uint256 totalCost = bid.totalCost;

        // Deposit ETH to escrow and link the producer and buyer
        escrowContract.deposit{value: totalCost}(producer, bid.bidder);

        // Mint the energy tokens directly to the buyer
        energyToken.mint(bid.bidder, bid.amount);

        // Record the transaction
        trackingContract.recordTransaction(bid.bidder, producer, bid.amount, price);

        bid.isActive = false;

        // Reduce energy in the listing after matching
        listingContract.reduceEnergy(_listingId, bid.amount);
        emit MatchFound(_bidId, _listingId, producer);
    }
}
