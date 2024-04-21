import { type ChangeEvent, useCallback, useState } from 'react'
import { writeContracts } from 'viem/experimental'
import { useAccount, useWalletClient } from 'wagmi'

import { approveToken, deposit } from '@/actions/generic/generictx'
import { exactInputMultihop } from '@/actions/uniswap/swaps'
import { WETH_ABI } from '@/constants/abi'
import { useWaitForTransaction } from '../../hooks/useWaitForTransaction'

//these are mainnet addresses
const DAI = '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb'
const WETH = '0x4200000000000000000000000000000000000006'
const USDC = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
const UNISWAP_ROUTER = '0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4'

export function MultipHopSwap() {
  const [amountIn, setAmountIn] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const { data: walletClient } = useWalletClient()
  const { address } = useAccount()
  const { data: status } = useWaitForTransaction({ txId: transactionId })

  const handleChangeAmount = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAmountIn(e.target.value)
  }, [])

  const handleSupply = useCallback(async () => {
    if (walletClient && address) {
      const deadline = Math.round(new Date().getTime() / 1000) + 86400
      console.log('Executing Transactions')
      try {
        const txId = await writeContracts(walletClient, {
          account: address,
          contracts: [
            deposit(WETH, WETH_ABI, amountIn),
            approveToken(WETH, WETH_ABI, UNISWAP_ROUTER, amountIn),
            exactInputMultihop(DAI, USDC, WETH, address, deadline, amountIn),
          ],
        })

        setTransactionId(txId)
      } catch (error) {
        console.log(error)
      }
    }
  }, [walletClient, address, amountIn])

  return (
    <div className="flex flex-col w-full justify-center items-center space-y-10 h-96 relative">
      <div className="w-96 h-32 rounded-md shadow-2xl relative bg-zinc-800 flex flex-row justify-between items-center px-4">
        <input
          value={amountIn}
          onChange={handleChangeAmount}
          placeholder="0.00"
          className="bg-transparent border-none h-full w-full flex items-center justify-center text-green-400 px-2 text-4xl"
        />
        <span className="text-5xl text-green-400 cursor-default inline-block bg-clip-text">
          USDC
        </span>
      </div>
      <button
        type="button"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={handleSupply}
        className="rounded-md bg-zinc-800 text-xl px-8 py-2 shadow-2xl text-green-400"
      >
        Supply
      </button>
      {status?.receipts?.[0]?.transactionHash && (
        <a
          href={`https://sepolia.basescan.org/tx/${status.receipts?.[0].transactionHash}`}
          target="_blank"
          rel="noreferrer"
          className="bg-white text-zinc-800 rounded-md text-xl px-4 py-2 absolute -bottom-10"
        >
          View on Basescan
        </a>
      )}
    </div>
  )
}
