import { type ChangeEvent, useCallback, useState } from "react";
import { useSendCalls } from "wagmi/experimental";
import { useAccount, useWalletClient } from "wagmi";
import { useWaitForTransaction } from "../../hooks/useWaitForTransaction";
import { ARBITRUM_NFT_ADDRESS, NFT_ABI } from "@/constants/nftABI";
import { toast } from "sonner";

export function Custom() {
  const [transactionId, setTransactionId] = useState("");
  const { data: walletClient } = useWalletClient();
  const { sendCallsAsync } = useSendCalls();
  const { address } = useAccount();
  const { data: status } = useWaitForTransaction({ txId: transactionId });

  const steps = [
    "Mint two NFTs",
    "Burn the First Minted NFT",
    "Transfer the Second Minted NFT to another address",
  ];

  const handleSupply = useCallback(async () => {
    if (walletClient && address) {
      console.log("Executing Transactions");
      try {
        toast.loading("Executing Transaction ...");
        const txId = await sendCallsAsync({
          account: address,
          calls: [
            {
              address: ARBITRUM_NFT_ADDRESS,
              abi: NFT_ABI,
              functionName: "safeMint",
              args: [address],
            },
            {
              address: ARBITRUM_NFT_ADDRESS,
              abi: NFT_ABI,
              functionName: "safeMint",
              args: [address],
            },
            {
              address: ARBITRUM_NFT_ADDRESS,
              abi: NFT_ABI,
              functionName: "burn",
              args: [BigInt(0)],
            },
            {
              address: ARBITRUM_NFT_ADDRESS,
              abi: NFT_ABI,
              functionName: "transferFrom",
              args: [
                address,
                "0x41D22F2e55BD7B6bbb16f82e852a58c36C5D5Cf8",
                BigInt(1),
              ],
            },
          ],
        });
        toast.dismiss();
        toast.success("Transaction Executed Successfully");

        setTransactionId(txId);
      } catch (error) {
        toast.dismiss();
        console.log(error);
      }
    }
  }, [walletClient, address]);

  return (
    <div className="bg-[#1a1b2516] h-full text-black rounded-lg shadow-xl py-8 px-8 space-y-5 w-full flex-col justify-between items-end">
      <div className=" text-2xl font-semibold">
        Interact with Custom contract
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
          <span>Chain</span>
          <select className="bg-[#F4F7F5] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer">
            <option selected>Select a chain</option>
            <option value="baseSepolia">Gnosis Chiado</option>
            <option value="baseSepolia">Arbitrum Sepolia</option>
          </select>
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
