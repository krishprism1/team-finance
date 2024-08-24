"use client"
import ActionLayout from '@/containers/ActionLayout'
import React, { useEffect, useState } from 'react'
import "../../styles/mint.css"
import "../../styles/Mint-responsive.css"
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
import Modal from '@/components/modal/Modal'
import TokenList from '@/components/common/createform/TokenList'
import { getWalletTransaction } from '@/utils/moralis.utils'
import VIcon from "/public/form/v.svg"
import LinkIcon from "/public/form/link.svg"


interface TokenInfo {
    token: string;
    name: string;
    symbol: string;
    balance: number;
}

interface AddressFormData {
    walletAddress: string;
    walletNickname: string;
    relationship: string;
    numberOfTokens: number;
    vestingCadence: string;
    startDate: string;
    endDate: string;
    cliffLength: number;
    releasePercentage: number;
}

const initialFormData = {
    walletAddress: '',
    walletNickname: '',
    relationship: '',
    numberOfTokens: 0,
    vestingCadence: 'Per second',
    startDate: '',
    endDate: '',
    cliffLength: 0,
    releasePercentage: 0,
}

export default function Vesting() {
    const { step, setStep } = useFormStore();
    const { isConnected, address } = useAccount();
    const [load, setLoad] = useState(false)
    const signer = useEthersSigner();

    const [toggleFirst, setToggleFirst] = useState(false)
    const [toggleSecond, setToggleSecond] = useState(false)
    const [selectedToken, setSelectedToken] = useState<TokenInfo>();
    const [tokenInfo, setTokenInfo] = useState<TokenInfo[]>([]);
    const [formData, setFormData] = useState<AddressFormData>(initialFormData);

    const [users, setUsers] = useState<AddressFormData[]>([]);


    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        if (address) {
            getWalletTransaction(address, "45").then((res) => setTokenInfo(res));
        }
    }, [address, step]);


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = (e: any) => {
        e.preventDefault()
        setIsModalOpen(false);
    };

    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // if (step === 2) {
        //     const newErrors = validateStep(step, tokenDetail);
        //     setErrors(newErrors);
        //     if (isStepValid(newErrors)) {
        //         setStep(step + 1);
        //     }
        // }
    };


    const creatToken = async () => {
        setLoad(true);
        if (!isConnected) {
            setLoad(false);
            return toast.error("Please connect the wallet first!");
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

    const toggleRadio = (typeInput: string) => {
        if (typeInput === "first" && !toggleFirst) {
            setToggleFirst(true);
        } else if (typeInput === "second" && !toggleSecond) {
            setToggleSecond(true);
        }
    }

    const selectToken = async (item: any) => {
        setSelectedToken(item);
    };

    const addUser = () => {
        setUsers([...users, formData]);
        setFormData(initialFormData)
        setIsModalOpen(false);
    };

    const totalVestingToken = users?.reduce((total, user) => total + Number(user.numberOfTokens), 0);
    console.log(formData, "formData", users)

    return (
        <ActionLayout>
            <div className="creat-token-container">
                <CreateProgress title="Create vesting contract" />
                <ConnectWallet />
                <div className="select-blockchain-box">
                    <SelectNetwork />
                    {
                        step < 2 && (
                            <div className="select-blockchain">
                                <div className='select-box1'>
                                    <div>
                                        <LinkIcon width="16" height="16" fill="currentColor" />
                                        <span>Enter token address</span>
                                    </div>
                                    <VIcon width="24" height="24" fill="currentColor" />
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
                                <p>{selectedToken?.symbol}</p>
                                <VIcon width="24" height="24" fill="currentColor" />
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
                                <VIcon width="24" height="24" fill="currentColor" />
                            </div>
                        </div>
                    )}
                    {step == 3 && (
                        <div className="add-feature-container">
                            <h3>Add vesting details</h3>
                            <p className='vesting-heading'>Unsure how to upload a file? Feel free to contact us on <a href="https://t.me/teamfinance_main" target="_blank" >Telegram</a> to learn how.</p>
                            <form>
                                <div className='recipient-box1 vesting-box1'>
                                    <div className='rct-box1' onClick={(e) => toggleRadio("first")}>
                                        <div>
                                            <label htmlFor="add-recipients" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                                <input type="radio" name="add-file" id="add-recipients" style={{ marginRight: '8px' }} />
                                                <p>Create new vesting plan</p>
                                            </label>
                                        </div>
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
                                    </div>

                                    {toggleFirst && (
                                        <div className="recipient-box2 vesting-inner-box1">
                                            <div className='add-address-box'>
                                                <button className='all-time-use-btn' type="button" onClick={openModal}>Add address</button>
                                            </div>
                                        </div>
                                    )}

                                    {/* address details container */}
                                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                                        <div className="address-details-box">
                                            <div className="address-form-container">
                                                <form>
                                                    <div className="ad-box1">
                                                        <h3>Add address</h3>
                                                        <svg onClick={closeModal} stroke="black" fill="black" strokeWidth="0" viewBox="0 0 24 24" aria-hidden="true" height="1.7em" width="1.7em" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                                                        </svg>
                                                    </div>

                                                    <h4 style={{ fontWeight: 600, marginBottom: '8px', marginTop: '5px' }}>Wallet details</h4>

                                                    <div className="ad-box2">
                                                        <div>
                                                            <span>Wallet address</span>
                                                            <input type="text" name="walletAddress" value={formData.walletAddress} onChange={handleChange} />
                                                            <span>e.g. 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B</span>
                                                        </div>
                                                        <div>
                                                            <span>Wallet nickname (optional)</span>
                                                            <input type="text" name="walletNickname" value={formData.walletNickname} onChange={handleChange} />
                                                        </div>
                                                    </div>

                                                    <h4 style={{ fontWeight: 600, marginBottom: '8px', marginTop: '14px' }}>Relationship</h4>

                                                    <div className="ad-box3">
                                                        <div className="ad-box3-3">
                                                            <input type="radio" name="relationship" value="Investor" checked={formData.relationship === 'Investor'} onChange={handleChange} />
                                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                <p>Investor</p>
                                                                <span>Unlimited recipients</span>
                                                            </div>
                                                        </div>
                                                        <div className="ad-box3-3">
                                                            <input type="radio" name="relationship" value="Employee" checked={formData.relationship === 'Employee'} onChange={handleChange} />
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                                                                <p>Employee</p>
                                                                <span>1 of 25 recipients</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <h4 style={{ fontWeight: 600, marginBottom: '8px', marginTop: '14px' }}>Schedule details</h4>

                                                    <div className="ad-box2">
                                                        <div>
                                                            <span>Number of tokens to vest</span>
                                                            <input type="number" name="numberOfTokens" value={formData.numberOfTokens} onChange={handleChange} placeholder="0" />
                                                        </div>
                                                        <div>
                                                            <span>Vesting cadence</span>
                                                            <select name="vestingCadence" value={formData.vestingCadence} onChange={handleChange} className="select">
                                                                <option>Per second</option>
                                                                <option>Per minute</option>
                                                                <option>Per hour</option>
                                                                <option>Per week</option>
                                                                <option>Per month</option>
                                                                <option>Quarterly</option>
                                                                <option>Annually</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <h4 style={{ fontWeight: 400, marginBottom: '5px', marginTop: '10px', fontSize: '14px', color: 'gray' }}>
                                                        Balance: <span style={{ color: 'black', fontSize: '15px' }}> 10000 xrp</span>
                                                    </h4>

                                                    <div className="ad-box2">
                                                        <div>
                                                            <span>Start date & time (UTC)</span>
                                                            <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} />
                                                        </div>
                                                        <div>
                                                            <span>End date & time (UTC)</span>
                                                            <input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} />
                                                            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                                                <h5>+3M</h5>
                                                                <h5>+6M</h5>
                                                                <h5>+1Y</h5>
                                                                <h5>+2Y</h5>
                                                                <h5>+3Y</h5>
                                                                <h5>+4Y</h5>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="ad-box2">
                                                        <div>
                                                            <span>Cliff length (in months)</span>
                                                            <input type="number" name="cliffLength" value={formData.cliffLength} onChange={handleChange} placeholder="0" required />
                                                        </div>
                                                        <div>
                                                            <span>Release percentage at cliff end</span>
                                                            <input type="number" name="releasePercentage" value={formData.releasePercentage} onChange={handleChange} placeholder="0" required />
                                                        </div>
                                                    </div>

                                                    <div className="ad-box5">
                                                        <button className="all-time-use-btn cancel-btn" type='button' onClick={closeModal}>Cancel</button>
                                                        <button className="all-time-use-btn" type='button' onClick={addUser}>Add address</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>

                                <div className="recipient-box2 vesting-box2">
                                    <div className='rct-box1' onClick={(e) => toggleRadio("second")}>
                                        <div>
                                            <label htmlFor="upload-csv" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                                <input type="radio" name="add-file" id="upload-csv" style={{ marginRight: '8px' }} />
                                                <p>Upload CSV file</p>
                                            </label>
                                        </div>
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
                                    </div>

                                    {toggleSecond && (
                                        <div className="upload-cv-box">
                                            <p>Make sure that your file includes all required fields before uploading.</p>
                                            <div className='template-btn'>
                                                <button>See template</button>
                                            </div>
                                            <div className="upload-box">
                                                <div className='box1'>
                                                    <img src="https://app.team.finance/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FuploadFile.a47672a7.png&w=640&q=75" alt="l" />
                                                </div>
                                                <div className='box1'>
                                                    <h4>Drop CSV file here</h4>
                                                    <input type="file" name="file" placeholder='file' />
                                                </div>

                                            </div>
                                        </div>
                                    )}

                                </div>

                                <div className="form-continue-btn" onClick={() => setStep(4)}>
                                    <button type="submit" className='all-time-use-btn'>Continue</button>
                                </div>
                            </form>
                        </div>
                    )}
                    {step > 3 && (
                        <div className="add-feature-connected-small-box" onClick={() => setStep(3)}>
                            <div>
                                <img alt="Icon" loading="lazy" width="16" height="16" decoding="async" data-nimg="1" src="https://app.team.finance/_next/static/media/check-circle.e19b6900.svg" />
                                <p>Add recipient details</p>
                            </div>
                            <div>
                                <VIcon width="24" height="24" fill="currentColor" />
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
                                <VIcon width="24" height="24" fill="currentColor" />
                            </div>
                        </div>
                    )}
                    {step == 4 && (
                        <div className="create-contract-container">
                            <h3>Create contract</h3>
                            <p>Please ensure the following details are correct:</p>

                            <div className="token-information-box">
                                <div className='tk-informantion'>
                                    <p>Blockchain</p>
                                    <div>
                                        <img src="https://app.team.finance/icons/wizard/ethereum.svg" alt="l" /><span>Ethereum</span>
                                    </div>
                                </div>

                                <div className='tk-informantion'>
                                    <p>Token</p>
                                    <div>
                                        <img src="https://app.team.finance/tokens/ethereum-token.webp" alt="l" /><span>{selectedToken?.symbol}</span>
                                    </div>
                                </div>

                                <div className='tk-informantion'>
                                    <p>Total recipients</p>
                                    <div>
                                        <span>{users?.length}</span>
                                    </div>
                                </div >
                                <div className='tk-informantion'>
                                    <p>total Vesting Amount</p>
                                    <div>
                                        <span>{totalVestingToken}</span>
                                    </div>
                                </div>

                                <div className='tk-informantion'>
                                    <p>Service fee</p>
                                    <div>
                                        <span>-</span>
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


