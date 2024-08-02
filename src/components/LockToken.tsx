"use client";
import { networks } from "@/contracts/index";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useEthersSigner } from "@/hooks/useEtherSigner";
import { useAccount } from "wagmi";
import { intToBig } from "@/utils/math.utils";
import { tokenAbi } from "@/contracts/abis/token.abi";
import { ethers } from "ethers";
import { lockAbi } from "@/contracts/abis/lock.abi";

const LockToken = () => {
  const { isConnected } = useAccount();
  const [load, setLoad] = useState(false)
  const signer = useEthersSigner();
  let token = "0xD6cE8678FCF5AFa86F0a5E883f4D431F571Db62B"
  let _withdrawalAddress = "0x1c7257BcBB8fB6866ADA1fDFA7A0e367ca504554"
  let totalAmount = intToBig(300, 18)
  let _unlockTime = 1722363888
  let _mintNFT = false
  let referr = "0x0000000000000000000000000000000000000000"

  const lock = async () => {
    setLoad(true);
    if (!isConnected) {
      toast.error("Please connect the wallet first!");
    }

    if (signer) {
      try {
        const tokenInstance = new ethers.Contract(token, tokenAbi, await signer);
        const _tx = await tokenInstance.approve(networks.Binance.lockToken, totalAmount)
        await _tx.wait()
        const lockInstance = new ethers.Contract(networks.Binance.lockToken, lockAbi, await signer);
        const fee = await lockInstance.getFeesInETH(token)
        const tx = await lockInstance.lockToken(token, _withdrawalAddress, totalAmount, _unlockTime, _mintNFT, referr, {
          value: fee
        });
        const receipt = await tx.wait();
        toast.success("Transaction completed successfully!", console.log(receipt));
        setLoad(false);
      } catch (error: any) {
        toast.error(error.reason);
        setLoad(false);
      }
    }
  };

  return (
    <div>
      <button onClick={() => lock()}>Lock Tokens</button>
    </div>
  );
}

export default LockToken


