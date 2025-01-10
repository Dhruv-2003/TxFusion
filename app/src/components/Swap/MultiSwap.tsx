import { type ChangeEvent, useCallback, useState } from "react";
import { parseEther } from "viem";
import { useSendCalls } from "wagmi/experimental";
import { useAccount, useWalletClient } from "wagmi";

import { UNISWAP_ROUTER_ABI, WETH_ABI } from "@/constants/abi";
import { useWaitForTransaction } from "../../hooks/useWaitForTransaction";
import { toast } from "sonner";

const batToken = "0x2C0891219AE6f6adC9BE178019957B4743e5e790";
const WETH = "0x4200000000000000000000000000000000000006";
const UNISWAP_ROUTER = "0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4";

export function MultiSwap() {
  const [amountIn, setAmountIn] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { data: walletClient } = useWalletClient();
  const { sendCallsAsync } = useSendCalls();
  const { address } = useAccount();
  const { data: status } = useWaitForTransaction({ txId: transactionId });
  const steps = [
    "Deposit ETH to WETH contract",
    "Approve WETH to UNISWAP Router",
    "Swap WETH for BAT token on UNISWAP",
    "Approve BAT to UNISWAP Router",
    "Swap BAT token to WETH on UNISWAP",
  ];

  const handleSupply = useCallback(async () => {
    if (walletClient && address) {
      const deadline = Math.round(new Date().getTime() / 1000) + 86400;
      console.log("Executing Transactions");
      try {
        toast.loading("Executing Transaction ...");
        const txId = await sendCallsAsync({
          account: address,
          calls: [
            {
              address: WETH,
              abi: WETH_ABI,
              functionName: "deposit",
              args: [],
              value: parseEther(amountIn),
            },
            {
              address: WETH,
              abi: WETH_ABI,
              functionName: "approve",
              args: [UNISWAP_ROUTER, parseEther(amountIn)],
            },
            {
              address: UNISWAP_ROUTER,
              abi: UNISWAP_ROUTER_ABI,
              functionName: "exactInputSingle",
              args: [
                {
                  tokenIn: WETH,
                  tokenOut: batToken,
                  fee: 3000,
                  recipient: address,
                  deadline: deadline,
                  amountIn: parseEther(amountIn),
                  amountOutMinimum: BigInt(0),
                  sqrtPriceLimitX96: BigInt(0),
                },
              ],
            },
            {
              address: batToken,
              abi: WETH_ABI,
              functionName: "approve",
              args: [UNISWAP_ROUTER, parseEther("0.00001")],
            },
            {
              address: UNISWAP_ROUTER,
              abi: UNISWAP_ROUTER_ABI,
              functionName: "exactInputSingle",
              args: [
                {
                  tokenIn: batToken,
                  tokenOut: batToken,
                  fee: 3000,
                  recipient: address,
                  deadline: deadline,
                  amountIn: parseEther("0.00001"),
                  amountOutMinimum: BigInt(0),
                  sqrtPriceLimitX96: BigInt(0),
                },
              ],
            },
          ],
        });
        toast.dismiss();
        toast.success("Transaction Executed successfully ..");
        setTransactionId(txId);
      } catch (error) {
        toast.dismiss();
        console.log(error);
      }
    }
  }, [walletClient, address, amountIn]);

  return (
    <div className="bg-[#1a1b2516] h-full text-black rounded-lg shadow-xl py-8 px-8 space-y-5 w-full flex-col justify-between items-end">
      <div className=" text-2xl font-semibold">
        Swap Native Assets to Multiple Tokens on Uniswap
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
            <option value="USDC">Base Alice token</option>
            <option value="wEth">wETH</option>
          </select>
        </div>
        <div className=" space-y-1">
          <span>Chain</span>
          <select className="bg-[#F4F7F5] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer">
            <option selected>Select a chain</option>
            <option value="baseSepolia">Base Sepolia</option>
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
        className="relative inline-flex items-center justify-center p-4 px-6 py-2.5 overflow-hidden transition duration-300 ease-out border border-black rounded-md shadow-md group w-full active:scale-95"
      >
        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="white"
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
        <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">
          Execute
        </span>
        <span className="relative invisible">Execute</span>
      </button>
      <div className="flex-col justify-center items-center mt-10">
        {status?.receipts?.[0]?.transactionHash && (
          <a
            href={`https://sepolia.basescan.org/tx/${status.receipts?.[0].transactionHash}`}
            target="_blank"
            rel="noreferrer"
            className="flex-mx-auto justify-center bg-[#F4F7F5] text-[#1a1b25] rounded-md text-xl px-4 py-2"
          >
            View on Basescan
          </a>
        )}
      </div>
    </div>
  );
}
