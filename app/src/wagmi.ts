import { createConfig, http } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";
import { getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [baseSepolia],
    transports: {
      // RPC URL for each chain
      [baseSepolia.id]: http("https://sepolia.base.org"),
    },
    connectors: [
      // Connectors for your dApp
      coinbaseWallet({ appName: "txFusion", preference: "smartWalletOnly" }),
    ],
    // Required API Keys
    walletConnectProjectId: process.env
      .NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,

    // Required App Info
    appName: "txFusion",

    // Optional App Info
    appDescription: "Multi-tx using eip5792",
    appUrl: "https://txfusion.vercel.app/", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
