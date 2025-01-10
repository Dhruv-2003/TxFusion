"use client";

import { SingleSwap } from "@/components/Swap/SingleSwap";
import { MultiSwap } from "@/components/Swap/MultiSwap";
import { MultipHopSwap } from "@/components/Swap/MultiHopSwap";
import { CompoundSupply } from "@/components/CompoundSupply/Supply";
import { Aave } from "@/components/AaveLend/aave";
import { Custom } from "@/components/custom";

export default function page() {
  return (
    <div className="flex relative min-h-[90vh] py-6 w-full items-stretch justify-normal gap-6 flex-wrap max-w-7xl mx-auto">
      {/* Section to show a note regarding this using eip5792 underneath and currently being only working with coinbase smart wallet */}
      <div className="flex flex-col w-full gap-6">
        <p>
          This Dapp is a demo of the EIP-5792: Wallet Call API. It currently
          only works with the Coinbase Smart Wallet on base sepolia network.
        </p>
        <p>
          To read more about the EIP-5792, please visit{" "}
          <a
            target="_blank"
            className="text-blue-500"
            href="https://www.eip5792.xyz/introduction"
          >
            eip5792.xyz
          </a>
        </p>
      </div>
      <div className="flex items-stretch w-full gap-6">
        <SingleSwap />
        <MultipHopSwap />
      </div>
      <div className="flex items-stretch w-full gap-6">
        <Aave />
      </div>
      <div className="flex items-stretch w-full gap-6">
        <CompoundSupply />
        <MultiSwap />
      </div>
      <div className="flex items-stretch w-full gap-6">
        <Custom />
      </div>
      <p>
        Built by
        <a
          target="_blank"
          className="text-blue-500"
          href="https://twitter.com/0xdhruva"
        >
          @0xdhruva
        </a>
        ,
        <a
          target="_blank"
          className="text-blue-500"
          href="https://twitter.com/kushagrasarathe"
        >
          @kushagrasarathe
        </a>
        ,
        <a
          target="_blank"
          className="text-blue-500"
          href="https://twitter.com/archsh7"
        >
          @archsh7
        </a>
      </p>
    </div>
  );
}
