"use client";
import React, { useState } from "react";

interface Props {
  title: string;
  steps: string[];
}

export default function BatchCard({ title, steps }: Props) {
  const [amount, setAmount] = useState<number>(0);

  return (
    <div className="bg-[#1a1b25] text-white rounded-lg shadow-xl py-8 px-8 space-y-5 w-full">
      <div className=" text-2xl font-semibold">{title}</div>
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
            <option selected>Choose a token</option>
            <option value="USDC">USDC</option>
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
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Enter amount"
            className=" bg-[#F4F7F5] w-full px-3 py-2 rounded-md text-[#1a1b25] outline-none ring-0"
          />
        </div>
      </div>

      <button className="relative inline-flex items-center justify-center p-4 px-6 py-2.5 overflow-hidden transition duration-300 ease-out border border-green-400 rounded-md shadow-md group w-full active:scale-95">
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
    </div>
  );
}
