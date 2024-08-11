import ActionLayout from '@/containers/ActionLayout'
import React from 'react'
import "../../styles/mint.css"

export default function Mint() {
    return (
        <ActionLayout>
            <div className="creat-token-container">
                <div className="back-home-box">
                    <div className='image-container'>
                        <img src="https://app.team.finance/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-header.43749e9b.png&w=384&q=75" alt="" />
                        <a href="#"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="left-icon" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path></svg>
                            <span>Back to home page</span></a>
                    </div>
                </div>
                <div className="creat-token-column">
                    <div className="content1">
                        <h1>Create token</h1>
                        <a href="#"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="vd-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="m9 17 8-5-8-5z"></path></svg>watch tutorial</a>
                    </div>
                </div>

            </div>
        </ActionLayout>
    )
}


