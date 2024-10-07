// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract EnergyToken is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC20("EnergyToken", "ENRG") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); // Admin role assigned to deployer
    }

    // Mint function restricted to accounts with MINTER_ROLE
    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    // Admin can set the matching contract as a minter
    function setMatchingContract(address matchingContract) external {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not an admin");
        grantRole(MINTER_ROLE, matchingContract); // Grant MINTER_ROLE to MatchingContract
    }
}
