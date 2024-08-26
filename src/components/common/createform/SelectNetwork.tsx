import useFormStore from '@/store/stepStore';
import React, { useState } from 'react'
import Tick from "/public/form/tick.svg"

const SelectNetwork = () => {
    const { step, setStep } = useFormStore();
    const [isSelectedMain, setIsSelectedMain] = useState(false)
    const [isSelectedTest, setIsSelectedTest] = useState(false)

    const selectNet = (e: any, type: string) => {
        e.preventDefault()
        if (type === "test") {
            setIsSelectedTest(true)
        } else {
            setIsSelectedMain(true)
        }
    }

    return (
        <>
            {
                step < 1 && (
                    <div className="select-blockchain">
                        <div className='select-box1'>
                            <div>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z"></path></svg>
                                <span>Select Blockchain</span>
                            </div>
                            <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" className='select-right-arrow' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor"></path></svg>
                        </div>
                    </div>)
            }

            {step == 1 && (
                <div className="hide-blockchain1">
                    <div className="blockchain-cards">
                        <div className="cards-heading-box">
                            <h2>Select blockchain</h2>
                            <p>Choose the blockchain that you want to create your token on.</p>
                            <h3>Mainnets</h3>
                        </div>
                        <div className="cards-box-container">
                            <div className="column">
                                <div className='cards' onClick={(e) => selectNet(e, "main")}>
                                    <div>
                                        <img src="https://app.team.finance/icons/wizard/binance.svg" alt="1" />
                                        <div>
                                            <p>BSC Mainnet</p>
                                            <span>Binance</span>
                                        </div>
                                    </div>
                                    {isSelectedMain && <Tick width="24" height="24" fill="currentColor" />}
                                </div>
                            </div>
                        </div>
                        <div className="bottom-column-box">
                            <h3>Testnets</h3>
                            <div className="column">
                                <div className='cards' onClick={(e) => selectNet(e, "test")}>
                                    <div>
                                        <img src="https://app.team.finance/icons/wizard/binance.svg" alt="1" />
                                        <div>
                                            <p>BSC Testnet</p>
                                            <span>Binance</span>
                                        </div>
                                    </div>
                                    {isSelectedTest && <Tick width="24" height="24" fill="currentColor" />}
                                </div>
                            </div>
                            <div className='block-chain-btn'>
                                <a href="#" onClick={() => setStep(step + 1)}>Continue</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {step > 1 && (
                <div className="select-blockchain-connected-small-box" onClick={() => setStep(1)}>
                    <div>
                        <img alt="Icon" loading="lazy" width="16" height="16" decoding="async" data-nimg="1" src="https://app.team.finance/_next/static/media/check-circle.e19b6900.svg" />
                        <p>Select blockchain</p>
                    </div>
                    <div>
                        <p>Ethereum</p>
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="ds-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                    </div>
                </div>
            )}

        </>
    )
}

export default SelectNetwork
