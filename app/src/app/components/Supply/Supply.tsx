import { type ChangeEvent, useCallback, useState } from "react";
import { erc20Abi, parseAbi, parseEther, parseUnits } from "viem";
import { writeContracts } from "viem/experimental";
import { useAccount, useWalletClient } from "wagmi";
import { cometAbi } from "@/app/abi/cometAbi";
import { useWaitForTransaction } from "./hooks/useWaitForTransaction";
import { UNISWAP_ROUTER_ABI, WETH_ABI } from "@/app/constants/abi";

const comet = "0x571621Ce60Cebb0c1D442B5afb38B1663C6Bf017";
const usdc = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";

// const abi = parseAbi([
//   "function approve(address, uint256) returns (bool)",
//   "function transfer(address, address, uint256) returns (bool)",
// ]);

const batToken = "0x2C0891219AE6f6adC9BE178019957B4743e5e790";
const WETH = "0x4200000000000000000000000000000000000006";
const UNISWAP_ROUTER = "0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4";

export function Supply() {
  const [amountIn, setAmountIn] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const { data: status } = useWaitForTransaction({ txId: transactionId });

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
          ],
        });

        // {
        //     address: UNISWAP_ROUTER,
        //     abi: UNISWAP_ROUTER_ABI,
        //     functionName: "exactInputSingle",
        //     args: [
        //       {
        //         tokenIn: WETH,
        //         tokenOut: batToken,
        //         fee: 3000,
        //         recipient: address,
        //         deadline: deadline,
        //         amountIn: parseEther(amountIn),
        //         amountOutMinimum: BigInt(0),
        //         sqrtPriceLimitX96: BigInt(0),
        //       },
        //     ],
        //   },
        setTransactionId(txId);
      } catch (error) {
        console.log(error);
      }
    }
  }, [walletClient, address, amountIn]);

  return (
    <div className="flex flex-col w-full justify-center items-center space-y-10 h-96 relative">
      <div className="w-96 h-32 rounded-md shadow-2xl relative bg-zinc-800 flex flex-row justify-between items-center px-4">
        <input
          value={amountIn}
          onChange={handleChangeAmount}
          placeholder="0.00"
          className="bg-transparent border-none h-full w-full flex items-center justify-center text-green-400 px-2 text-4xl"
        />
        <span className="text-5xl text-green-400 cursor-default inline-block bg-clip-text">
          USDC
        </span>
      </div>
      <button
        type="button"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={handleSupply}
        className="rounded-md bg-zinc-800 text-xl px-8 py-2 shadow-2xl text-green-400"
      >
        Supply
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
