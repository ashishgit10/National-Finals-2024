// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ListingContract {
    struct Listing {
        address producer;
        uint256 amount; // kWh
        uint256 price;  // Price per kWh in wei
        uint256 duration; // Duration of listing in hours
        bool isActive;
    }

    mapping(uint256 => Listing) public listings;
    uint256 public listingId;

    event ListingCreated(uint256 listingId, address indexed producer, uint256 amount, uint256 price, uint256 duration, bool isActive);
    event ListingDeactivated(uint256 listingId);

    // Producer creates a listing
    function createListing(uint256 _amount, uint256 _price, uint256 _duration) public {
        listings[listingId] = Listing(msg.sender, _amount, _price, _duration, true);
        emit ListingCreated(listingId, msg.sender, _amount, _price, _duration, true);
        listingId++;
    }

    // Automatic listing function that accepts price and amount
    function createAutomaticListing(address _producer, uint256 _amount, uint256 _price, uint256 _duration) external {
        listings[listingId] = Listing(_producer, _amount, _price, _duration, true);
        emit ListingCreated(listingId, _producer, _amount, _price, _duration, true);
        listingId++;
    }

    // Reduce the energy available in the listing after a match
    function reduceEnergy(uint256 _listingId, uint256 _amount) public {
        Listing storage listing = listings[_listingId];
        require(listing.isActive, "Listing is not active");
        require(listing.amount >= _amount, "Not enough energy in the listing");

        listing.amount -= _amount;

        if (listing.amount == 0) {
            listing.isActive = false;
            emit ListingDeactivated(_listingId);
        }
    }

    // Getter for listing
    function getListing(uint256 _listingId) public view returns (address, uint256, uint256, uint256, bool) {
        Listing storage listing = listings[_listingId];
        return (listing.producer, listing.amount, listing.price, listing.duration, listing.isActive);
    }
}
