"use client";
import { networks } from "@/contracts/index";
import React, { useState } from "react";
import { abi } from "@/contracts/abis/tokenFactory.abi";
import { toast } from "react-toastify";
import { useEthersSigner } from "@/hooks/useEtherSigner";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import {intToBig } from "@/utils/math.utils";

const CreateToken = () => {
  const { isConnected } = useAccount();
  const [load, setLoad] = useState(false)
  const signer = useEthersSigner();

  let name = "Billu";
  let symbol = "BLU";
  let supply = intToBig(1000, 18)
  let mintable = false;
  let burnable = false;


  const creatToken = async () => {
    setLoad(true);
    if (!isConnected) {
      toast.error("Please connect the wallet first!");
    }

    if (signer) {
      try {
        const contract = new ethers.Contract(networks.Binance.tokenFactory, abi, await signer);
        const tx = await contract.createToken(name, symbol, supply, mintable, burnable);
        const receipt = await tx.wait();
        toast.success("Transaction completed successfully!");
        setLoad(false);
      } catch (error: any) {
        toast.error(error.reason);
        setLoad(false);
      } finally {

      }
    }
  };

  return (
    <div>
      <button onClick={() => creatToken()}>Create Token</button>
    </div>
  );
};

export default CreateToken;
