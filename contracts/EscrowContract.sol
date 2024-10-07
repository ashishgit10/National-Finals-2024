// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EscrowContract {
    address public producer;
    address public buyer;
    uint256 public amount;

    event Deposited(address indexed producer, address indexed buyer, uint256 amount);
    event Released(address indexed producer, uint256 amount);
    event Refunded(address indexed buyer, uint256 amount);

    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only the buyer can perform this action");
        _;
    }

    // Deposit function to hold ETH dynamically during the matching process
    function deposit(address _producer, address _buyer) public payable {
        require(msg.value > 0, "ETH amount must be greater than zero");

        producer = _producer;
        buyer = _buyer;
        amount = msg.value; // Set the amount equal to the transferred ETH

        emit Deposited(producer, buyer, amount);
    }

    // Release funds to the producer (done after energy is delivered)
    function release(address _seller) public {
        require(amount > 0, "No funds to release");

        uint256 payment = amount;
        amount = 0; // Reset the amount to prevent re-entrancy
        payable(_seller).transfer(payment);

        emit Released(_seller, payment);
    }

    // Refund the buyer (in case of dispute)
    function refund() public onlyBuyer {
        require(amount > 0, "No funds to refund");

        uint256 payment = amount;
        amount = 0; // Reset the amount to prevent re-entrancy
        payable(buyer).transfer(payment);

        emit Refunded(buyer, payment);
    }

    // Fallback function to receive ETH
    receive() external payable {}
}
