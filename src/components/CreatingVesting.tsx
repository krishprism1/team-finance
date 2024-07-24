"use client";
import { networks } from "@/contracts/index";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useEthersSigner } from "@/hooks/useEtherSigner";
import { useAccount } from "wagmi";
import {intToBig } from "@/utils/math.utils";
import { vestingFactoryAbi } from "@/contracts/abis/vestingFactory.abi";
import { contractInstance } from "@/utils/web3.utils";
import { tokenAbi } from "@/contracts/abis/token.abi";

const CreatingVesting = () => {
    const { isConnected } = useAccount();
    const [load, setLoad] = useState(false)
    const signer = useEthersSigner();
  
    let token = "0xD6cE8678FCF5AFa86F0a5E883f4D431F571Db62B"
    let merkleRoot = "0xcee59b1f051c18fa9423528fb67cf285f86aa9fb34f0f38c766bda9a081403b3"
    let totalAmount = intToBig(1000, 18)
  
    const creatVesting = async () => {
      setLoad(true);
      if (!isConnected) {
        toast.error("Please connect the wallet first!");
      }
  
      if (signer) {
        try {
          const tokenInstance = contractInstance(token, tokenAbi, await signer);
          await tokenInstance.approve(networks.Binance.vestingFactory, intToBig(10000, 18))
          const vFactory = contractInstance(networks.Binance.vestingFactory, vestingFactoryAbi, await signer);
          const tx = await vFactory.createVesting(token, merkleRoot, totalAmount);
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
        <button onClick={() => creatVesting()}>Create Vesting</button>
      </div>
    );
}

export default CreatingVesting
