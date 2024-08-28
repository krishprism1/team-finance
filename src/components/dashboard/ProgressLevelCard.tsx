import React from 'react'

const ProgressLevelCard = () => {
    return (
        <div className="securty-level-bar-container">
            <div className="level-bar-column">
                <svg className="CircularProgressbar " viewBox="0 0 100 100" data-test-id="CircularProgressbar"><path className="circle-path" d=" M 50,50 m 0,-46 a 46,46 0 1 1 0,92 a 46,46 0 1 1 0,-92" stroke-width="8" fill-opacity="0"></path><path className="circle-path2" d="  M 50,50 m 0,-46 a 46,46 0 1 1 0,92 a 46,46 0 1 1 0,-92" stroke-width="8" fill-opacity="0"></path>
                </svg>
                <p className="percent-text">80%</p>
            </div>
            <div className="level-heading-column">
                <div className="first-box1">
                    <div>
                        <h3>Security Level</h3>
                        <span>Intermediate<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="rocket-svg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20.92 2.38A15.72 15.72 0 0 0 17.5 2a8.26 8.26 0 0 0-6 2.06Q9.89 5.67 8.31 7.27c-1.21-.13-4.08-.2-6 1.74a1 1 0 0 0 0 1.41l11.3 11.32a1 1 0 0 0 1.41 0c1.95-2 1.89-4.82 1.77-6l3.21-3.2c3.19-3.19 1.74-9.18 1.68-9.43a1 1 0 0 0-.76-.73zm-2.36 8.75L15 14.67a1 1 0 0 0-.27.9 6.81 6.81 0 0 1-.54 3.94L4.52 9.82a6.67 6.67 0 0 1 4-.5A1 1 0 0 0 9.39 9s1.4-1.45 3.51-3.56A6.61 6.61 0 0 1 17.5 4a14.51 14.51 0 0 1 2.33.2c.24 1.43.62 5.04-1.27 6.93z"></path><circle cx="15.73" cy="8.3" r="2"></circle><path d="M5 16c-2 1-2 5-2 5a7.81 7.81 0 0 0 5-2z"></path></svg></span>
                    </div>
                    <p className="circle-heading-top">You have made it. Nice job!</p>
                </div>
                <div className="second-box2">
                    <div className="small-box">
                        <div className="row11"><div className="done-arrow"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg></div>
                            <p>Token vesting</p></div>
                        <div className="row22"><div className="done-arrow"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg></div>
                            <p>Team token locks</p></div>
                        <div className="row33"><div className="done-arrow"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg></div>
                            <p>Token creation</p></div>
                    </div>
                    <div className="small-box">
                        <div className="liquid-locks-box1">
                            <p>Liquidity Locks</p>
                            <div>
                                <a href="#">Explore <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path></svg></a>
                            </div>
                        </div>
                        <div className="row33"><div className="done-arrow"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg></div>
                            <p>NFT locks</p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgressLevelCard
