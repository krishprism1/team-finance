"use client"
import ActionLayout from '@/containers/ActionLayout'
import React, { useEffect, useState } from 'react'
import "../../styles/mint.css"
import "../../styles/Staking.css"
import "../../styles/multisender.css"
import "../../styles/Mint-responsive.css"
import "../../styles/MultisenderResponsive.css"
import "../../styles/VestingResponsive.css"
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
import Modal from '@/components/modal/Modal'
import TokenList from '@/components/common/createform/TokenList'
import { getWalletTransaction } from '@/utils/moralis.utils'
import VIcon from "/public/form/v.svg"
import LinkIcon from "/public/form/link.svg"
import { tokenAbi } from '@/contracts/abis/token.abi'
import { vestingFactoryAbi } from '@/contracts/abis/vestingFactory.abi'


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

    const closeModal = () => {
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

    const creatVesting = async () => {
        setLoad(true);
        if (!isConnected) {
            setLoad(false);
            toast.error("Please connect the wallet first!");
        }
        // let token = "0xD6cE8678FCF5AFa86F0a5E883f4D431F571Db62B"
        let merkleRoot = "0xcee59b1f051c18fa9423528fb67cf285f86aa9fb34f0f38c766bda9a081403b3"
        if (signer && selectedToken) {
            try {
                const tokenInstance = new ethers.Contract(selectedToken.token, tokenAbi, await signer);
                await tokenInstance.approve(networks.Binance.vestingFactory, intToBig(totalVestingToken, 18))
                const vFactory = new ethers.Contract(networks.Binance.vestingFactory, vestingFactoryAbi, await signer);
                const tx = await vFactory.createVesting(selectedToken.token, merkleRoot, intToBig(totalVestingToken, 18));
                const receipt = await tx.wait();
                toast.success("Transaction completed successfully!");
                console.log(receipt)
                setLoad(false);
            } catch (error: any) {
                toast.error(error.reason);
                setLoad(false);
            }
        }
    };

    const totalVestingToken = users?.reduce((total, user) => total + Number(user.numberOfTokens), 0);

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
                            <div>
                                <div className="recipient-box1 vesting-token-details">
                   
                                        <div className="recipient-box2 recipient-box2-2">
                                            <div className="rct-box2">
                                                <div className="small-rtc-box">
                                                    <p>Token balance</p>
                                                    <span>5.00 OOE</span>
                                                </div>
                                                <div className="small-rtc-box">
                                                    <p>Total vesting amount</p>
                                                    <span>3 OOE</span>
                                                </div>
                                                <div className="small-rtc-box">
                                                    <p>Fee</p>
                                                    <span>$0.00</span>
                                                </div>

                                                <div className="small-rtc-box3">
                                                    <div className="draw-no-about-token">
                                                        <div className="fully-details-box">
                                                            <div>
                                                                <span>1.</span>
                                                                <p>0xf90f...eae9</p>
                                                            </div>
                                                            <div>
                                                                <button>
                                                                <svg stroke="#7992f2" fill="#7992f2" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M4 21a1 1 0 0 0 .24 0l4-1a1 1 0 0 0 .47-.26L21 7.41a2 2 0 0 0 0-2.82L19.42 3a2 2 0 0 0-2.83 0L4.3 15.29a1.06 1.06 0 0 0-.27.47l-1 4A1 1 0 0 0 3.76 21 1 1 0 0 0 4 21zM18 4.41 19.59 6 18 7.59 16.42 6zM5.91 16.51 15 7.41 16.59 9l-9.1 9.1-2.11.52z"></path></svg>
                                                                </button>
                                                                <button>
                                                                <svg stroke="#7992f2" fill="#7992f2" stroke-width="0" viewBox="0 0 24 24"  height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M11 10H9v3H6v2h3v3h2v-3h3v-2h-3z"></path><path d="M4 22h12c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2zM4 8h12l.002 12H4V8z"></path><path d="M20 2H8v2h12v12h2V4c0-1.103-.897-2-2-2z"></path></svg>   
                                                                </button>
                                                                <button>
                                                                    <svg
                                                                        stroke="#7992f2"
                                                                        fill="#7992f2"
                                                                        stroke-width="0"
                                                                        viewBox="0 0 24 24"
                                                                        height="1.5em"
                                                                        width="1.5em"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path d="M15 2H9c-1.103 0-2 .897-2 2v2H3v2h2v12c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V8h2V6h-4V4c0-1.103-.897-2-2-2zM9 4h6v2H9V4zm8 16H7V8h10v12z"></path>
                                                                    </svg>
                                                                </button>
                                                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className='last-svg-up-arrrow'  height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
                                                            </div>
                                                        </div>

                                                    <div className="details-token-vesting-plan">
                                                            <div>
                                                                <p>Number of tokens to vest</p>
                                                                <span>2</span>
                                                            </div>
                                                            <div>
                                                                <p>Wallet nickname</p>
                                                                <span></span>
                                                            </div>
                                                            <div>
                                                                <p>Relationship</p>
                                                                <span>Employee</span>
                                                            </div>
                                                            <div>
                                                                <p>Start date & time</p>
                                                                <span>Sep 25, 2024, 2:53 PM UTC</span>
                                                            </div>
                                                            <div>
                                                                <p>End date & time</p>
                                                                <span>Sep 25, 2024, 2:53 PM UTC</span>
                                                            </div>
                                                            <div>
                                                                <p>Vesting cadence</p>
                                                                <span>Per day</span>
                                                            </div>
                                                            <div>
                                                                <p>Cliff length</p>
                                                                <span>0 Months</span>
                                                            </div>
                                                            <div>
                                                                <p>Release percentage at cliff end</p>
                                                                <span>0%</span>
                                                            </div>
                                                    </div>
                                                 </div>
                                                </div>
                                                <div className="small-rtc-box4">
                                                    <div className="div1">
                                                        <div>
                                                            <p>Showing page 1 of 1</p>
                                                            <p>1 results</p>
                                                        </div>
                                                    </div>
                                                    <div className="div22">
                                                        <div className="div2">
                                                            <p>Show rows</p>
                                                            <select
                                                                id="mySelect">
                                                                <option value="1">1</option>
                                                                <option value="5">5</option>
                                                                <option value="10">10</option>
                                                            </select>
                                                        </div>
                                                        <div className="div3">
                                                            <button>
                                                                <svg
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    stroke-width="0"
                                                                    viewBox="0 0 24 24"
                                                                    height="20"
                                                                    width="20"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M18.3639 7.75735L16.9497 6.34314L11.2929 12L16.9497 17.6568L18.3639 16.2426L14.1213 12L18.3639 7.75735Z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                    <path
                                                                        d="M11.2929 6.34314L12.7071 7.75735L8.46447 12L12.7071 16.2426L11.2929 17.6568L5.63605 12L11.2929 6.34314Z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                </svg>
                                                            </button>
                                                            <button>
                                                                <svg
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    stroke-width="0"
                                                                    viewBox="0 0 24 24"
                                                                    height="20"
                                                                    width="20"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                </svg>
                                                            </button>
                                                            <button>
                                                                <svg
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    stroke-width="0"
                                                                    viewBox="0 0 24 24"
                                                                    height="20"
                                                                    width="20"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M10.5858 6.34317L12 4.92896L19.0711 12L12 19.0711L10.5858 17.6569L16.2427 12L10.5858 6.34317Z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                </svg>
                                                            </button>
                                                            <button>
                                                                <svg
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    stroke-width="0"
                                                                    viewBox="0 0 24 24"
                                                                    height="20"
                                                                    width="20"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M5.63605 7.75735L7.05026 6.34314L12.7071 12L7.05029 17.6568L5.63608 16.2426L9.87869 12L5.63605 7.75735Z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                    <path
                                                                        d="M12.7071 6.34314L11.2929 7.75735L15.5356 12L11.2929 16.2426L12.7072 17.6568L18.364 12L12.7071 6.34314Z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="small-rtc-box5">
                                                    <div className="box1">
                                                        <button style={{
                                                            cursor:'pointer',
                                                            color:'blue',
                                                            backgroundColor:'transparent'
                                                        }}>
                                                            Add address
                                                        </button>
                                                        <a href="#">
                                                            Download updated CSV file
                                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"  height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 7h14v2H5z"></path></svg>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                             </div>

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

                                                    <div className="toggle-middle-container">

                                                              <div className="toggle-button-box">
                                                              <input type="checkbox" id='check'/>
                                                              <label htmlFor="check" className='button'></label>
                                                    </div>

                                                    <span style={{fontSize:'1em',fontWeight:'500',color:'black'}}>Cliff period <svg stroke="gray" fill="gray" stroke-width="0" viewBox="0 0 24 24" height="1.1em" width="1.1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path></svg></span>
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

                                <div className="recipient-box2 vesting-box2 ">
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
                                <button onClick={() => creatVesting()}>{load ? "PROCESSING..." : "Confirm transaction"}</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ActionLayout>
    )
}


