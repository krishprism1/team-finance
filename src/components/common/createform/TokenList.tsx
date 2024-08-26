import React from 'react';

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
                                required
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
                                                <svg
                                                    className='done-arrow done-arrow2-2'
                                                    stroke="blue"
                                                    fill="blue"
                                                    strokeWidth="0"
                                                    viewBox="0 0 24 24"
                                                    height="1.2em"
                                                    width="1.2em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
                                                </svg>
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
                    <div className="form-continue-btn" onClick={() => setStep(3)}>
                        <button type="submit">Continue</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TokenList;
