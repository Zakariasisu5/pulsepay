import { ethers } from "ethers";

// Minimal MetaMask-only wallet connection
export async function connectWallet(setWalletAddress) {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      localStorage.setItem("pulsepay_wallet", address);
      return address;
    } catch (err) {
      console.error("Wallet connection failed", err);
      return null;
    }
  } else {
    alert("MetaMask not detected!");
    return null;
  }
}