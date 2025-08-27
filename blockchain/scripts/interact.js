import { ethers } from "ethers";
import contractABI from "../abi/contractABI.json";
import { CONTRACT_ADDRESS } from "../config";

// Connect to MetaMask and the contract
export async function getContract() {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
  } else {
    alert("MetaMask not detected!");
    return null;
  }
}

// Call setValue(uint256 x)
export async function setValue(x) {
  const contract = await getContract();
  if (contract) {
    try {
      const tx = await contract.setValue(x);
      await tx.wait(); // Wait for transaction to be mined
      return tx;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

// Call getValue() view function
export async function getValue() {
  const contract = await getContract();
  if (contract) {
    try {
      const value = await contract.getValue();
      return value;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}