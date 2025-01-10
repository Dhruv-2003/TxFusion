"use client";
import React from "react";
import { useEffect } from "react";
import { useAccount, useSwitchChain } from "wagmi";

import { ConnectKitButton } from "connectkit";
import CreateActionForm from "./CreateActionForm";

export default function Navbar() {
  const { address } = useAccount();

  const { switchChain } = useSwitchChain();

  useEffect(() => {
    switchChain({ chainId: 84532 });
  }, [address, switchChain]);

  return (
    <div className="pt-8 pb-4 flex items-center justify-between max-w-7xl mx-auto">
      <div className=" text-2xl font-semibold tracking-wide text-green-600">
        TxFusion
      </div>

      <div className=" flex gap-2 items-center">
        <CreateActionForm />
        <ConnectKitButton />
      </div>
    </div>
  );
}
