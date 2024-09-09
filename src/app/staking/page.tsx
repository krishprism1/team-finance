"use client"
import ActionLayout from '@/containers/ActionLayout'
import React, { useEffect, useState } from 'react'
import "../../styles/mint.css"
import "../../styles/Staking.css"
import "../../styles/multisender.css"
import "../../styles/Mint-responsive.css"
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
import { stakeFormInfo, TokenInfo, ValidationErrors } from '@/utils/interface.utils'
import Que from "/public/form/question.svg"
import { stakeTokenValidateStep } from '@/validation/stake.validation'
import { isStepValid } from '@/validation/createTokenForm.validation'
import { stakeAbi } from '@/contracts/abis/stake.abi'
import axios from "axios";
import { poolUrl } from '@/utils/apiUrl.utils'


export default function Staking() {
    const { step, setStep } = useFormStore();
    const { isConnected, address } = useAccount();
    const [load, setLoad] = useState(false)
    const signer = useEthersSigner();
    const [selectedToken, setSelectedToken] = useState<TokenInfo>();
    const [tokenInfo, setTokenInfo] = useState<TokenInfo[]>([]);
    const [formData, setFormData] = useState<stakeFormInfo>({
        rewardToken: "",
        startTime: 0,
        endTime: 0,
        precision: 18,
        totalReward: 0
    })

    const [errors, setErrors] = useState<ValidationErrors>({});

    const handleNext = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (step === 3) {
            const newErrors = stakeTokenValidateStep(step, formData);
            setErrors(newErrors);
            if (isStepValid(newErrors)) {
                setStep(step + 1);
            }
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "number"
                ? parseFloat(value)
                : type === "datetime-local"
                    ? new Date(value).getTime()
                    : value
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
        setFormData((prevData) => ({
            ...prevData,
            ["rewardToken"]: item.token
        }))

    };

    const addPool = async () => {
        setLoad(true);
        if (!isConnected) {
            toast.error("Please connect the wallet first!");
        }

        if (signer && selectedToken) {
            try {
                console.log("++++", formData.startTime, formData.endTime)

                const tokenInstance = new ethers.Contract(selectedToken.token, tokenAbi, await signer);
                const _tx = await tokenInstance.approve(networks.Binance.stakeContract, intToBig(formData.totalReward, 18))
                await _tx.wait()
                const stakeInstance = new ethers.Contract(networks.Binance.stakeContract, stakeAbi, await signer);
                // const fee = await stakeInstance.getFeesInETH(token)
                const tx = await stakeInstance.addPool(selectedToken.token, formData.rewardToken, formData.startTime /1000, formData.endTime/1000, formData.precision, intToBig(formData.totalReward, 18));
                const receipt = await tx.wait();
                console.log("__________")
                await axios.post(poolUrl.pool, {
                    wallet: address,
                    chainId: 97,
                    mainToken: selectedToken.token,
                    rewardToken: formData.rewardToken,
                    startTime: formData.startTime,
                    endTime: formData.endTime,
                    decimals: formData.precision,
                    txhash: receipt.hash,
                    totalReward: formData.totalReward
                });
                notify(networks.Binance.url, receipt.hash)
                toast.success("Transaction completed successfully!");
                setLoad(false);
            } catch (error: any) {
                console.log(error)
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
                        <div className="token-info-connected-small-box" onClick={() => setStep(2)}>
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
                                        name="startTime"
                                        className='input'
                                        placeholder=""
                                        value={formData.startTime ? new Date(formData.startTime).toISOString().slice(0, -1) : ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="ad-lock-box1 staking-input-box">
                                <span>End date <Que width="14" height="14" fill="currentColor" /></span>
                                <div>
                                    <input
                                        type="datetime-local"
                                        name="endTime"
                                        className='input'
                                        placeholder="select date"
                                        value={formData.endTime ? new Date(formData.endTime).toISOString().slice(0, -1) : ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="ad-lock-box1 staking-input-box">
                                <span>Reward token address</span>
                                <div>
                                    <input
                                        type="text"
                                        name="rewardToken"
                                        className='input'
                                        placeholder="0x..."
                                        value={formData.rewardToken}
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
                                        name="totalReward"
                                        className='input'
                                        placeholder="0"
                                        value={formData.totalReward}
                                        onChange={handleChange}
                                        required
                                    />
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
                            <p>We need your authorisation before using the token. This only needs to be done once.</p>

                            <div className="confirm-transtion-btn">
                                <button onClick={() => addPool()}>{load ? "PROCESSING..." : "Confirm"}</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ActionLayout>
    )
}


