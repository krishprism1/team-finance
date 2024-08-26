import React from 'react'



const RecentTokenCard = () => {
    return (
        <div className="recently-history-container">
            <div className="recently-history-column1">
                <h3>Recently created tokens</h3>
                <div className="history-box">
                    <div className="history-small-box1">
                        <img src="https://storage.googleapis.com/mint-token-images/1720458330489-D_VeLpoWwAAC2Go.jpg" alt="1" />
                        <div>
                            <h5>CDS</h5>
                            <p>Candes</p>
                        </div>
                    </div>
                    <div className="history-small-box2">
                        <div>
                            <p>Total supply</p>
                            <span>10000 CDS</span>
                        </div>
                        <img src="https://app.team.finance/icons/wizard/binance.svg" alt="l" />
                    </div>
                </div>
            </div>
            <div className="recently-history-column2">
                <a href="#">Manage created token<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="links-right-arrows" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg></a>
            </div>
        </div>
    )
}

export default RecentTokenCard
