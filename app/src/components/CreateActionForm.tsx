"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";

export default function CreateActionForm() {
  const [chain, setChain] = useState<string>("");
  const [protocol, setProtocol] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [abi, setAbi] = useState<string>("");
  const [selectedFunction, setSelectedFunction] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleChainChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChain(event.target.value);
  };

  const handleProtocolChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProtocol(event.target.value);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleAbiChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAbi(event.target.value);
  };

  const handleFunctionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedFunction(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleSubmit = () => {};

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="px-4 rounded-md py-2 border border-green-500 text-green-600 cursor-pointer">
          Create Action
        </div>
      </SheetTrigger>
      <SheetContent
        style={{ backgroundColor: "white" }}
        className=" min-w-[60%] border-l-0 "
      >
        <SheetHeader>
          <SheetTitle style={{ color: "black" }} className=" text-black">
            Create a new action
          </SheetTitle>
        </SheetHeader>
        <div className="py-10 space-y-6">
          <div className=" space-y-1 ">
            <span>Chain</span>
            <select
              className="bg-[#F4F7F5] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
              onChange={handleChainChange}
              value={chain}
            >
              <option value="">Select a chain</option>
              <option value="baseSepolia">Base Sepolia</option>
            </select>
          </div>
          <div className=" space-y-1 ">
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
          <div className=" space-y-1 ">
            <span>Address</span>
            <input
              placeholder="Enter address"
              className=" bg-[#F4F7F5] w-full px-3 py-2 rounded-md text-[#1a1b25] outline-none ring-0"
              onChange={handleAddressChange}
              value={address}
            />
          </div>
          <div className=" space-y-1 ">
            <span>ABI</span>
            <textarea
              rows={6}
              placeholder="Enter abi"
              className=" bg-[#F4F7F5] w-full px-3 py-2 rounded-md text-[#1a1b25] outline-none ring-0"
              onChange={handleAbiChange}
              value={abi}
            />
          </div>
          <div className=" space-y-1 ">
            <span>Function</span>
            <select
              className="bg-[#F4F7F5] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
              onChange={handleFunctionChange}
              value={selectedFunction}
            >
              <option value="">Select a function</option>
              <option value="baseSepolia">Base Sepolia</option>
            </select>
          </div>
          <div className=" space-y-1 ">
            <span>Amount</span>
            <input
              placeholder="Enter amount"
              className=" bg-[#F4F7F5] w-full px-3 py-2 rounded-md text-[#1a1b25] outline-none ring-0"
              onChange={handleAmountChange}
              value={amount}
            />
          </div>
          <Button
            onClick={handleSubmit}
            variant={"outline"}
            className="text-white w-full"
          >
            Create Action
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
