# TxFusion

TxFusion is a platform designed to simplify and enhance the user experience in managing multiple DeFi transactions. By leveraging the new EIP5792 standard, TxFusion introduces a new wallet method called `wallet_sendCalls`, enabling users to execute batch transactions with a single call and signature.

![Screenshot 2024-04-26 at 1 02 04 PM](https://github.com/Dhruv-2003/ScalingEthereum24/assets/76868364/30e3cf7c-b365-4dcf-af48-49ff51a67199)

## Existing Problem

DeFi users often face challenges in managing numerous transactions across various protocols like Uniswap, Compound, and Aave. This process can be time-consuming, cumbersome, and costly in terms of gas fees.

## Solution

TxFusion addresses this challenge by providing a unified platform that simplifies the execution of multiple DeFi transactions, thereby enhancing user experience and reducing gas fees.

## How It Works

1. **Account Recognition**: TxFusion batches multiple transactions into an array of contract calls to either an External Owned Account (EOA) or Smart Contract Wallet (SCW) and then sends them using wallet_sendCalls() to the respective wallet.

2. **Signature Generation**:

   - For EOAs: TxFusion utilizes EIP3074 for signature generation, which allows the execution of batch transactions.
   - For SCWs: TxFusion generates a batched transaction for user operations, which must be signed by the user in accordance with EIP4337.

3. **Execution**: Signed transactions are executed via Invoker for EOAs or via a Bundler for SCWs, ensuring swift and secure transaction processing.

## How it's Made

- TxFusion utilizes the new EIP5794 standard, which introduces methods for a wallet to accept and process batch transactions.
- Currently, only a few wallets support the `wallet_sendCalls` method, including the Coinbase Smart Contract Wallet SDK, which is implemented in this application.
- Viem/experimental provides methods for EIP5792, which TxFusion uses to add the functionality to send calls and track the status of transactions.
- The frontend of TxFusion is built using Next.js, with TypeScript.
- TailwindCSS and ShadCN UI are used for designing the frontend.

## Credits 

The idea originated from this [tweet](https://twitter.com/_jxom/status/1781076989346242883) by [_jxom](https://twitter.com/_jxom) and we took reference from this [GitHub repository](https://github.com/lukasrosario/eip-5792-demo) by [Lukas](https://twitter.com/0xlsr)

## Links
- Transaction Link:  https://sepolia.basescan.org/tx/0x3c7bad0c568a3ab858be4a4377404cdd4060a4ff8aabe986c4a9b801f0fb002f
- [Presentation](https://www.canva.com/design/DAGDbgk2O6k/XdHMz7E3pUGqdxptXQoDZQ/edit?utm_content=DAGDbgk2O6k&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## Contributors

- [Dhruv Agarwal](https://bento.me/0xdhruv)
- [Archit Sharma](https://bento.me/archit-sh)
- [Kushagra Sarathe](https://bento.me/kushagrasarathe)
