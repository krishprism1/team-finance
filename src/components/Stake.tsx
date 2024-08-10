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
import { stakeAbi } from "@/contracts/abis/stake.abi";

const Stake = () => {
  const { isConnected } = useAccount();
  const [load, setLoad] = useState(false)
  const signer = useEthersSigner();
  let token = "0xD6cE8678FCF5AFa86F0a5E883f4D431F571Db62B"
  let _pairToken = "0xD6cE8678FCF5AFa86F0a5E883f4D431F571Db62B"
  let _rate = 1723404835
  let _rateDecimal = 1725996835
  let _mainTokenFee = 18
  let _pairTokenFee = intToBig(50, 18)


  const addPool = async () => {
    setLoad(true);
    if (!isConnected) {
      toast.error("Please connect the wallet first!");
    }

    if (signer) {
      try {
        const tokenInstance = new ethers.Contract(token, tokenAbi, await signer);
        const _tx = await tokenInstance.approve(networks.Binance.stakeContract, _pairTokenFee)
        await _tx.wait()
        const stakeInstance = new ethers.Contract(networks.Binance.stakeContract, stakeAbi, await signer);
        // const fee = await stakeInstance.getFeesInETH(token)
        const tx = await stakeInstance.addPool(token, _pairToken, _rate, _rateDecimal, _mainTokenFee, _pairTokenFee);
        const receipt = await tx.wait();
        console.log(receipt)
        toast.success("Transaction completed successfully!");
        setLoad(false);
      } catch (error: any) {
        toast.error(error.reason);
        setLoad(false);
      }
    }
  };

  return (
    <div>
      <button onClick={() => addPool()}>{load ? "PROCESSING..." : "Stake"}</button>
    </div>
  );
}

export default Stake


