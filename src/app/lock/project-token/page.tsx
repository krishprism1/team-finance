"use client"
import ActionLayout from '@/containers/ActionLayout'
import React, { useEffect, useState } from 'react'
import "../../../styles/mint.css"
import "../../../styles/multisender.css"
import "../../../styles/TeamTokenLockResponsive.css"
import "../../../styles/Mint-responsive.css"
import { useAccount } from 'wagmi'
import ConnectWallet from '@/components/common/createform/ConnectWallet'
import SelectNetwork from '@/components/common/createform/SelectNetwork'
import CreateProgress from '@/components/common/createform/CreateProgress'
import useFormStore from '@/store/stepStore'
import { useEthersSigner } from '@/hooks/useEtherSigner'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'
import { networks } from '@/contracts'
import { intToBig } from '@/utils/math.utils'
import TokenList from '@/components/common/createform/TokenList'
import { getWalletTransaction } from '@/utils/moralis.utils'
import { tokenAbi } from '@/contracts/abis/token.abi'
import { lockAbi } from '@/contracts/abis/lock.abi'
import axios from 'axios'
import { tokenLockUrl } from '@/utils/apiUrl.utils'


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

export default function TokenLock() {
    const { step, setStep } = useFormStore();
    const { isConnected, address } = useAccount();
    const [load, setLoad] = useState(false)
    const signer = useEthersSigner();
    const [selectedToken, setSelectedToken] = useState<TokenInfo>();
    const [tokenInfo, setTokenInfo] = useState<TokenInfo[]>([]);

    const [formInput, setFormInput] = useState<InputForm>({ amount: 0, timestamp: 0 });


    const [errors, setErrors] = useState({ amount: "", timestamp: "" });

    const handleNext = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const isValid = validateForm()
        console.log(isValid, "usoooo")
        if (!isValid) return
        setStep(4)
    };

    const validateForm = () => {
        let valid = true;
        let tempErrors = { amount: "", timestamp: "" };

        if (!formInput.amount) {
            tempErrors.amount = "Amount is required";
            valid = false;
        }
        if (!formInput.timestamp) {
            tempErrors.timestamp = "Timestamp is required";
            valid = false;
        }

        setErrors(tempErrors);
        return valid;
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
                await axios.post(tokenLockUrl.lock, {
                    wallet: address,
                    chainId: 97,
                    token: selectedToken.token,
                    amount: formInput.amount,
                    withdrawlAddress: address,
                    unlockTime: formInput.timestamp,
                    txhash: receipt.hash,
                    mintNft: _mintNFT,
                    referr: referr
                });
                notify(networks.Binance.url, receipt.hash)
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
                <CreateProgress title="Create team token lock" />
                <ConnectWallet />
                <div className="select-blockchain-box">
                    <SelectNetwork />
                    {
                        step < 2 && (
                            <div className="select-blockchain ">
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
                        <div className="add-feature-container add-feature-container2-2">
                            <h3>Add lock details</h3>
                            <p>Set the amount and time period you would like to lock your tokens for.</p>

                            <div className="ad-lock-box1">
                                <span>Lock amount</span>
                                <div>
                                    <input
                                        type="number"
                                        name="amount"
                                        placeholder="Enter amount"
                                        value={formInput.amount}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="ad-lock-box2">
                                <p>Your balance :</p>
                                <span>10000 xrp</span>
                                <h5>Max</h5>
                            </div>

                            <div className="ad-lock-box1">
                                <span>
                                    Unlock date & time{" "}
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
                                        placeholder="select date"
                                        value={formInput.timestamp ? new Date(formInput.timestamp).toISOString().slice(0, -1) : ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="ad-lock-box3 rs-ad-lock-box3">
                                <p>Service Fee</p>
                                <span>$0.00</span>
                            </div>

                            <div className="ad-lock-box44">
                                <div className="ad-lock-box4">
                                    <div>
                                        <p>Do you have a valid Referral Address</p>
                                        <span>Receive a 10% discount!</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="percent" />
                                    </div>
                                </div>
                                <div className="check-to-come-up">
                                    <input type="text" placeholder="Enter referres wallet address here" />
                                </div>
                            </div>
                            <div className="ad-lock-box5" onClick={(e) => handleNext(e)}>
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
                            <p>Please ensure the following details are correct:</p>

                            <div className="token-information-box">
                                <div className='tk-informantion'>
                                    <p>Token</p>
                                    <div>
                                        {/* <img src="https://app.team.finance/tokens/ethereum-token.webp" alt="l" /> */}
                                        <span>{selectedToken?.symbol}</span>
                                    </div>
                                </div>
                                <div className='tk-informantion'>
                                    <p>Blockchain</p>
                                    <div>
                                    <img src="https://app.team.finance/icons/wizard/binance.svg" alt="l" /><span>Binance</span>
                                    </div>
                                </div>
                                <div className='tk-informantion'>
                                    <p>Lock Amount</p>
                                    <div>
                                        <span>{formInput?.amount}</span>
                                    </div>
                                </div >
                                <div className='tk-informantion'>
                                    <p>Service fee</p>
                                    <div>
                                        <span>-</span>
                                    </div>
                                </div>
                                <div className='tk-informantion'>
                                    <p>Unlock Time</p>
                                    <div>
                                        <span>{formInput.timestamp ? new Date(formInput.timestamp).toISOString().slice(0, -1) : ""}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="confirm-transtion-btn">
                                <button onClick={() => lock()}>{load ? "PROCESSING..." : "Confirm transaction"}</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ActionLayout>
    )
}


