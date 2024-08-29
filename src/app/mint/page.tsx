"use client"
import ActionLayout from '@/containers/ActionLayout'
import React, { useState } from 'react'
import "../../styles/mint.css"
import "../../styles/EmptyInputAlert.css"
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
import { abi } from '@/contracts/abis/tokenFactory.abi'
import { intToBig } from '@/utils/math.utils'
import { createTokenValidateStep, isStepValid } from '@/validation/createTokenForm.validation'
import axios from 'axios'
import { tokenMintUrl } from '@/utils/apiUrl.utils'
import { ITokenForm, ValidationErrors } from '@/utils/interface.utils'

export default function Mint() {
    const { step, setStep } = useFormStore();
    const { isConnected, address } = useAccount();
    const [load, setLoad] = useState(false)
    const signer = useEthersSigner();
    const [tokenDetail, setTokenDetail] = useState<ITokenForm>({
        wallet: "",
        name: "",
        symbol: "",
        supply: 0,
        decimal: 0,
        description: "",
        tokenLogo: "",
        website: "",
        twitter: "",
        telegram: "",
        mintable: false,
        burnable: false
    });
    const [errors, setErrors] = useState<ValidationErrors>({});

    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (step === 2) {
            const newErrors = createTokenValidateStep(step, tokenDetail);
            setErrors(newErrors);
            if (isStepValid(newErrors)) {
                setStep(step + 1);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setTokenDetail({
            ...tokenDetail,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const creatToken = async () => {
        setLoad(true);
        if (!isConnected) {
            setLoad(false);
            return toast.error("Please connect the wallet first!");
        }

        if (signer) {
            try {
                const contract = new ethers.Contract(networks.Binance.tokenFactory, abi, await signer);
                const tx = await contract.createToken(
                    tokenDetail.name,
                    tokenDetail.symbol,
                    intToBig(tokenDetail?.supply, 18),
                    tokenDetail.mintable,
                    tokenDetail.burnable
                );

                const receipt = await tx.wait();
                await saveToDb()
                notify(networks.Binance.url, receipt.transactionHash)
                setStep(5)
                setLoad(false);
            } catch (error: any) {
                toast.error(error.reason);
                setLoad(false);
            } finally {

            }
        }
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

    const saveToDb = async () => {
        try {
            tokenDetail.wallet = address ?? '';
            await axios.post(tokenMintUrl.mint, tokenDetail);
        } catch (error) {
            console.log(error, "++++")
        }
    }

    return (
        <ActionLayout>
            <div className="creat-token-container">
                <CreateProgress title="Create Token" />
                <ConnectWallet />
                <div className="select-blockchain-box">
                    <SelectNetwork />
                    {
                        step < 2 && (
                            <div className="select-blockchain">
                                <div className='select-box1'>
                                    <div>
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></svg>
                                        <span>Enter token info</span>
                                    </div>
                                    <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" className='select-right-arrow' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor"></path></svg>
                                </div>
                            </div>
                        )
                    }
                    {step == 2 && (
                        <div className="token-info-container">
                            <h3>Enter token info</h3>
                            <p>Please provide the following information:</p>
                            <div className="token-form-column">
                                <form>
                                    <div className='top-input-box'>
                                        <div>
                                            <label>Token name</label>
                                            <input type="text" name='name' className={errors?.name ? 'empty-field danger' : "empty-field"} onChange={handleChange} placeholder='e.g "Team Finance"' required />
                                            {errors?.name && <span className='danger2 danger3'>{errors.name}</span>}
                                        </div>
                                        <div>
                                            <label>Symbol</label>
                                            <input type="text" name='symbol' className={errors?.symbol ? 'empty-field danger' : "empty-field"} onChange={handleChange} placeholder='e.g "TFC"' required />
                                            {errors?.symbol && <span className='danger2 danger3'>{errors.symbol}</span>}
                                        </div>
                                    </div>
                                    <label>Image Token</label>
                                    <div className="file-upload-area">
                                        <label className="drop-area" title='for drag'>  Drop file here </label>
                                        <input type="file" id="file-input" accept=".jpeg,.jpg,.png" placeholder='Image Drag here' />
                                        <p>.jpeg, .jpg or .png 2MB max</p>
                                    </div>
                                    <div className="field">
                                        <label>Decimal</label>
                                        <input type="number" name="decimal" className={errors?.decimal ? 'empty-field danger' : "empty-field"} onChange={handleChange} placeholder='8-18' required />
                                        {errors?.decimal && <span className='danger2 danger3'>{errors.decimal}</span>}
                                    </div>
                                    <div className="field">
                                        <label >Initial supply </label>
                                        <input type="number" name="supply" className={errors?.supply ? 'empty-field danger' : "empty-field"} onChange={handleChange} placeholder='e.g "10 000"' required />
                                        {errors?.supply && <span className='danger2 danger3'>{errors.supply}</span>}
                                    </div>
                                    <div className="field">
                                        <label >Description</label>
                                        <input type="text" name="description" className={errors?.description ? 'empty-field danger' : "empty-field"} onChange={handleChange} placeholder='e.g "A Defi Yeild Farming Token"' required />
                                        {errors?.description && <span className='danger2 danger3'>{errors.description}</span>}
                                    </div>
                                    <div className="field">
                                        <label >Website (optional)</label>
                                        <input type="text" name="Website (optional)" className='empty-field' placeholder='e.g "https://www.team.finance/"' />
                                        <span className='danger2'>This field is required</span>
                                    </div>
                                    <div className="field">
                                        <label >Twitter (optional)</label>
                                        <input type="text" name="Twitter (optional)" className='empty-field' placeholder='e.g "https://twitter.com/team.finance/"' />
                                        <span className='danger2'>This field is required</span>
                                    </div>
                                    <div className="field">
                                        <label >Telegram (optional)</label>
                                        <input type="text" name="Telegram (optional)" className='empty-field' placeholder='e.g "https://t.me/team.finance/"' />
                                        <span className='danger2'>This field is required</span>
                                    </div>
                                    <div className="form-continue-btn">
                                        <button type="submit" onClick={handleNext}>Continue</button>
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
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15 16a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6z"></path><path d="M5 16h1V8a2 2 0 0 1 2-2h8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zm3 3a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1v8a2 2 0 0 1-2 2H8v1z"></path></svg>
                                    <span>Add features</span>
                                </div>
                                <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" className='select-right-arrow' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor"></path></svg>
                            </div>
                        </div>
                    )}
                    {step == 3 && (
                        <div className="add-feature-container">
                            <h3>Add features</h3>
                            <p>Choose the additional functionality you want added to your smart contract code.</p>
                            <form>
                                <div className="feature-box2">
                                    <input type="checkbox" name="mintable" onChange={handleChange} id="Mint" title='Mint' />
                                    <div className='feature-heading'>
                                        <h4>Mint Function</h4>
                                        <p>Add the ability to mint additional tokens.</p>
                                    </div>
                                </div>
                                <div className="feature-box3">
                                    <input type="checkbox" name="burnable" onChange={handleChange} id="Burn" title='Burn' className='featutre-box3-input' />
                                    <div className='feature-heading'>
                                        <h4>Burn Function</h4>
                                        <p>Add the ability to burn your tokens. This is great for creating deflation</p>
                                    </div>
                                </div>
                                <button type="submit" className='feature-btn' onClick={() => setStep(step + 1)}>Continue</button>
                            </form>
                        </div>
                    )}
                    {step > 3 && (
                        <div className="add-feature-connected-small-box" onClick={() => setStep(3)}>
                            <div>
                                <img alt="Icon" loading="lazy" width="16" height="16" decoding="async" data-nimg="1" src="https://app.team.finance/_next/static/media/check-circle.e19b6900.svg" />
                                <p>Add features</p>
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
                                        <img src="https://app.team.finance/tokens/ethereum-token.webp" alt="l" /><span>{tokenDetail?.symbol}</span>
                                    </div>
                                </div>
                                <div className='tk-informantion'>
                                    <p>Blockchain</p>
                                    <div>
                                        <img src="https://app.team.finance/icons/wizard/ethereum.svg" alt="l" /><span>Ethereum</span>
                                    </div>
                                </div>
                                <div className='tk-informantion'>
                                    <p>Total supply</p>
                                    <div>
                                        <span>{tokenDetail?.supply}</span>
                                    </div>
                                </div >
                                <div className='tk-informantion'>
                                    <p>Service fee</p>
                                    <div>
                                        <span>-</span>
                                    </div>
                                </div>
                                <div className='tk-informantion'>
                                    <p>Feature</p>
                                    <div>
                                        <span>{tokenDetail?.mintable ? "mintable" : ""} & {tokenDetail?.burnable ? "burnable" : ""}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="confirm-transtion-btn">
                                <button onClick={() => creatToken()}>{load ? "PROCESSING..." : "Confirm transaction"}</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ActionLayout>
    )
}


