import { ethers } from "ethers";
import contractAbi from "../../blockchain/abi/contractAbi.json";

// Replace with your deployed contract address
export const CONTRACT_ADDRESS = "0xYourContractAddress";

export function getContract(signerOrProvider) {
  return new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signerOrProvider);
}