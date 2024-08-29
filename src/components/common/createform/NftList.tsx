import React from 'react';
import { toast } from 'react-toastify';
import Tick from "/public/form/tick.svg"

type NftInfo = {
    token: string;
    name: string;
    symbol: string;
    tokenId: string;
    nftType: string;
};

interface NftListProps {
    selectedToken: NftInfo | null | undefined;
    nftInfo: NftInfo[];
    selectToken: (item: NftInfo) => void;
    setStep: (step: number) => void;
}

const NftList: React.FC<NftListProps> = ({
    selectedToken,
    nftInfo,
    selectToken,
    setStep,
}) => {

    const handleNext = () => {
        if (selectedToken?.token) {
            setStep(3)
        } else {
            return toast.error("please select a NFT!")
        }
    }
    return (
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
                                placeholder='Enter address'
                                className='token-address-input'
                                value={selectedToken?.token}
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
                                placeholder='Enter token ID'
                                className='token-address-input'
                                value={selectedToken?.tokenId}
                                required
                            />
                        </div>
                    </div>
                    <div className="token-info-box">
                        <div className='token-info-box-container'>
                            {nftInfo &&
                                nftInfo.map((item, index) => (
                                    <div
                                        className="token-details-box1"
                                        key={index}
                                        onClick={() => selectToken(item)}
                                    >
                                        <img src="https://app.team.finance/tokens/ethereum-token.webp" alt="Token Logo" />
                                        <div>
                                            <div className="small-info-box">
                                                <p>{item.symbol}</p>
                                                {selectedToken?.token == item.token && <Tick width="24" height="24" fill="currentColor" />}
                                            </div>
                                            <div className="small-info-box2">
                                                <span>{item.name}</span>
                                                <p>{item.tokenId}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {selectedToken && (
                            <div className="nft-token-id-box2">
                                <div>
                                    <p>Name</p>
                                    <span><img src="https://app.team.finance/tokens/bsc-token.webp" width="30" height="30" alt="l" />{selectedToken.name}</span>
                                </div>
                                <div>
                                    <p>Symbol</p>
                                    <span>{selectedToken.symbol}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="form-continue-btn" onClick={handleNext}>
                        <button type="submit">Continue</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NftList;
