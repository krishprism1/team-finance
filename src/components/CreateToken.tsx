"use client";
import { networks } from "@/contracts/index";
import React, { useState } from "react";
import { abi } from "@/contracts/abis/tokenFactory.abi";
import { toast } from "react-toastify";
import { useEthersSigner } from "@/hooks/useEtherSigner";
import { ethers } from "ethers";
import { useAccount, useDisconnect } from "wagmi";
import { intToBig } from "@/utils/math.utils";

const CreateToken = () => {
  const {disconnect} = useDisconnect();
  const { address,isConnected } = useAccount();
  const [load, setLoad] = useState(false)
  const signer = useEthersSigner();
  const [section, setSection] = useState('');
  const [tokenDetail, setTokenDetail] = useState({
    name: "",
    symbol: "",
    supply: "",
    decimal: '',
    description: "",
    website: '',
    twitter: '',
    telegram: '',
    mintable: false,
    burnable: false
  })
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
        const tx = await contract.createToken(tokenDetail.name, tokenDetail.symbol, tokenDetail.supply, tokenDetail.mintable, tokenDetail.burnable);
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

  const nextTab = (text: string) => {
    setSection(text);
  }
  const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    setTokenDetail((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  return (
    // <div>
    //   <button onClick={() => creatToken()}>Create Token</button>
    // </div>
    <>
      <div className="containter">
        <button className={"continueButton"} onClick={() => { nextTab('tokenInformation') }}>Continue</button>
        <div className={"formSection"}>
          <div className={"formGroup"}>
            <label className="label">Select blockchain</label>
            <select>
              <option value={97}>BSC Testnet</option>
            </select>
          </div>

        </div>

        <div className={"card"}>
          {section === 'tokenInformation' && (
            <>  <div className="header" onClick={() => console.log("click")}>
              <h2>Enter token info</h2>
            </div>

              <div className={"formSection"}>
                <div className={"formGroup"}>
                  <label className="label">Token name</label>
                  <input className="input" type="text" name="name" value={tokenDetail.name} placeholder="e.g. 'Team Finance'" onChange={(e) => handleChange(e)} />
                </div>
                <div className={"formGroup"}>
                  <label className="label">Symbol</label>
                  <input className="input" type="text" name="symbol" value={tokenDetail.symbol} placeholder="e.g. 'TFC'" onChange={(e) => handleChange(e)} />
                </div>
                <div className={"formGroup"}>
                  <label className="label">Decimals</label>
                  <input className="input" type="text" name="decimal" value={tokenDetail.decimal} placeholder="8-18" onChange={(e) => handleChange(e)} />
                </div>
                <div className={"formGroup"}>
                  <label className="label">Initial supply</label>
                  <input className="input" type="number" name="supply" value={tokenDetail.supply} placeholder="e.g. '10 000'" onChange={(e) => handleChange(e)} />
                </div>
              </div>
              <button className={"continueButton"} onClick={() => nextTab('addFeature')}>Continue</button>
            </>
          )}
        </div>
        {section === 'addFeature' && <>
          <div className="card" onClick={() => console.log("sd")}>
            <div className={"header"}>
              <span>Add features</span>
            </div>

            <div className={"content"}>
              <div className={"formGroup"}>
                <label className={"checkboxLabel"}>
                  <input className="checkbox" type="checkbox" />
                  mint feature
                </label>
              </div>
              <div className={"formGroup"}>
                <label className="checkboxLabel">
                  <input className="checkbox" type="checkbox" />
                  burn function
                </label>
              </div>
            </div>
          </div>

          <button className={"continueButton"} onClick={() => creatToken()}>Continue</button>
        </>
        }
      </div>
    </>
  );
};

export default CreateToken;
