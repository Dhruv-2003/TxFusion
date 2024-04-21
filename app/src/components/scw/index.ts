import { createWalletClient, http } from "viem";
import { gnosisChiado, arbitrumSepolia, arbitrumNova } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { createSmartAccountClient } from "@biconomy/account";

const config = {
  privateKey: process.env.PRIVATE_KEY || "",
  bundlerUrl: `https://bundler.biconomy.io/api/v2/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
};

const account = privateKeyToAccount("0x" + config.privateKey);

const client = createWalletClient({
  chain: arbitrumSepolia,
  transport: http(),
});

export const sendTransaction = async () => {
  const smartWallet = await createSmartAccountClient({
    signer: client,
    bundlerUrl: config.bundlerUrl,
  });

  const saAddress = await smartWallet.getAccountAddress();
  console.log("SA Address", saAddress);

  const txs = [];

  const userOpResponse = await smartWallet.sendTransaction(txs);
  const { transactionHash } = await userOpResponse.waitForTxHash();
  console.log("Transaction Hash", transactionHash);
  const userOpReceipt = await userOpResponse.wait();
  if (userOpReceipt.success == "true") {
    console.log("UserOp receipt", userOpReceipt);
    console.log("Transaction receipt", userOpReceipt.receipt);
  }
};
