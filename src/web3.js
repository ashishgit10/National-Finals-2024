import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && window.ethereum) {
  // Modern DApp browsers
  web3 = new Web3(window.ethereum);
  window.ethereum
    .request({ method: "eth_requestAccounts" })
    .catch((error) => console.error("User denied account access:", error));
} else if (typeof window !== "undefined" && window.web3) {
  // Legacy DApp browsers
  web3 = new Web3(window.web3.currentProvider);
} else {
  // Non-DApp browsers
  console.warn("Non-Ethereum browser detected. Please consider installing MetaMask.");
}

export default web3;
