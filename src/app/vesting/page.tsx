"use client"
import ActionLayout from '@/containers/ActionLayout'
import React, { useState } from 'react'
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

export default function Vesting() {
    const { step, setStep } = useFormStore();
    const { isConnected } = useAccount();
    const [load, setLoad] = useState(false)
    const signer = useEthersSigner();

    const [toggleFirst, setToggleFirst] = useState(false)
    const [toggleSecond, setToggleSecond] = useState(false)

    const [tokenDetail, setTokenDetail] = useState<TokenDetail>({
        name: "",
        symbol: "",
        supply: 0,
        decimal: 0,
        description: "",
        website: "",
        twitter: "",
        telegram: "",
        mintable: false,
        burnable: false,
    });
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
            notify(networks.Binance.url ,receipt.transactionHash)
            setStep(5)
            setLoad(false);
          } catch (error: any) {
            toast.error(error.reason);
            setLoad(false);
          } finally {
    
          }
        }
      };

      const notify = (link: string, txhash:string) => {
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
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></svg>
                                        <span>Enter token address</span>
                                    </div>
                                    <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" className='select-right-arrow' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor"></path></svg>
                                </div>
                            </div>
                        )
                    }
                    {step == 2 && (
                        <div className="token-info-container">
                            <h3>Enter token address</h3>
                            <p className='token-address-p'>Enter the token address for the token you are sending, or select from the tokens listed below from your wallet.</p>
                            <div className="token-form-column">
                                <form>
                                    <div className='top-input-box'>
                                        <div>
                                            <label className='heading-of-token-address'>Token address</label>
                                            <input type="text" name='name' onChange={handleChange} placeholder='Enter address....' className='token-address-input' required />
                                        </div>
                                    </div>
                                    <label className='heading-of-token-address'>e.g. 0xCC4304A31d09258b0029eA7FE63d032f52e44EFe</label>
                                    <div className='token-info-box'>
                                        <div className="token-details-box1">
                                            <img src="	https://app.team.finance/tokens/ethereum-token.webp" alt="l" />
                                            <div>
                                                <div className='small-info-box'>
                                                    <p>ETH</p>
                                                    <svg stroke="blue" fill="blue" stroke-width="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
                                                </div>
                                                <div className='small-info-box2'>
                                                    <span>Native token</span>
                                                    <p> 0.01</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="token-details-box2">
                                            <div className='info-colum11'>
                                                <div>
                                                    <h4>Token</h4>
                                                </div>
                                                <div>
                                                    <p><img src="	https://app.team.finance/tokens/ethereum-token.webp" alt="l" />ETH</p>
                                                </div>
                                            </div>
                                            <div className='info-colum11'>
                                                <div>
                                                    <h4>Balance</h4>
                                                </div>
                                                <div>
                                                    <p>0</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19 15v-3h-2v3h-3v2h3v3h2v-3h3v-2h-.937zM4 7h11v2H4zm0 4h11v2H4zm0 4h8v2H4z"></path></svg>
                                    <span>Add recipient details</span>
                                </div>
                                <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" className='select-right-arrow' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor"></path></svg>
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
                                            <div className='add-address-box'><button className='all-time-use-btn'>Add address</button></div>
                                        </div>            
                                    )}

                                    {/* address details container */}
                                      <div className="address-details-box">
                                            <div className="address-form-container">
                                                <form>

                                                <div className="ad-box1">
                                                    <h3>Add address</h3>
                                                    <svg stroke="black" fill="black" stroke-width="0" viewBox="0 0 24 24"  aria-hidden="true" height="1.7em" width="1.7em" xmlns="http://www.w3.org/2000/svg"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
                                                </div>

                                                <h4 style={{fontWeight:600,marginBottom:"8px",marginTop:"5px"}}>Wallet details</h4>

                                                <div className="ad-box2">
                                                    <div>
                                                        <span>Wallet address</span>
                                                        <input type="text" />
                                                        <span>e.g. 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B</span>
                                                    </div>
                                                    <div>
                                                    <span>Wallet nickname (optional)</span>
                                                        <input type="text" />
                                                    </div>
                                                </div>

                                                <h4 style={{fontWeight:"600",marginBottom:"8px",marginTop:"14px"}}>Relationship</h4>

                                                <div className="ad-box3">
                                                        <div className='ad-box3-3'>
                                                            <input type="radio" name="relation"/>
                                                            <div style={{display:'flex',flexDirection:'column'}}>
                                                                <p>Investor</p>
                                                                <span>Unlimited recipients</span>
                                                            </div>
                                                        </div>
                                                        <div className='ad-box3-3'>
                                                        <input type="radio" name="relation"/>
                                                            <div style={{display:'flex',flexDirection:'column',gap:'0'}}>
                                                                <p>Employee</p>
                                                                <span>1 of 25 recipients</span>
                                                            </div>
                                                        </div>
                                                        <div className='last-div'>
                                                            <p><svg stroke="currentColor" fill="#006eff" stroke-width="0" viewBox="0 0 24 24" style={{marginRight:'10px'}}  height="1.1em" width="1.1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"></path></svg>what's the difference</p>
                                                        </div>
                                                </div>
                                                    
                                                <h4 style={{fontWeight:"600",marginBottom:"8px",marginTop:"14px"}}>Schedule details</h4>

                                                <div className="ad-box2">
                                                    <div>
                                                        <span>Number of tokens to vest</span>
                                                        <input type="number" placeholder='0' />
                                                    </div>
                                                    <div>
                                                    <span>Vesting cadence <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"  height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 6a3.939 3.939 0 0 0-3.934 3.934h2C10.066 8.867 10.934 8 12 8s1.934.867 1.934 1.934c0 .598-.481 1.032-1.216 1.626a9.208 9.208 0 0 0-.691.599c-.998.997-1.027 2.056-1.027 2.174V15h2l-.001-.633c.001-.016.033-.386.441-.793.15-.15.339-.3.535-.458.779-.631 1.958-1.584 1.958-3.182A3.937 3.937 0 0 0 12 6zm-1 10h2v2h-2z"></path><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path></svg></span>
                                                        <select className='select'>
                                                            <option>Per second</option>
                                                            <option>Per minute</option>
                                                            <option>Per hour</option>
                                                            <option>Per weak</option>
                                                            <option>Per month</option>
                                                            <option>Quarterly</option>
                                                            <option>Annually</option>
                                                        </select>
                                                    </div>
                                                </div>
                                
                                                <h4 style={{fontWeight:"400",marginBottom:"5px",marginTop:"10px",fontSize:'14px',color:'gray'}}>Balance: <span style={{color:'black',fontSize:'15px'}}> 10000 xrp</span></h4>

                                                <div className="ad-box2">
                                                    <div>
                                                        <span>Start date & time (UTC)</span>
                                                        <input type="datetime-local" />
                                                    </div>
                                                    <div>
                                                        <span>End date & time (UTC)</span>
                                                        <input type="datetime-local" />
                                                        <div style={{display:'flex',flexDirection:'row',gap:'10px'}}>
                                                            <h5>+3M</h5>
                                                            <h5>+6M</h5>
                                                            <h5>+1Y</h5>
                                                            <h5>+2Y</h5>
                                                            <h5>+3Y</h5>
                                                            <h5>+4Y</h5>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="ad-box4">
                                                    <div>
                                                        <button>hii</button>
                                                    </div>
                                                    <div>
                                                        <h5>Cliff period <svg stroke="gray" fill="gray" stroke-width="0" viewBox="0 0 24 24"  height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M12 6a3.939 3.939 0 0 0-3.934 3.934h2C10.066 8.867 10.934 8 12 8s1.934.867 1.934 1.934c0 .598-.481 1.032-1.216 1.626a9.208 9.208 0 0 0-.691.599c-.998.997-1.027 2.056-1.027 2.174V15h2l-.001-.633c.001-.016.033-.386.441-.793.15-.15.339-.3.535-.458.779-.631 1.958-1.584 1.958-3.182A3.937 3.937 0 0 0 12 6zm-1 10h2v2h-2z"></path><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path></svg></h5>
                                                    </div>
                                                </div>

                                                <div className="ad-box2">
                                                    <div>
                                                        <span>Cliff length (in months)  <svg stroke="gray" fill="gray" stroke-width="0" viewBox="0 0 24 24"  height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 6a3.939 3.939 0 0 0-3.934 3.934h2C10.066 8.867 10.934 8 12 8s1.934.867 1.934 1.934c0 .598-.481 1.032-1.216 1.626a9.208 9.208 0 0 0-.691.599c-.998.997-1.027 2.056-1.027 2.174V15h2l-.001-.633c.001-.016.033-.386.441-.793.15-.15.339-.3.535-.458.779-.631 1.958-1.584 1.958-3.182A3.937 3.937 0 0 0 12 6zm-1 10h2v2h-2z"></path><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path></svg></span>
                                                        <input type="number" placeholder='0' required/>
                                                    </div>
                                                    <div>
                                                    <span>Release percentage at cliff end <svg stroke="gray" fill="gray" stroke-width="0" viewBox="0 0 24 24"  height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 6a3.939 3.939 0 0 0-3.934 3.934h2C10.066 8.867 10.934 8 12 8s1.934.867 1.934 1.934c0 .598-.481 1.032-1.216 1.626a9.208 9.208 0 0 0-.691.599c-.998.997-1.027 2.056-1.027 2.174V15h2l-.001-.633c.001-.016.033-.386.441-.793.15-.15.339-.3.535-.458.779-.631 1.958-1.584 1.958-3.182A3.937 3.937 0 0 0 12 6zm-1 10h2v2h-2z"></path><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path></svg></span>
                                                        <input type="number" placeholder='0' required/>
                                                    </div>
                                                </div>

                                                <div className="ad-box5">
                                                    <button className='all-time-use-btn cancle-btn'>Cancle</button>
                                                    <button className='all-time-use-btn'>Add address</button>
                                                </div>


                                                </form>
                                            </div>
                                        </div>
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
                                        <span>{tokenDetail?.mintable ? "mintable": ""} & {tokenDetail?.burnable ? "burnable" : ""}</span>
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


