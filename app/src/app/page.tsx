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
    <div className="flex relative flex-col min-h-[90vh] w-full items-center justify-center max-w-7xl mx-auto">
      {/* <span className="absolute top-8 left-12 text-green-400 text-3xl">
        Multi batch
      </span> */}

      {/* <BatchCard
        steps={[
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        ]}
      /> */}
      <SingleSwap />
      <MultiSwap />
      <MultipHopSwap />
      <CompoundSupply />
      <Aave />
      {/* <Supply /> */}
    </div>
  );
}
