import useFormStore from '@/store/stepStore';
import { _chains } from '@/utils/constant.utils';
import React, { useEffect, useState } from 'react'
import Tick from "/public/form/tick.svg"
import { toast } from 'react-toastify'
import { useChainId, useSwitchChain } from 'wagmi';
import VIcon from "/public/form/v.svg"

interface SwitchInfo {
    networkType: string;
    index: number;
    chain: number;
}
const SelectNetwork = () => {
    const { step, setStep } = useFormStore();
    const [network, setNetwork] = useState({ ..._chains });
    const { switchChain } = useSwitchChain();
    const [switchInfo, setSwitchInfo] = useState<SwitchInfo>();

    const chainId = useChainId()

    const selectNet = async (e: any, type: string, index: number, chain: number) => {
        e.preventDefault()
        switchChain({ chainId: chain })
        setSwitchInfo({
            networkType: type,
            index: index,
            chain: chain
        })
    }

    const ifSwitched = () => {
        const updatedNetwork = { ...network };
        if (switchInfo?.networkType === "test") {
            updatedNetwork.testnet = updatedNetwork.testnet.map((item, i) =>
                i === switchInfo.index ? { ...item, status: !item.status } : item
            );
            updatedNetwork.mainnet = updatedNetwork.mainnet.map((item) => ({
                ...item,
                status: false
            }));
        } else {
            updatedNetwork.mainnet = updatedNetwork.mainnet.map((item, i) =>
                i === switchInfo?.index ? { ...item, status: !item.status } : item
            );
            updatedNetwork.testnet = updatedNetwork.testnet.map((item) => ({
                ...item,
                status: false
            }));
        }
        setNetwork(updatedNetwork);
    }

    const handleNext = () => {
        const status = network.mainnet.some(item => item.status) || network.testnet.some(item => item.status);
        if (!status) return toast.error("please select Network!")
        setStep(step + 1)
    }

    useEffect(() => {
        if (chainId === switchInfo?.chain) {
            ifSwitched()
        }
    }, [chainId, switchInfo])
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
                            <VIcon width="24" height="24" fill="currentColor" />
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
                                {network && network.mainnet.map((item: any, index: number) => (
                                    <div className='cards' onClick={(e) => selectNet(e, "main", index, item.chainId)}>
                                        <div>
                                            <img src={item.logo} alt="1" />
                                            <div>
                                                <p>{item.name}</p>
                                                <span>{item.chain}</span>
                                            </div>
                                        </div>
                                        {item.status && <Tick width="24" height="24" fill="currentColor" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bottom-column-box">
                            <h3>Testnets</h3>
                            <div className="column">
                                {network && network.testnet.map((item: any, index: number) => (
                                    <div className='cards' onClick={(e) => selectNet(e, "test", index, item.chainId)}>
                                        <div>
                                            <img src={item.logo} alt="1" />
                                            <div>
                                                <p>{item.name}</p>
                                                <span>{item.chain}</span>
                                            </div>
                                        </div>
                                        {item.status && <Tick width="24" height="24" fill="currentColor" />}
                                    </div>
                                ))}
                            </div>
                            <div className='block-chain-btn'>
                                <a href="#" onClick={handleNext}>Continue</a>
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
                        <VIcon width="20" height="20" fill="currentColor" />
                    </div>
                </div>
            )}

        </>
    )
}

export default SelectNetwork
