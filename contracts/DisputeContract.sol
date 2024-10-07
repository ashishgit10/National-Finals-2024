// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract DisputeContract is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    enum DisputeStatus { Pending, Resolved, Rejected }

    struct Dispute {
        address complainant;
        string description;
        DisputeStatus status;
        string resolution;
        uint256 createdAt;
        uint256 resolvedAt;
    }

    mapping(uint256 => Dispute) public disputes;
    uint256 public disputeId;

    event DisputeCreated(uint256 disputeId, address indexed complainant, string description);
    event DisputeResolved(uint256 disputeId, string resolution);
    event DisputeRejected(uint256 disputeId, string resolution);

    modifier onlyAdmin() {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");
        _;
    }

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); // Set the deployer as the default admin
        _grantRole(ADMIN_ROLE, msg.sender); // Grant the deployer admin privileges
    }

    // User creates a dispute
    function createDispute(string memory _description) public {
        disputes[disputeId] = Dispute(
            msg.sender,
            _description,
            DisputeStatus.Pending,
            "",
            block.timestamp,
            0
        );
        emit DisputeCreated(disputeId, msg.sender, _description);
        disputeId++;
    }

    // Admin resolves the dispute
    function resolveDispute(uint256 _disputeId, string memory _resolution) public onlyAdmin {
        Dispute storage dispute = disputes[_disputeId];
        require(dispute.status == DisputeStatus.Pending, "Dispute is already resolved or rejected");

        dispute.status = DisputeStatus.Resolved;
        dispute.resolution = _resolution;
        dispute.resolvedAt = block.timestamp;

        emit DisputeResolved(_disputeId, _resolution);
    }

    // Admin rejects the dispute
    function rejectDispute(uint256 _disputeId, string memory _resolution) public onlyAdmin {
        Dispute storage dispute = disputes[_disputeId];
        require(dispute.status == DisputeStatus.Pending, "Dispute is already resolved or rejected");

        dispute.status = DisputeStatus.Rejected;
        dispute.resolution = _resolution;
        dispute.resolvedAt = block.timestamp;

        emit DisputeRejected(_disputeId, _resolution);
    }

    // Get dispute details
    function getDispute(uint256 _disputeId) public view returns (
        address complainant,
        string memory description,
        DisputeStatus status,
        string memory resolution,
        uint256 createdAt,
        uint256 resolvedAt
    ) {
        Dispute storage dispute = disputes[_disputeId];
        return (
            dispute.complainant,
            dispute.description,
            dispute.status,
            dispute.resolution,
            dispute.createdAt,
            dispute.resolvedAt
        );
    }
}
