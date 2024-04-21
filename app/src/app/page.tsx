"use client";

import BatchCard from "@/components/BatchCard";

export default function page() {
  return (
    <div className="flex relative flex-col min-h-[90vh] w-full items-center justify-center max-w-7xl mx-auto">
      {/* <span className="absolute top-8 left-12 text-green-400 text-3xl">
        Multi batch
      </span> */}

      <BatchCard
        title="Lorem duiasdn ui mn"
        steps={[
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        ]}
      />

      {/* <Supply /> */}
    </div>
  );
}
