"use client";
import React from "react";
import { useCallback, useEffect } from "react";
import { useAccount, useConnect, useSwitchChain } from "wagmi";
import { truncateMiddle } from "../util/turncateMiddle";
import { Button } from "@/components/ui/button";
import CreateActionForm from "./CreateActionForm";

export default function Navbar() {
  const { address } = useAccount();
  const { connectors, connect } = useConnect();
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    switchChain({ chainId: 84532 });
  }, [address, switchChain]);

  const handleConnect = useCallback(() => {
    connect({ connector: connectors[0] });
  }, [connect, connectors]);

  return (
    <div className="pt-8 pb-4 flex items-center justify-between max-w-7xl mx-auto">
      <div className=" text-2xl font-semibold tracking-wide text-green-600">
        0xMBT
      </div>

      <div className=" flex gap-2 items-center">
        <CreateActionForm />
        <Button
          variant={"secondary"}
          onClick={handleConnect}
          type="button"
          className="text-green-600"
        >
          {address ? truncateMiddle(address, 6, 3) : connectors[0].name}
        </Button>
      </div>
    </div>
  );
}
