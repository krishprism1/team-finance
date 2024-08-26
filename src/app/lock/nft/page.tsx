"use client"
import ActionLayout from '@/containers/ActionLayout'
import React, { useEffect, useState } from 'react'
import "../../../styles/mint.css"
import "../../../styles/multisender.css"
import "../../../styles/Mint-responsive.css"
import "../../../styles/TeamTokenLockResponsive.css"
import "../../../styles/NftResponsive.css"
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
import { nftAbi } from '@/contracts/abis/nft.abi'
import { lockAbi } from '@/contracts/abis/lock.abi'


type NftInfo = {
    name: string;
    symbol: string;
};

type InputValue = {
    contractAddress: string;
    tokenId: number;
}
export default function NFTLock() {
    const { step, setStep } = useFormStore();
    const { isConnected, address } = useAccount();
    const [load, setLoad] = useState(false)
    const signer = useEthersSigner();
    const [nftInfo, setNftInfo] = useState<NftInfo | undefined>(undefined);
    const [lockTime, setLockTime] = useState<number | undefined>(undefined);


    // const [inputValues, setInputValues] = useState({
    //     contractAddress: '',
    //     tokenId: '',
    // });

    const [inputValues, setInputValues] = useState<InputValue>({
        contractAddress: '',
        tokenId: 0,
    });

    // Handle input change
    const _handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const [errors, setErrors] = useState<ValidationErrors>({});


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

    const getNftDetails = async () => {
        const instance = new ethers.Contract(inputValues.contractAddress, nftAbi, await signer);
        const name = await instance.name();
        const symbol = await instance.symbol();
        const ownerAddress = await instance.ownerOf(inputValues.tokenId);
        if (ownerAddress.toLowerCase() != address?.toLocaleLowerCase()) {
            return null;
        }
        setNftInfo({ name, symbol })
    }

    useEffect(() => {
        if (inputValues.contractAddress && inputValues.tokenId && signer) {
            getNftDetails()
        }
    }, [inputValues])

    const lock = async () => {
        setLoad(true);
        if (!isConnected) {
            toast.error("Please connect the wallet first!");
        }
        let _mintNFT = false
        let referr = "0x0000000000000000000000000000000000000000"

        if (signer && inputValues.contractAddress) {
            try {
                const tokenInstance = new ethers.Contract(inputValues?.contractAddress, nftAbi, await signer);
                const _tx = await tokenInstance.approve(networks.Binance.lockToken, inputValues?.tokenId)
                await _tx.wait()
                const lockInstance = new ethers.Contract(networks.Binance.lockToken, lockAbi, await signer);
                const fee = await lockInstance.getFeesInETH(inputValues?.contractAddress)
                const tx = await lockInstance.lockToken(inputValues?.contractAddress, address, inputValues?.tokenId, lockTime, _mintNFT, referr, {
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
                <CreateProgress title="Create NFT lock" />
                <ConnectWallet />
                <div className="select-blockchain-box">
                    <SelectNetwork />
                    {
                        step < 2 && (
                            <div className="select-blockchain">
                                <div className='select-box1'>
                                    <div>
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></svg>
                                        <span>Enter NFT info</span>
                                    </div>
                                    <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" className='select-right-arrow' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor"></path></svg>
                                </div>
                            </div>
                        )
                    }
                    {step == 2 && (
                        <div className="token-info-container">
                            <h3>Enter NFT info</h3>
                            <p className='token-address-p'>Enter the contract address and TokenID for the NFT you are locking, or select from the tokens listed below from your wallet.</p>
                            <div className="token-form-column">
                                <form>
                                    <div className='top-input-box'>
                                        <div>
                                            <label className='heading-of-token-address enter-adress-nft-lock'>NFT contract address</label>
                                            <input
                                                type="text"
                                                name='contractAddress'
                                                onChange={_handleChange}
                                                placeholder='Enter address'
                                                className='token-address-input'
                                                value={inputValues.contractAddress}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='top-input-box nft-token-id-box'>
                                        <div>
                                            <label className='heading-of-token-address'>NFT Token ID</label>
                                            <input
                                                type="text"
                                                name='tokenId'
                                                onChange={_handleChange}
                                                placeholder='Enter token ID'
                                                className='token-address-input'
                                                value={inputValues.tokenId}
                                                required
                                            />
                                        </div>
                                    </div>
                                    {nftInfo && (
                                        <div className="nft-token-id-box2">
                                            <div>
                                                <p>Name</p>
                                                <span><img src="https://app.team.finance/tokens/bsc-token.webp" width="30" height="30" alt="l" />{nftInfo.name}</span>
                                            </div>
                                            <div>
                                                <p>Symbol</p>
                                                <span>{nftInfo.symbol}</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="form-continue-btn" onClick={() => setStep(3)}>
                                        <button type="submit">Continue</button>
                                    </div>
                                </form>
                            </div>
                        </div>
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
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"></path></svg>
                                    <span>Add lock details</span>
                                </div>
                                <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" className='select-right-arrow' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor"></path></svg>
                            </div>
                        </div>
                    )}
                    {step == 3 && (
                        <div className="add-feature-container">
                            <h3>Add lock details</h3>
                            <p>Set the time period you would like to lock your NFT for.</p>

                            <div className="ad-lock-box1 ad-lock-box1-1">
                                <span>Unlock date & time <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" data-tooltip-id="tooltip-help-lock-period" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 6a3.939 3.939 0 0 0-3.934 3.934h2C10.066 8.867 10.934 8 12 8s1.934.867 1.934 1.934c0 .598-.481 1.032-1.216 1.626a9.208 9.208 0 0 0-.691.599c-.998.997-1.027 2.056-1.027 2.174V15h2l-.001-.633c.001-.016.033-.386.441-.793.15-.15.339-.3.535-.458.779-.631 1.958-1.584 1.958-3.182A3.937 3.937 0 0 0 12 6zm-1 10h2v2h-2z"></path><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path></svg></span>
                                <div>
                                    <input
                                        type="datetime-local"
                                        placeholder='select date'
                                        value={lockTime ? new Date(lockTime).toISOString().slice(0, -1) : ""}
                                        onChange={(e) => setLockTime(new Date(e.target.value).getTime())}
                                    />
                                </div>
                            </div>

                            {/* <div className="ad-lock-box3 ad-lock-box3-3 ">
                                <p>Service Fee</p>
                                <span>$10.00</span>
                            </div>

                            <div className='ad-lock-box44{'>
                                <div className="ad-lock-box4 ad-lock-box44-4">
                                    <div>
                                        <p>Do you have a valid Referral Address</p>
                                        <span>Receive a 10% discount!</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="percent" placeholder='"' />
                                    </div>
                                </div>
                                <div className='check-to-come-up input'>
                                    <input type="text" placeholder='Enter referres wallet address here' />
                                </div>
                            </div> */}
                            <div className="ad-lock-box5" onClick={() => setStep(4)}>
                                <button className='all-time-use-btn'>Continue</button>
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
                            <p>We need your authorisation before using the NFT. This only needs to be done once.</p>
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


