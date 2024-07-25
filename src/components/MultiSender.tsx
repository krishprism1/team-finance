"use client";
import { networks } from "@/contracts/index";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useEthersSigner } from "@/hooks/useEtherSigner";
import { useAccount } from "wagmi";
import {intToBig } from "@/utils/math.utils";
import { contractInstance } from "@/utils/web3.utils";
import { tokenAbi } from "@/contracts/abis/token.abi";
import { multiSenderAbi } from "@/contracts/abis/multisender.abi";

const MultiSender = () => {
    const { isConnected } = useAccount();
    const [load, setLoad] = useState(false)
    const signer = useEthersSigner();
    let token = "0xD6cE8678FCF5AFa86F0a5E883f4D431F571Db62B"
    let recipients = ["0x1c7257BcBB8fB6866ADA1fDFA7A0e367ca504554", "0x00180FF5CA3D34fcCA37c06e279d32005fbDBD51"]
    let amounts = [intToBig(100, 18), intToBig(200, 18)]
    let totalAmount = intToBig(300, 18)
  
    const multiTransfer = async () => {
      setLoad(true);
      if (!isConnected) {
        toast.error("Please connect the wallet first!");
      }
  
      if (signer) {
        try {
          const tokenInstance = contractInstance(token, tokenAbi, await signer);
          const _tx = await tokenInstance.approve(networks.Binance.multiSender, totalAmount)
          await _tx.wait()
          const multiSendInstance = contractInstance(networks.Binance.multiSender, multiSenderAbi, await signer);
          const tx = await multiSendInstance.multisend(token, recipients, amounts);
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
        <button onClick={() => multiTransfer()}>Send Tokens</button>
      </div>
    );
}

export default MultiSender


