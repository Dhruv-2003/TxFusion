"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { createConfig, http } from "wagmi";
import { base, baseSepolia, sepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";
import { useState } from "react";

const APP_NAME = "My Awesome App";
const APP_LOGO_URL = "https://example.com/logo.png";
const APP_SUPPORTED_CHAIN_IDS = ["8453", "84532"];

// export const coinbaseWallet = new CoinbaseWalletSDK({
//   appName: APP_NAME,
//   appLogoUrl: APP_LOGO_URL,
//   chainIds: APP_SUPPORTED_CHAIN_IDS,
//   connectionPreference: "embedded",
// });

export const config = createConfig({
  chains: [baseSepolia, base],
  connectors: [
    coinbaseWallet({
      appName: APP_NAME,
    }),
  ],
  ssr: true,
  transports: {
    [baseSepolia.id]: http("https://sepolia.base.org"),
    [base.id]: http("https://mainnet.base.org"),
  },
});

declare module "wagmi" {
  type Register = {
    config: typeof config;
  };
}

// const config = getDefaultConfig({
//   appName: "Discovery Donar",
//   projectId: "afdac16b07284976cc7f71299771b2b7",
//   chains: [arbitrum, arbitrumSepolia, polygonMumbai, sepolia, baseSepolia],
// });

// Initialize a Web3 Provider object
// export const ethereum = coinbaseWallet.makeWeb3Provider();

// Initialize a Web3 object
// export const web3 = new Web3(ethereum as any);

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
