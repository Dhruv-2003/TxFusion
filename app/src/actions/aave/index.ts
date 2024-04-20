/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */

import { parseEther } from "viem";
import { AAVEPOOL_ABI } from "@/constants/aavepoolabi";

export const AavePoolAddress = '0x30770d7E3e71112d7A6b7259542D1f680a70e315';

export const supplyCollateral = (
  asset: `0x${string}`,
  amount: string,
  onBehalfOf: `0x${string}`,
) => ({
  address: AavePoolAddress,
  abi: AAVEPOOL_ABI,
  functionName: 'supply',
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
    interestRateMode: 1 | 2,
  ) => ({
    address: AavePoolAddress,
    abi: AAVEPOOL_ABI,
    functionName: 'borrow',
    args: [
      {
        asset: asset,
        amount: parseEther(amount),
        interestRateMode: BigInt(interestRateMode),
        onBehalfOf: onBehalfOf,
        referralCode: BigInt(0),
      },
    ],
  });