/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
import { parseEther } from "viem";

export const approveToken = (
  address: `0x${string}`,
  abi: any,
  to: `0x${string}`,
  amountIn: string,
) => ({
  address: address,
  abi: abi,
  functionName: "approve",
  args: [to, parseEther(amountIn)],
});

export const deposit = (
  address: `0x${string}`,
  abi: any,
  amountIn: string,
) => ({
  address: address,
  abi: abi,
  functionName: "deposit",
  args: [],
  value: parseEther(amountIn),
});
