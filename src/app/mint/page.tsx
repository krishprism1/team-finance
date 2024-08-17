"use client"
import ActionLayout from '@/containers/ActionLayout'
import React from 'react'
import "../../styles/mint.css"
import "../../styles/Mint-responsive.css"
import { useAccount } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { formatEthAddr } from '@/utils/math.utils'

export default function Mint() {
    const { address } = useAccount()
    const { open } = useWeb3Modal()
    const connect = async () => {
        await open()
    }
    return (
        <ActionLayout>
            <div className="creat-token-container">
                <div className="creat-token-column">
                    <div className="content1">
                        <h1>Create token</h1>
                        <div>
                            <a href="#"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="vd-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="m9 17 8-5-8-5z"></path></svg>Watch tutorial</a>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="vd-icon2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="m9 17 8-5-8-5z"></path></svg>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="vd-icon3" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"></path></svg>
                        </div>
                    </div>
                </div>
                <div className="token-creation-bar">
                    <div className="column">
                        <button className='btn-radio1'></button>
                        <div className='content'>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="radio-bar1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M21 18v1c0 1.1-.9 2-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14c1.1 0 2 .9 2 2v1h-9a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></svg>
                            <span className='span1'>connect wallet</span>
                        </div>
                    </div>
                    <div className="column">
                        <button className='btn-radio2'></button>
                        <div className='content'>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className='radio-bar2' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z"></path></svg>
                            <span className='span2'>Select blockchain</span>
                        </div>
                    </div>
                    <div className="column">
                        <button className='btn-radio3'></button>
                        <div className='content'>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className='radio-bar3' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></svg>
                            <span className='span3'>Enter token info</span>
                        </div>
                    </div>
                    <div className="column">
                        <button className='btn-radio4'></button>
                        <div className='content'>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className='radio-bar4' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15 16a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6z"></path><path d="M5 16h1V8a2 2 0 0 1 2-2h8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zm3 3a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1v8a2 2 0 0 1-2 2H8v1z"></path></svg>
                            <span className='span4'>Add features</span>
                        </div>
                    </div>
                    <div className="column">
                        <button className='btn-radio5'></button>
                        <div className='content'>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className='radio-bar5' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
                            <span className='span5'>Create contract</span>
                        </div>
                    </div>
                </div>
                <div className="select-wallet-box">
                    <div className='select-wallet'>
                        <h1>Connect wallet</h1>
                        <p>Make sure to connect the wallet that you would like to add your new
                            tokens to.</p>

                        {address &&
                            <div className="continue-hide-box">
                                <div>
                                    <img src="https://app.team.finance/_next/image?url=%2Fassets%2Fwallet%2FmetaMask%403x.png&w=96&q=75" alt="logo" />
                                </div>
                                <div>
                                    <h3>0 ETH</h3>
                                    <p>0x0e21...2a89</p>
                                </div>
                                <div className='ds-box'>
                                    <a href="#" className='a'>Disconnect</a>
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="ds-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                                </div>
                            </div>}
                        <div className="connected-wallet-hide-box">
                            <div>
                                <img alt="Icon" loading="lazy" width="16" height="16" decoding="async" data-nimg="1" src="https://app.team.finance/_next/static/media/check-circle.e19b6900.svg" />
                                <h3>Connected wallet</h3>
                            </div>
                            <div>
                                <img src="https://app.team.finance/_next/image?url=%2Fassets%2Fwallet%2FmetaMask%403x.png&w=96&q=75" width="20" height="20" alt="logo" />
                                <p>0x0e21...2a89</p>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="ds-icon2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                            </div>
                        </div>
                        <div>
                            <a href="#" onClick={() => connect()}>{address ? formatEthAddr(address) : "Select wallet"}</a>
                        </div>
                    </div>
                    <div className="popup-box">
                        <div className="popup-container">
                            <div className="top-column">
                                <h2>Connect wallet</h2>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="popup-close-icon" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
                            </div>
                            <div className="bottom-column">
                                <h3>EVM wallets</h3>
                                <div className="bottom-heading">
                                    <div>
                                        <p>Connect with an EVM wallet such as MetaMask</p>
                                        <p>WalletConect, Coinbase, ledger, and more.</p>
                                    </div>
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" color='gray' height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M10.061 19.061 17.121 12l-7.06-7.061-2.122 2.122L12.879 12l-4.94 4.939z"></path></svg>
                                </div>
                                <div className="bottom-image-box">
                                    <img alt="metamask-wallet.svg" loading="lazy" width="24" height="24" decoding="async" data-nimg="1" src="https://app.team.finance/icons/wallets/metamask-wallet.svg" />
                                    <img alt="walletconnect.svg" loading="lazy" width="24" height="24" decoding="async" data-nimg="1" src="https://app.team.finance/icons/wallets/walletconnect.svg" />
                                    <img alt="coinbase-wallet.svg" loading="lazy" width="24" height="24" decoding="async" data-nimg="1" src="https://app.team.finance/icons/wallets/coinbase-wallet.svg" />
                                    <img alt="ledger.svg" loading="lazy" width="24" height="24" decoding="async" data-nimg="1" src="https://app.team.finance/icons/wallets/ledger.svg" />
                                    <p>and more</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="select-blockchain-box">
                    <div className="select-blockchain">
                        <div className='select-box1'>
                            <div>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z"></path></svg>
                                <span>Select Blockchain</span>
                            </div>
                            <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" className='select-right-arrow' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor"></path></svg>
                        </div>
                    </div>
                    <div className="hide-blockchain1">
                        <div className="blockchain-cards">
                            <div className="cards-heading-box">
                                <h2>Select blockchain</h2>
                                <p>Choose the blockchain that you want to create your token on.</p>
                                <h3>Mainnets</h3>
                            </div>
                            <div className="cards-box-container">
                                <div className="column">
                                    <div className='cards'>
                                        <div>
                                        <img src="https://app.team.finance/icons/wizard/ethereum.svg" alt="1" />
                                        <div>
                                            <p>Ethereum</p>
                                            <span>Ethereum</span>
                                        </div>
                                        </div>
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
                                    </div>
                                    <div className='cards'>
                                        <div>
                                        <img src="https://app.team.finance/icons/wizard/ethereum.svg" alt="1" />
                                        <div>
                                            <p>X Layare</p>
                                            <span>Ethereum</span>
                                        </div>
                                        </div>
                                    </div>
                                    <div className='cards'>
                                        <div>
                                        <img src="https://app.team.finance/icons/wizard/ethereum.svg" alt="1" />
                                        <div>
                                            <p>Avalnche</p>
                                            <span>Ethereum</span>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className='cards'>
                                        <div>
                                        <img src="https://app.team.finance/icons/wizard/ethereum.svg" alt="1" />
                                        <div>
                                            <p>Ethereum</p>
                                            <span>Ethereum</span>
                                        </div>
                                        </div>
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
                                    </div>
                                    <div className='cards'>
                                        <div>
                                        <img src="https://app.team.finance/icons/wizard/ethereum.svg" alt="1" />
                                        <div>
                                            <p>Ethereum</p>
                                            <span>Ethereum</span>
                                        </div>
                                        </div>
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
                                    </div>
                                    <div className='cards'>
                                        <div>
                                        <img src="https://app.team.finance/icons/wizard/ethereum.svg" alt="1" />
                                        <div>
                                            <p>Ethereum ethicla </p>
                                            <span>Ethereum</span>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom-column-box">
                                <h3>Testnets</h3>
                                <div className="column">
                                    <div className='cards'>
                                        <div>
                                        <img src="https://app.team.finance/icons/wizard/ethereum.svg" alt="1" />
                                        <div>
                                            <p>BSC Testnet</p>
                                            <span>Ethereum</span>
                                        </div>
                                        </div>
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
                                    </div>
                                    <div className='cards'>
                                       <div>
                                       <img src="https://app.team.finance/icons/wizard/ethereum.svg" alt="1" />
                                        <div>
                                            <p>Ethereum</p>
                                            <span>Ethereum</span>
                                        </div>
                                       </div>
                                    </div>
                                    <div className='cards'>
                                        <div>
                                        <img src="https://app.team.finance/icons/wizard/ethereum.svg" alt="1" />
                                        <div>
                                            <p>Ethereum </p>
                                            <span>Ethereum</span>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='block-chain-btn'>
                                    <a href="#">Continue</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="select-blockchain">
                        <div className='select-box1'>
                            <div>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></svg>
                                <span>Enter token info</span>
                            </div>
                            <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" className='select-right-arrow' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor"></path></svg>
                        </div>
                    </div>
                    {/*  */}
                    <div className="token-info-container">
                        <h3>Enter token info</h3>
                        <p>Please provide the following information:</p>
                        <div className="token-form-column">
                            <form>
                                <div className='top-input-box'>
                                    <div>
                                        <label>Token name</label>
                                        <input type="text" name='Token name' placeholder='e.g "Team Finance"' required />
                                    </div>
                                    <div>
                                        <label>Symbol</label>
                                        <input type="text" name='Symbol' placeholder='e.g "TFC"' required/>
                                    </div>
                                </div>
                                <label>Image Token</label>
                                <div className="file-upload-area">
                                          <label  className="drop-area" title='for drag'>  Drop file her </label>
                                          <input type="file" id="file-input" accept=".jpeg,.jpg,.png" placeholder='Image Drag here' />
                                          <span>or select file</span>
                                        </div>
                                <div className="field">
                                    <label>Decimal</label>
                                    <input type="number"  name="decimals" placeholder='8-18' required />
                                </div>
                                <div className="field">
                                       <label >Initial supply </label>
                                       <input type="text"  name="initial-supply" placeholder='e.g "10 000"' required />
                                 </div>
                                <div className="field">
                                       <label >Description</label>
                                       <input type="text"  name="Description" placeholder='e.g "A Defi Yeild Farming Token"' required />
                                 </div>
                                <div className="field">
                                       <label >Website (optional)</label>
                                       <input type="text"  name="Website (optional)" placeholder='e.g "https://www.team.finance/' required />
                                 </div>
                                <div className="field">
                                       <label >Twitter (optional)</label>
                                       <input type="text"  name="Twitter (optional)" placeholder='e.g "https://twitter.team.finance/' required />
                                 </div>
                                <div className="field">
                                       <label >Telegram (optional)</label>
                                       <input type="text"  name="Telegram (optional)" placeholder='e.g "https://t.team.finance/' required />
                                 </div>
                                 <div className="form-continue-btn">
                                        <a href="#">Continue</a>
                                 </div>
                            </form>
                        </div>
                    </div>
                    <div className="select-blockchain">
                        <div className='select-box1'>
                            <div>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15 16a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6z"></path><path d="M5 16h1V8a2 2 0 0 1 2-2h8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zm3 3a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1v8a2 2 0 0 1-2 2H8v1z"></path></svg>
                                <span>Add features</span>
                            </div>
                            <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" className='select-right-arrow' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor"></path></svg>
                        </div>
                    </div>
                    <div className="select-blockchain">
                        <div className='select-box1'>
                            <div>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
                                <span>Create contract</span>
                            </div>
                            <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" className='select-right-arrow' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor"></path></svg>
                        </div>
                    </div>
                </div>

            </div>
        </ActionLayout>
    )
}


