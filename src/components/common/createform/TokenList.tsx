import React from 'react';
import { toast } from 'react-toastify';
import Tick from "/public/form/tick.svg"

interface TokenInfo {
    symbol: string;
    name: string;
    balance: number;
    token: string;
}

interface TokenListProps {
    selectedToken: TokenInfo | null | undefined;
    tokenInfo: TokenInfo[];
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectToken: (item: TokenInfo) => void;
    setStep: (step: number) => void;
}

const TokenList: React.FC<TokenListProps> = ({
    selectedToken,
    tokenInfo,
    handleChange,
    selectToken,
    setStep,
}) => {

    const handleNext = () => {
        if (selectedToken?.token) {
            setStep(3)
        }else {
            return toast.error("please select a token!")
        }
    }
    return (
        <div className="token-info-container">
            <h3>Enter token address</h3>
            <p className="token-address-p">
                Enter the token address for the token you are sending, or select from the tokens listed below from your wallet.
            </p>
            <div className="token-form-column">
                <form>
                    <div className="top-input-box">
                        <div className='div1-1'>
                            <label className="heading-of-token-address">Token address</label>
                            <input
                                type="text"
                                name="selectedToken"
                                value={selectedToken?.token || ''}
                                onChange={handleChange}
                                placeholder="Enter address...."
                                className="token-address-input"
                            />
                        </div>
                    </div>
                    <label className="heading-of-token-address">
                        e.g. 0xCC4304A31d09258b0029eA7FE63d032f52e44EFe
                    </label>
                    <div className="token-info-box">
                        <div className='token-info-box-container'>
                            {tokenInfo &&
                                tokenInfo.map((item, index) => (
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
                                                <p>{item.balance}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {selectedToken && (
                            <div className="token-details-box2">
                                <div className="info-colum11">
                                    <div>
                                        <h4>Token</h4>
                                    </div>
                                    <div>
                                        <p>
                                            <img src="https://app.team.finance/tokens/ethereum-token.webp" alt="Token Logo" />
                                            {selectedToken?.symbol}
                                        </p>
                                    </div>
                                </div>
                                <div className="info-colum11">
                                    <div>
                                        <h4>Balance</h4>
                                    </div>
                                    <div>
                                        <p>{selectedToken?.balance}</p>
                                    </div>
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

export default TokenList;
