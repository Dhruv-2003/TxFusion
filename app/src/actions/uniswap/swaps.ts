/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
import { encodePacked, parseEther } from "viem";
import { UNISWAP_ROUTER_ABI } from "@/constants/abi";
const UNISWAP_ROUTER: `0x${string}` =
  "0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4";
const poolFee = 3000;

export const exactInputSingle = (
  tokenIn: `0x${string}`,
  tokenOut: `0x${string}`,
  recipient: `0x${string}`,
  deadline: number,
  amountIn: string
) => ({
  address: UNISWAP_ROUTER,
  abi: UNISWAP_ROUTER_ABI,
  functionName: "exactInputSingle",
  args: [
    {
      tokenIn: tokenIn,
      tokenOut: tokenOut,
      fee: 3000,
      recipient: recipient,
      deadline: deadline,
      amountIn: parseEther(amountIn),
      amountOutMinimum: BigInt(0),
      sqrtPriceLimitX96: BigInt(0),
    },
  ],
});

export const exactInputMultihop = (
  tokenIn: string,
  intermediateToken: string,
  tokenOut: string,
  recipient: string,
  deadline: number,
  amountIn: string
) => ({
  address: UNISWAP_ROUTER,
  abi: UNISWAP_ROUTER_ABI,
  functionName: "exactInput",
  args: [
    {
      // TOD0: it is originally => path: abi.encodePacked(DAI, poolFee, USDC, poolFee, WETH9), fix accordingly
      path: encodePacked(
        ["address", "uint", "address", "uint", "address"],
        [
          tokenIn as `0x${string}`,
          BigInt(poolFee),
          intermediateToken as `0x${string}`,
          BigInt(poolFee),
          tokenOut as `0x${string}`,
        ]
      ),
      recipient: recipient,
      deadline: deadline,
      amountIn: parseEther(amountIn),
      amountOutMinimum: BigInt(0),
    },
  ],
});
