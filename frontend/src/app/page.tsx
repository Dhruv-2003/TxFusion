"use client";
import { UNISWAP_ROUTER_ABI, WETH_ABI } from "@/constants/abi";
import { useWaitForTransaction } from "@/hooks/useWaitForTransaction";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { parseAbi, parseEther } from "viem";
import {
  walletActionsEip3074,
  walletActionsEip5792,
  writeContracts,
} from "viem/experimental";
import { useAccount, useConnect, useSwitchChain, useWalletClient } from "wagmi";

const abi = parseAbi([
  "function approve(address, uint256) returns (bool)",
  "function transferFrom(address, address, uint256) returns (bool)",
]);

const batToken = "0x2C0891219AE6f6adC9BE178019957B4743e5e790";
const WETH = "0x4200000000000000000000000000000000000006";
const UNISWAP_ROUTER = "0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4";

export default function Home() {
  const [amountIn, setAmountIn] = useState("0.01");
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const { connectors, connect } = useConnect();
  const [transactionId, setTransactionId] = useState("");
  const { data: status } = useWaitForTransaction({ txId: transactionId });

  const { switchChain } = useSwitchChain();
  const handleBatch = useCallback(async () => {
    if (walletClient && address) {
      const deadline = Math.round(new Date().getTime() / 1000) + 86400;
      console.log("Executing Transactions");
      console.log(amountIn);
      try {
        const txId = await writeContracts(walletClient, {
          account: address,
          contracts: [
            {
              address: WETH,
              abi: WETH_ABI,
              functionName: "deposit",
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

        setTransactionId(txId);
      } catch (error) {
        console.log(error);
      }
    }
  }, [walletClient, address, amountIn]);

  useEffect(() => {
    switchChain({ chainId: 84532 });
  }, [address, switchChain]);

  const handleConnect = useCallback(() => {
    connect({ connector: connectors[0] });
  }, [connect, connectors]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>

        <br />
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <button
        onClick={handleConnect}
        type="button"
        className="bg-zinc-800 text-green-400 py-2 rounded-md shadow-2xl"
      >
        {address ? (
          <a>
            {address}
            <button
              type="button"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => connectors[0].disconnect()}
              className="rounded-md bg-zinc-800 text-xl px-8 py-2 shadow-2xl text-green-400"
            >
              Disconnect
            </button>
          </a>
        ) : (
          connectors[0].name
        )}
      </button>
      <button
        type="button"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={handleBatch}
        className="rounded-md bg-zinc-800 text-xl px-8 py-2 shadow-2xl text-green-400"
      >
        Send
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

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
