"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BatchCard from "@/components/BatchCard";
import { SingleSwap } from "@/components/Swap/SingleSwap";
import { MultiSwap } from "@/components/Swap/MultiSwap";
import { MultipHopSwap } from "@/components/Swap/MultiHopSwap";
import { CompoundSupply } from "@/components/CompoundSupply/Supply";
import { Aave } from "@/components/AaveLend/aave";

export default function page() {
  return (
    <div className="flex relative min-h-[90vh] py-6 w-full items-stretch justify-normal gap-6 flex-wrap max-w-7xl mx-auto">
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

      <div className=" flex items-stretch gap-6 w-full">
        {/* <div className=" w-6/12 space-y-6">
          <CompoundSupply />
          <MultiSwap />
        </div> */}
        {/* <div className=" w-6/12 space-y-6">
          <SingleSwap />
          <MultipHopSwap />
        </div> */}
      </div>

      {/* <Aave /> */}
      {/* <Supply /> */}
    </div>
  );
}
