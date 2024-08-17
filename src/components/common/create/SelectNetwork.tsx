import React from 'react'

const SelectNetwork = () => {
    return (
        <>
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
        </>
    )
}

export default SelectNetwork
