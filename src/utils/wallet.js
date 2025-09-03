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
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";


export async function connectWallet(setWalletAddress) {
  const web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions: {
      injected: {
        display: {
          name: "MetaMask / Injected",
          description: "Connect with browser wallet extension"
        },
        package: null
      },
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: "27e484dcd9e3efcfd25a83a78777cdf1"
          }
        },
  // Removed custom wallet providers (OKX, Sui, Sonic) for compatibility
    }
  });

  try {
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setWalletAddress(address);
    localStorage.setItem("pulsepay_wallet", address);
    return address;
  } catch (err) {
    console.error("Wallet connection failed", err);
    return null;
  }
}