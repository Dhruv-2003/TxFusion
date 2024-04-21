/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */

import { parseEther } from "viem";
import { AAVEPOOL_ABI } from "@/constants/aavepoolabi";

export const AavePoolAddress: `0x${string}` =
  "0x07eA79F68B2B3df564D0A34F8e19D9B1e339814b";

export const supplyCollateral = (
  asset: `0x${string}`,
  amount: string,
  onBehalfOf: `0x${string}`
) => ({
  address: AavePoolAddress,
  abi: AAVEPOOL_ABI,
  functionName: "supply",
  args: [
    {
      asset: asset,
      amount: parseEther(amount),
      onBehalfOf: onBehalfOf,
      referralCode: BigInt(0),
    },
  ],
});

// Stable: 1, Variable: 2
export const borrow = (
  asset: `0x${string}`,
  amount: string,
  onBehalfOf: `0x${string}`,
  interestRateMode: 1 | 2
) => {
  const amountNumeric = parseFloat(amount);
  const newAmount = amountNumeric - 5;

  return {
    address: AavePoolAddress,
    abi: AAVEPOOL_ABI,
    functionName: "borrow",
    args: [
      {
        asset: asset,
        amount: parseEther(newAmount.toString()),
        interestRateMode: BigInt(interestRateMode),
        onBehalfOf: onBehalfOf,
        referralCode: BigInt(0),
      },
    ],
  };
};
