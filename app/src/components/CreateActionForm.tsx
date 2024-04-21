"use client";
import React, { useState } from "react";
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

export default function CreateActionForm() {
  const [chain, setChain] = useState<string>("");
  const [protocol, setProtocol] = useState<string>("");
  const [fields, setFields] = useState([
    { address: "", abi: "", selectedFunction: "", amount: "" },
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
      values[index].address = event.target.value;
    } else if (event.target.name === "abi") {
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
      { address: "", abi: "", selectedFunction: "", amount: "" },
    ]);
  };

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
                    <option value="baseSepolia">Base Sepolia</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <span>Amount</span>
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
