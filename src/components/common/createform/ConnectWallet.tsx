import React from 'react'
import { useAccount, useBalance } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { formatEthAddr } from '@/utils/math.utils'
import useFormStore from '@/store/stepStore'


const ConnectWallet = () => {
    const { step, setStep } = useFormStore();
    const { address } = useAccount()
    const { open } = useWeb3Modal()
    const connect = async () => {
        await open()
    }
    const { data, isError, isLoading } = useBalance({
        address
    });

    let _balance = data?.formatted;
    return (
        <div className="select-wallet-box">
            {step == 0 && (
                <div className='select-wallet'>
                    <h1>Connect wallet</h1>
                    <p>Make sure to connect the wallet that you would like to add your new
                        tokens to.</p>

                    {address ? <>
                        <div className="continue-hide-box">
                            <div>
                                <img src="https://app.team.finance/_next/image?url=%2Fassets%2Fwallet%2FmetaMask%403x.png&w=96&q=75" alt="logo" />
                            </div>
                            <div>
                                <h3>{_balance ? parseFloat(_balance).toFixed(3) : 0} {data?.symbol}</h3>
                                <p>{address ? formatEthAddr(address) : ""}</p>
                            </div>
                            <div className='ds-box'>
                                <a href="#" className='a' onClick={() => connect()}>Disconnect</a>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="ds-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                            </div>
                        </div>
                        <div className='block-chain-btn'>
                            <a href="#" onClick={() => setStep(step + 1)}>Continue</a>
                        </div>
                    </> :
                        <div>
                            <a href="#" onClick={() => connect()}>Select wallet</a>
                        </div>
                    }

                </div>
            )}

            {step > 0 && (
                <div className="connected-wallet-hide-box" onClick={() => setStep(0)}>
                    <div>
                        <img alt="Icon" loading="lazy" width="16" height="16" decoding="async" data-nimg="1" src="https://app.team.finance/_next/static/media/check-circle.e19b6900.svg" />
                        <h3>Connected wallet</h3>
                    </div>
                    <div>
                        <img src="https://app.team.finance/_next/image?url=%2Fassets%2Fwallet%2FmetaMask%403x.png&w=96&q=75" width="20" height="20" alt="logo" />
                        <p>{address ? formatEthAddr(address) : ""}</p>
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="ds-icon2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                    </div>
                </div>
            )}


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


    )
}

export default ConnectWallet
