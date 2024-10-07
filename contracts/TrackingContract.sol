// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./EscrowContract.sol";

contract TrackingContract {
    struct TransactionRecord {
        address buyer;
        address seller;
        uint256 amount;
        uint256 price;
        uint256 totalCost;
        bool energyDelivered;
        bool paymentReceived;
    }

    mapping(uint256 => TransactionRecord) public transactions;
    uint256 public transactionId;
    EscrowContract public escrowContract; // Added reference to EscrowContract

    event TransactionRecorded(uint256 transactionId, address buyer, address seller, uint256 amount, uint256 price, uint256 totalCost);
    event EnergyDelivered(uint256 transactionId, address buyer, uint256 amount);
    event PaymentReceived(uint256 transactionId, address seller, uint256 totalCost);

    constructor(address _escrowContractAddress) {
        escrowContract = EscrowContract(payable(_escrowContractAddress)); // Escrow contract address
    }

    // Record a new transaction
    function recordTransaction(
        address _buyer,
        address _seller,
        uint256 _amount,
        uint256 _price
    ) external {
        uint256 totalCost = _amount * _price;
        transactions[transactionId] = TransactionRecord(_buyer, _seller, _amount, _price, totalCost, false, false);

        emit TransactionRecorded(transactionId, _buyer, _seller, _amount, _price, totalCost);
        transactionId++;
    }

    // Mark energy as delivered and automatically release funds
    function markEnergyDelivered(uint256 _transactionId) external {
        TransactionRecord storage transaction = transactions[_transactionId];
        require(!transaction.energyDelivered, "Energy already marked as delivered");

        transaction.energyDelivered = true;
        emit EnergyDelivered(_transactionId, transaction.buyer, transaction.amount);

        // Automatically release the funds from escrow to the seller
        escrowContract.release(transaction.seller);
    }

    // Mark payment as received
    function markPaymentReceived(uint256 _transactionId) external {
        TransactionRecord storage transaction = transactions[_transactionId];
        require(!transaction.paymentReceived, "Payment already marked as received");

        transaction.paymentReceived = true;
        emit PaymentReceived(_transactionId, transaction.seller, transaction.totalCost);
    }
}
