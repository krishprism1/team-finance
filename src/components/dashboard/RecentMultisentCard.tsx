import React from 'react'


interface RecentMultisentCardProps {
    tokenLogo: string;
    symbol: string;
    amount: number;
    recipients: number;
}

const RecentMultisentCard: React.FC<RecentMultisentCardProps> = (props) => {
    return (
        <div className="recently-history-container">
            <div className="recently-history-column1">
                <h3>Recently multisent tokens</h3>
                <div className="history-box">
                    <div className="history-small-box1">
                        <div>
                            <p>Total amount</p>
                            <span><img src="https://app.team.finance/tokens/bsc-token.webp" alt="1" id="hs-first-imgae" /> {props.amount} {props.symbol}</span>
                        </div>
                    </div>
                    <div className="history-small-box2">
                        <div>
                            <p>Total recipients</p>
                            <span>{props.recipients}</span>
                        </div>
                        <img src="https://app.team.finance/icons/wizard/binance.svg" alt="l" />
                    </div>
                </div>
            </div>
            <div className="recently-history-column2">
                <a href="#">View sent token<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="links-right-arrows" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg></a>
            </div>
        </div>
    )
}

export default RecentMultisentCard
