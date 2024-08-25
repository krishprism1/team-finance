"use client"
import ActionLayout from '@/containers/ActionLayout'
import React, { useEffect, useState } from 'react'
import "../../styles/mint.css"
import "../../styles/Mint-responsive.css"
import "../../styles/Staking.css"
import "../../styles/multisender.css"
import { useAccount } from 'wagmi'
import ConnectWallet from '@/components/common/createform/ConnectWallet'
import SelectNetwork from '@/components/common/createform/SelectNetwork'
import CreateProgress from '@/components/common/createform/CreateProgress'
import useFormStore from '@/store/stepStore'
import { isStepValid, TokenDetail, validateStep, ValidationErrors } from '@/utils/validation.utils'
import { useEthersSigner } from '@/hooks/useEtherSigner'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'
import { networks } from '@/contracts'
import { abi } from '@/contracts/abis/tokenFactory.abi'
import { intToBig } from '@/utils/math.utils'
import TokenList from '@/components/common/createform/TokenList'
import { getWalletTransaction } from '@/utils/moralis.utils'
import { tokenAbi } from '@/contracts/abis/token.abi'
import { lockAbi } from '@/contracts/abis/lock.abi'


interface TokenInfo {
    token: string;
    name: string;
    symbol: string;
    balance: number;
}

interface InputForm {
    amount: number;
    timestamp: number;
}

export default function Staking() {
    const { step, setStep } = useFormStore();
    const { isConnected, address } = useAccount();
    const [load, setLoad] = useState(false)
    const signer = useEthersSigner();
    const [selectedToken, setSelectedToken] = useState<TokenInfo>();
    const [tokenInfo, setTokenInfo] = useState<TokenInfo[]>([]);

    const [formInput, setFormInput] = useState<InputForm[]>([{ amount: 0, timestamp: 0 }]);


    const [errors, setErrors] = useState<ValidationErrors>({});

    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (step === 2) {
            const newErrors = validateStep(step, tokenDetail);
            setErrors(newErrors);
            if (isStepValid(newErrors)) {
                setStep(step + 1);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormInput((prev) => ({
            ...prev,
            [name]: name === "amount" ? parseFloat(value) : new Date(value).getTime()
        }));
    };

    const notify = (link: string, txhash: string) => {
        let url = `${link}/${txhash}`
        toast.success(
            <div>
                Transaction completed successfully!
                <a
                    href={url}
                    style={{ color: 'blue', textDecoration: 'underline' }}
                    target="_blank"
                >
                    View Transaction
                </a>
            </div>
        );
    };

    useEffect(() => {
        if (address) {
            getWalletTransaction(address, "45").then((res) => setTokenInfo(res));
        }
    }, [address, step]);

    const selectToken = async (item: any) => {
        setSelectedToken(item);
    };

    const lock = async () => {
        let _mintNFT = false
        let referr = "0x0000000000000000000000000000000000000000"
        setLoad(true);
        if (!isConnected) {
            toast.error("Please connect the wallet first!");
        }

        if (signer && selectedToken) {
            try {
                const tokenInstance = new ethers.Contract(selectedToken.token, tokenAbi, await signer);
                const _tx = await tokenInstance.approve(networks.Binance.lockToken, intToBig(formInput.amount, 18))
                await _tx.wait()
                const lockInstance = new ethers.Contract(networks.Binance.lockToken, lockAbi, await signer);
                const fee = await lockInstance.getFeesInETH(selectedToken.token)
                const tx = await lockInstance.lockToken(selectedToken.token, address, intToBig(formInput.amount, 18), intToBig(formInput.timestamp, 18), _mintNFT, referr, {
                    value: fee
                });
                const receipt = await tx.wait();
                notify(networks.Binance.url, receipt.transactionHash)
                setStep(5)
                setLoad(false);
            } catch (error: any) {
                toast.error(error.reason);
                setLoad(false);
            }
        }
    };

    return (
        <ActionLayout>
            <div className="creat-token-container">
                <CreateProgress title="Create staking pool" />
                <ConnectWallet />
                <div className="select-blockchain-box">
                    <SelectNetwork />
                    {
                        step < 2 && (
                            <div className="select-blockchain">
                                <div className='select-box1'>
                                    <div>
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></svg>
                                        <span>Enter token address</span>
                                    </div>
                                    <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" className='select-right-arrow' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor"></path></svg>
                                </div>
                            </div>
                        )
                    }
                    {step == 2 && (
                        <TokenList
                            selectedToken={selectedToken}
                            tokenInfo={tokenInfo}
                            handleChange={handleChange}
                            selectToken={selectToken}
                            setStep={setStep}
                        />
                    )}
                    {step > 2 && (
                        <div className="token-info-connected-small-box" onClick={() => setStep(3)}>
                            <div>
                                <img alt="Icon" loading="lazy" width="16" height="16" decoding="async" data-nimg="1" src="https://app.team.finance/_next/static/media/check-circle.e19b6900.svg" />
                                <p>Enter token info</p>
                            </div>
                            <div>
                                <p>TFC</p>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="ds-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                            </div>
                        </div>
                    )}

                    {step < 3 && (
                        <div className="select-blockchain">
                            <div className='select-box1'>
                                <div>
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19 15v-3h-2v3h-3v2h3v3h2v-3h3v-2h-.937zM4 7h11v2H4zm0 4h11v2H4zm0 4h8v2H4z"></path></svg>
                                    <span>Add recipient details</span>
                                </div>
                                <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" className='select-right-arrow' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor"></path></svg>
                            </div>
                        </div>
                    )}
                    {step == 3 && (
                       <div className="add-feature-container">
                       <h3>Add pool details</h3>
                       <p>Specify the duration, reward token, and reward amount for your staking pool. Once you create your pool you cannot modify or close it.</p>
           
                       <div className="ad-lock-box1 staking-input-box">
                           <span>Start date</span>
                           <div>
                               <input
                                   type="datetime-local"
                                   name="amount"
                                   className='input'
                                   placeholder=""
                                //    value={formInput.amount}
                                   onChange={handleChange}
                               />
                           </div>
                       </div>
           
                       <div className="ad-lock-box1 staking-input-box">
                           <span>
                           End date{" "}
                               <svg
                                   stroke="currentColor"
                                   fill="currentColor"
                                   stroke-width="0"
                                   viewBox="0 0 24 24"
                                   data-tooltip-id="tooltip-help-lock-period"
                                   height="1em"
                                   width="1em"
                                   xmlns="http://www.w3.org/2000/svg"
                               >
                                   <path d="M12 6a3.939 3.939 0 0 0-3.934 3.934h2C10.066 8.867 10.934 8 12 8s1.934.867 1.934 1.934c0 .598-.481 1.032-1.216 1.626a9.208 9.208 0 0 0-.691.599c-.998.997-1.027 2.056-1.027 2.174V15h2l-.001-.633c.001-.016.033-.386.441-.793.15-.15.339-.3.535-.458.779-.631 1.958-1.584 1.958-3.182A3.937 3.937 0 0 0 12 6zm-1 10h2v2h-2z"></path>
                                   <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                               </svg>
                           </span>
                           <div>
                               <input
                                   type="datetime-local"
                                   name="timestamp"
                                   className='input'
                                   placeholder="select date"
                                   value={formInput.timestamp ? new Date(formInput.timestamp).toISOString().slice(0, -1) : ""}
                                   onChange={handleChange}
                               />
                           </div>
                       </div>
                        <div className="toggle-middle-container">

                        <div className="toggle-button-box">
                            <input type="checkbox" id='check'/>
                            <label htmlFor="check" className='button'></label>
                        </div>

                        <span>Use a custom reward token <svg stroke="gray" fill="gray" stroke-width="0" viewBox="0 0 24 24" height="1.1em" width="1.1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path></svg></span>
                        </div>

                       <div className="ad-lock-box1 staking-input-box">
                           <span>Reward token address</span>
                           <div>
                               <input
                                   type="text"
                                   name="amount"
                                   className='input'
                                   placeholder="0x..."
                                //    value={formInput.amount}
                                   onChange={handleChange}
                                   required
                               />
                           </div>
                       </div>
                       <div className="ad-lock-box1 staking-input-box">
                           <span>Amount of reward tokens</span>
                           <div>
                               <input
                                   type="number"
                                   name="amount"
                                   className='input'
                                   placeholder="0"
                                //    value={formInput.amount}
                                   onChange={handleChange}
                                   required
                               />
                           </div>
                       </div>
                       
                       <div className="ad-lock-box5" onClick={() => setStep(4)}>
                           <button className="all-time-use-btn">Continue</button>
                       </div>
                   </div>
                    )}
                    {step > 3 && (
                        <div className="add-feature-connected-small-box" onClick={() => setStep(3)}>
                            <div>
                                <img alt="Icon" loading="lazy" width="16" height="16" decoding="async" data-nimg="1" src="https://app.team.finance/_next/static/media/check-circle.e19b6900.svg" />
                                <p>Add recipient details</p>
                            </div>
                            <div>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="ds-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                            </div>
                        </div>
                    )}

                    {step < 4 && (
                        <div className="select-blockchain">
                            <div className='select-box1'>
                                <div>
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
                                    <span>Create contract</span>
                                </div>
                                <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" className='select-right-arrow' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor"></path></svg>
                            </div>
                        </div>
                    )}
                    {step == 4 && (
                        <div className="create-contract-container">
                            <h3>Create contract</h3>
                            <p>We need your authorisation before using the token. This only needs to be done once.</p>

                            <div className="confirm-transtion-btn">
                                <button onClick={() => lock()}>{load ? "PROCESSING..." : "Give permission"}</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ActionLayout>
    )
}


