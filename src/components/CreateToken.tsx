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
        <h2 className="headings">Connect wallet</h2>
        <p>Make sure to connect the wallet that you would like to add your new tokens to.</p>
        <div className={"walletInfo"}>
          <div className={"walletDetails"}>
            <img src="/download.png" alt="Metamask Logo" className="walletLogo" />
            <span>0.1239 tBNB</span>
            <span>{address ? address :'0xC7dF...32D1'}</span>
          </div>
          <button className={"disconnectButton"} onClick={()=>disconnect()}>{isConnected ? 'Disconnect':'Disconnected'}</button>
        </div>
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
              <p>Please provide the following information:</p>
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
                  <label className="label">Token image</label>
                  <div className={"fileInput"}>
                    <input className="input" type="file" accept="image/jpeg,image/png" />
                    <span>.jpeg, .jpg or .png (2MB max)</span>
                  </div>
                </div>
                <div className={"formGroup"}>
                  <label className="label">Decimals</label>
                  <input className="input" type="text" name="decimal" value={tokenDetail.decimal} placeholder="8-18" onChange={(e) => handleChange(e)} />
                </div>
                <div className={"formGroup"}>
                  <label className="label">Initial supply</label>
                  <input className="input" type="number" name="supply" value={tokenDetail.supply} placeholder="e.g. '10 000'" onChange={(e) => handleChange(e)} />
                </div>
                <div className={"formGroup"}>
                  <label className="label">Description</label>
                  <input className="input" type="text" name="description" value={tokenDetail.description} placeholder="e.g. 'A DeFi Yield Farming Token'" onChange={(e) => handleChange(e)} />
                </div>
                <div className={"formGroup"}>
                  <label className="label">Website (optional)</label>
                  <input className="input" type="text" name="website" value={tokenDetail.website} placeholder="e.g. 'https://www.team.finance/'" onChange={(e) => handleChange(e)} />
                </div>
                <div className={"formGroup"}>
                  <label className="label">Twitter (optional)</label>
                  <input className="input" type="text" name="twitter" value={tokenDetail.twitter} placeholder="e.g. 'https://twitter.com/teamfinance_'" onChange={(e) => handleChange(e)} />
                </div>
                <div className={"formGroup"}>
                  <label className="label">Telegram (optional)</label>
                  <input className="input" type="text" name="telegram" value={tokenDetail.telegram} placeholder="e.g. 'https://t.me/teamfinance_main'" onChange={(e) => handleChange(e)} />
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
                  Reflection
                  <span>Charge a fee for each transaction that takes place.</span>
                </label>
              </div>
              <div className={"formGroup"}>
                <label className={"checkboxLabel"}>
                  <input className="checkbox" type="checkbox" />
                  Mint Function
                  <span>Add the ability to mint additional tokens.</span>
                </label>
              </div>
              <div className={"formGroup"}>
                <label className="checkboxLabel">
                  <input className="checkbox" type="checkbox" />
                  Burn Function
                  <span>Add the ability to burn your tokens. This is great for creating deflation.</span>
                </label>
              </div>
            </div>
          </div>

          <button className={"continueButton"} onClick={() => creatToken()}>Continue</button>
        </>
        }
        <p className="agreementText">
          By creating token you agree to our <a href="#">Terms and Conditions</a>.
        </p>
        <p className="auditText">Triple-audited for security assurance.</p>

      </div>
    </>
  );
};

export default CreateToken;
