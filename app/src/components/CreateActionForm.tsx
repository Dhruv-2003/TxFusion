"use client";
import React, { useEffect, useState } from "react";
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

export interface funcType {
  name: string;
  type: string;
  inputs: any[];
  outputs: any[];
  stateMutability: string;
}

export interface fieldType {
  address: `0x${string}`;
  abi: funcType[];
  selectedFunction: string;
  amount: string;
}

export default function CreateActionForm() {
  const [chain, setChain] = useState<string>("");
  const [protocol, setProtocol] = useState<string>("");
  const [fields, setFields] = useState<fieldType[]>([
    { address: "0x", abi: [], selectedFunction: "", amount: "" },
  ]);

  const handleChainChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChain(event.target.value);
  };

  const handleProtocolChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProtocol(event.target.value);
  };

  const handleInputChange = (
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
      // console.log(event.target.value);
      values[index].abi = event.target.value;
    } else if (event.target.name === "function") {
      values[index].selectedFunction = event.target.value;
    } else if (event.target.name === "amount") {
      values[index].amount = event.target.value;
    }
    setFields(values);
  };

  const handleAddFields = () => {
    setFields([
      ...fields,
      { address: "0x", abi: [], selectedFunction: "", amount: "" },
    ]);
  };

  // console.log(fields);

  const handleSubmit = () => {};

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
              <option value="baseSepolia">Base Sepolia</option>
              <option value="baseSepolia">Base</option>
              <option value="baseSepolia">Gnosis</option>
              <option value="baseSepolia">Gnosis Chiado</option>
              <option value="baseSepolia">Arbitrum</option>
              <option value="baseSepolia">Arbitrum Sepolia</option>
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
                    value={field.abi}
                  />
                </div>
                <div className="space-y-1">
                  <span>Function</span>
                  <select
                    name="function"
                    className="bg-[#F4F7F5] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
                    onChange={(event) => handleInputChange(index, event)}
                    value={field.selectedFunction}
                  >
                    <option value="">Select a function</option>
                    <option value="mint">mint</option>
                    <option value="burn">burn</option>
                    <option value="safeTransfer">safeTransfer</option>
                  </select>
                  {/* {field.abi.length &&
                      field.abi
                        .filter(
                          (func) =>
                            func.type == "function" &&
                            func.stateMutability != "read"
                        )
                        .map((func, id) => (
                          <option value={func.name}>{func.name}</option>
                        ))} */}
                </div>
                <div className="space-y-1">
                  <span>Arguements ( in [ ] )</span>
                  <input
                    placeholder="Enter amount"
                    name="amount"
                    className="bg-[#F4F7F5] w-full px-3 py-2 rounded-md text-[#1a1b25] outline-none ring-0"
                    onChange={(event) => handleInputChange(index, event)}
                    value={field.amount}
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
