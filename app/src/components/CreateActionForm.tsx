"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useAccount, useChainId, useSwitchChain, useWalletClient } from "wagmi";
import { useWaitForTransaction } from "@/hooks/useWaitForTransaction";
import { writeContracts } from "viem/experimental";
import { Abi, ContractFunctionParameters } from "viem";

export interface funcType {
  constant?: boolean;
  name: string;
  type: string;
  inputs: any[];
  outputs: any[];
  stateMutability: string;
}

export interface fieldType {
  address: `0x${string}`;
  abi: funcType[];
  selectedFunction: funcType | undefined;
  arguements: string;
}

export interface ContractCallType {}

export default function CreateActionForm() {
  const [transactionId, setTransactionId] = useState("");
  const { data: walletClient } = useWalletClient();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const { address } = useAccount();
  const { data: status } = useWaitForTransaction({ txId: transactionId });

  const [chain, setChain] = useState<string>("");
  const [protocol, setProtocol] = useState<string>("");
  const [fields, setFields] = useState<fieldType[]>([
    { address: "0x", abi: [], selectedFunction: undefined, arguements: "" },
  ]);

  const handleChainChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChain(event.target.value);
  };

  const handleProtocolChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProtocol(event.target.value);
  };

  const handleInputChange = async (
    index: number,
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const values = [...fields];
    if (event.target.name === "address") {
      values[index].address = event.target.value as `0x${string}`;
    } else if (event.target.name === "abi") {
      // @ts-ignore
      if (event.target.value) {
        values[index].abi = await JSON.parse(event.target.value);
      } else {
        values[index].abi = [];
      }
    } else if (event.target.name === "function") {
      values[index].selectedFunction = await JSON.parse(event.target.value);
    } else if (event.target.name === "arguements") {
      values[index].arguements = event.target.value;
    }
    setFields(values);
  };

  const handleAddFields = () => {
    setFields([
      ...fields,
      { address: "0x", abi: [], selectedFunction: undefined, arguements: "" },
    ]);
  };

  const handleSubmit = async () => {
    if (walletClient && address) {
      console.log("Executing Transactions");

      if (chainId != Number(chain)) {
        console.log("Switch chain to the required one");
        // await switchChain({ chainId: Number(chain) });
      }

      const contractCalls = await buildContractCall();
      if (!contractCalls) {
        console.log("Contract Calls not found");
        return;
      }
      console.log(contractCalls);
      try {
        const txId = await writeContracts(walletClient, {
          account: address,
          contracts: contractCalls,
        });
        setTransactionId(txId);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const buildContractCall = async (): Promise<
    ContractFunctionParameters[] | undefined
  > => {
    try {
      const contractCalls: ContractFunctionParameters[] = [];
      console.log(fields);

      fields.forEach((field) => {
        if (!field.selectedFunction) {
          return;
        }
        const call: ContractFunctionParameters = {
          address: field.address,
          abi: field.abi as Abi,
          functionName: field.selectedFunction?.name,
          args: field.arguements.split(","),
        };

        contractCalls.push(call);
      });

      return contractCalls;
    } catch (error) {
      console.log(error);
    }
  };
  console.log(fields);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="px-4 rounded-md py-2 border border-green-500 text-green-600 cursor-pointer">
          Create Action
        </div>
      </DialogTrigger>
      <DialogContent
        style={{ backgroundColor: "white" }}
        className=" max-h-[800px] overflow-auto min-w-[800px]"
      >
        <DialogHeader>
          <DialogTitle>Create new action</DialogTitle>
        </DialogHeader>
        <div className="py-10 space-y-6">
          <div className="space-y-1">
            <span>Chain</span>
            <select
              className="bg-[#F4F7F5] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
              onChange={handleChainChange}
              value={chain}
            >
              <option value="">Select a chain</option>
              <option value="84532">Base Sepolia</option>
              <option value="8453">Base</option>
              <option value="100">Gnosis</option>
              <option value="10200">Gnosis Chiado</option>
              <option value="42161">Arbitrum</option>
              <option value="421614">Arbitrum Sepolia</option>
            </select>
          </div>
          <div className="space-y-1">
            <span>Select Protocol</span>
            <select
              className="bg-[#F4F7F5] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
              onChange={handleProtocolChange}
              value={protocol}
            >
              <option value="">Select a protocol</option>
              <option value="uniswap">Uniswap</option>
              <option value="compund">Compound</option>
              <option value="aave">Aave</option>
              <option value="others">Other</option>
            </select>
          </div>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={index} className="space-y-4">
                <div className="space-y-1">
                  <span>Address</span>
                  <input
                    placeholder="Enter address"
                    name="address"
                    className="bg-[#F4F7F5] w-full px-3 py-2 rounded-md text-[#1a1b25] outline-none ring-0"
                    onChange={(event) => handleInputChange(index, event)}
                    value={field.address}
                  />
                </div>
                <div className="space-y-1">
                  <span>ABI</span>
                  <textarea
                    rows={6}
                    placeholder="Enter abi"
                    name="abi"
                    className="bg-[#F4F7F5] w-full px-3 py-2 rounded-md text-[#1a1b25] outline-none ring-0"
                    onChange={(event) => handleInputChange(index, event)}
                    //@ts-ignore
                    // value={field.abi}
                  />
                </div>
                <div className="space-y-1">
                  <span>Function</span>
                  <select
                    name="function"
                    className="bg-[#F4F7F5] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
                    onChange={(event) => handleInputChange(index, event)}
                    // value={
                    //   field.selectedFunction ? field.selectedFunction.name : ""
                    // }
                  >
                    <option value="">Select a function</option>
                    {field.abi.length > 0 &&
                      field.abi
                        .filter((func) => {
                          const isValid =
                            func.type == "function" &&
                            (func.stateMutability == "nonpayable" ||
                              func.stateMutability == "payable");

                          return isValid;
                        })
                        .map((func, id) => (
                          <option key={func.name} value={JSON.stringify(func)}>
                            {func.name}
                          </option>
                        ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <span>
                    Arguements as [
                    {field.selectedFunction &&
                      field.selectedFunction.inputs
                        .map((input) => `${input.name} : ${input.type}`)
                        .join(", ")}
                    ] ( seperated by ',' )
                  </span>
                  <input
                    placeholder="Enter arguements"
                    name="arguements"
                    className="bg-[#F4F7F5] w-full px-3 py-2 rounded-md text-[#1a1b25] outline-none ring-0"
                    onChange={(event) => handleInputChange(index, event)}
                    value={field.arguements}
                  />
                </div>
                <Separator />
              </div>
            ))}
          </div>

          <button onClick={handleAddFields} className="text-black w-full ">
            + Add More Fields
          </button>
          <Button
            onClick={handleSubmit}
            variant={"outline"}
            className="text-white w-full"
          >
            Create Action
          </Button>
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
      </DialogContent>
    </Dialog>
  );
}
