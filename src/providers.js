import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

const APP_NAME = "Crypto Retirement Fund";
const APP_LOGO_URL = "https://example.com/logo.png"; // Replace with your app's logo
const INFURA_ID = process.env.INFURA_ID;
const INFURA_RPC_URL = `https://mainnet.infura.io/v3/${INFURA_ID}`;
const DEFAULT_CHAIN_ID = 1;

export const getCoinbaseWalletProvider = () => {
  const coinbaseWallet = new CoinbaseWalletSDK({
    appName: APP_NAME,
    appLogoUrl: APP_LOGO_URL,
    darkMode: false,
  });
  return coinbaseWallet.makeWeb3Provider(INFURA_RPC_URL, DEFAULT_CHAIN_ID);
};

export const getMetaMaskProvider = () => {
  return (
    window.ethereum?.providers?.find((p) => !!p.isMetaMask) ?? window.ethereum
  );
};
