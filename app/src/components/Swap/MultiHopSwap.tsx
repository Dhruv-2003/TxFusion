import { type ChangeEvent, useCallback, useState } from "react";
import { writeContracts } from "viem/experimental";
import { useAccount, useWalletClient } from "wagmi";

import { approveToken, deposit } from "@/actions/generic/generictx";
import { exactInputMultihop } from "@/actions/uniswap/swaps";
import { WETH_ABI } from "@/constants/abi";
import { useWaitForTransaction } from "../../hooks/useWaitForTransaction";

//these are mainnet addresses
const DAI = "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb";
const WETH = "0x4200000000000000000000000000000000000006";
const USDC = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const UNISWAP_ROUTER = "0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4";

export function MultipHopSwap() {
  const [amountIn, setAmountIn] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const { data: status } = useWaitForTransaction({ txId: transactionId });
  const steps = [
    "Deposit ETH to WETH contract",
    "Approve WETH to UNISWAP Router",
    "Swap WETH for DAI via USDC token on UNISWAP Multi Hop",
  ];

  const handleChangeAmount = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAmountIn(e.target.value);
  }, []);

  const handleSupply = useCallback(async () => {
    if (walletClient && address) {
      const deadline = Math.round(new Date().getTime() / 1000) + 86400;
      console.log("Executing Transactions");
      try {
        const txId = await writeContracts(walletClient, {
          account: address,
          contracts: [
            deposit(WETH, WETH_ABI, amountIn),
            approveToken(WETH, WETH_ABI, UNISWAP_ROUTER, amountIn),
            // @ts-ignore
            exactInputMultihop(
              DAI,
              USDC,
              WETH,
              address as string,
              deadline,
              amountIn
            ),
          ],
        });

        setTransactionId(txId);
      } catch (error) {
        console.log(error);
      }
    }
  }, [walletClient, address, amountIn]);

  return (
    <div className="bg-[#1a1b25] text-white rounded-lg shadow-xl py-8 px-8 space-y-5 w-full">
      <div className=" text-2xl font-semibold">
        Multi Hop Native Assets Swap to Tokens on Uniswap
      </div>
      <div>
        <ul className=" list-decimal pl-5 space-y-0.5">
          {steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ul>
      </div>
      <div className=" space-y-4">
        <div className=" space-y-1">
          <span>Token</span>
          <select className="bg-[#F4F7F5] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer">
            <option selected>Choose a token Out</option>
            <option value="USDC">DAI</option>
            <option value="USDC">USDC</option>
            <option value="wEth">wETH</option>
          </select>
        </div>
        <div className=" space-y-1">
          <span>Chain</span>
          <select className="bg-[#F4F7F5] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer">
            <option selected>Select a chain</option>
            <option value="baseSepolia">Base</option>
          </select>
        </div>
        <div className=" space-y-1">
          <span>Amount</span>
          <input
            value={amountIn}
            onChange={(e) => setAmountIn(e.target.value)}
            placeholder="Enter amount"
            className=" bg-[#F4F7F5] w-full px-3 py-2 rounded-md text-[#1a1b25] outline-none ring-0"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleSupply}
        className="relative inline-flex items-center justify-center p-4 px-6 py-2.5 overflow-hidden transition duration-300 ease-out border border-green-400 rounded-md shadow-md group w-full active:scale-95"
      >
        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-green-400 group-hover:translate-x-0 ease">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="#000000"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </span>
        <span className="absolute flex items-center justify-center w-full h-full text-green-400 transition-all duration-300 transform group-hover:translate-x-full ease">
          Execute
        </span>
        <span className="relative invisible">Execute</span>
      </button>
      {status?.receipts?.[0]?.transactionHash && (
        <a
          href={`https://sepolia.basescan.org/tx/${status.receipts?.[0].transactionHash}`}
          target="_blank"
          rel="noreferrer"
          className="bg-white text-zinc-800 rounded-md text-xl px-4 py-2 absolute -bottom-10"
        >
          View on Basescan
        </a>
      )}
    </div>
  );
}
