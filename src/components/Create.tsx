import React from 'react'
import Link from 'next/link'
import "../styles/tokenCreation.css"

interface CreateProps {
    title: string;
    subtitle: string;
    desc: string;
    btnName: string;
    route: string;
}

const Create: React.FC<CreateProps> = (props) => {
    return (
        <div>
            <div className='token-creation-home-page'>
                <div className="token-creation-content-box">
                    <h2>{props.title}</h2>
                    <div className="creat-token-box">
                        <div className='logo-box1'>
                            <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_3278_335832)"><path d="M42 70C40.743 70 39.6902 69.5758 38.8418 68.7273C37.9933 67.8788 37.569 66.826 37.569 65.569V46.431H18.431C17.174 46.431 16.1212 46.0067 15.2727 45.1583C14.4242 44.3098 14 43.257 14 42C14 40.743 14.4242 39.6902 15.2727 38.8418C16.1212 37.9933 17.174 37.569 18.431 37.569H37.569V18.431C37.569 17.174 37.9933 16.1212 38.8418 15.2727C39.6902 14.4242 40.743 14 42 14C43.257 14 44.3098 14.4242 45.1583 15.2727C46.0067 16.1212 46.431 17.174 46.431 18.431V37.569H65.569C66.826 37.569 67.8788 37.9933 68.7273 38.8418C69.5758 39.6902 70 40.743 70 42C70 43.257 69.5758 44.3098 68.7273 45.1583C67.8788 46.0067 66.826 46.431 65.569 46.431H46.431V65.569C46.431 66.826 46.0067 67.8788 45.1583 68.7273C44.3098 69.5758 43.257 70 42 70Z" fill="url(#paint0_linear_3278_335832)"></path></g><defs><filter id="filter0_d_3278_335832" x="0" y="0" width="88" height="88" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dx="2" dy="2"></feOffset><feGaussianBlur stdDeviation="8"></feGaussianBlur><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0.0802605 0 0 0 0 0.383156 0 0 0 0 0.8375 0 0 0 0.25 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3278_335832"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3278_335832" result="shape"></feBlend></filter><linearGradient id="paint0_linear_3278_335832" x1="14" y1="14" x2="80.4052" y2="51.6458" gradientUnits="userSpaceOnUse"><stop stop-color="#83DAFF"></stop><stop offset="1" stop-color="#577CFF"></stop></linearGradient></defs></svg>
                        </div>
                        <div className="logo-heading">
                            <h3>{props.subtitle}</h3>
                            <p>{props.desc}</p>
                        </div>
                        <div className="creat-token-links">
                            <div>
                                <Link href={props.route}>{props.btnName}<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="token-icon" xmlns="http://www.w3.org/2000/svg"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></Link>
                            </div>
                            <p>Takes about 5 minutes</p>
                        </div>
                    </div>
                    <div className="token-information-box">
                        <div className="box1">
                            <div className='help-heading'>
                                <h3>Why can’t I see my token?</h3><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="up-down-arrow" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
                            </div>
                            <div className='help-praragraph1'>
                                <p>Connect your wallet to see any created tokens associated with your wallet address. If you still can’t see your token, make sure to check whether you have the correct wallet address connected. From time to time, there may also be a small time delay between creating your token and it appearing in the Team Finance dashboard.</p>
                                <p>If none of the above options work, make sure to contact us on <a href="#">Telegram</a>.</p>
                            </div>
                        </div>
                        <div className="box1">
                            <div className='help-heading'>
                                <h3>Is an audit report generated for minted tokens?
                                </h3><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="up-down-arrow" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
                            </div>
                            <div className='help-praragraph2'>
                                <p>Yes, you can download the Audit report by clicking on the desired minted token on the “My Mints” webpage.</p>
                            </div>
                        </div>
                        <div className="box1">
                            <div className='help-heading'>
                                <h3>Where can I learn more about token creation?
                                </h3><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="up-down-arrow" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
                            </div>
                            <div className='help-praragraph3'>
                                <p>Check out <a href="#">our docs</a> and the <a href="#">Team Finance website</a> for more info.</p>
                            </div>
                        </div>
                        <div className='box2'>
                            <a href="#">Read more on Docs<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="token-icon" xmlns="http://www.w3.org/2000/svg"><path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path><path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path></svg></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create
