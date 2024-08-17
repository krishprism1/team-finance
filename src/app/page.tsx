"use client"
import DashboardLayout from "@/containers/DashboardLayout";
import "../styles/Dashboard.css"

export default function Home() {
  return (
    <>
      <DashboardLayout>
        <div className="dashboard-home-page">
          <div className="dashboard-container">
            <div className="heading">
              <h2>Dashboard</h2>
            </div>
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
                      <p>You've made it. Nice job!</p>
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
                              <a href="#">Explore <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"  height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path></svg></a>
                            </div>
                        </div>
                        <div className="row33"><div className="done-arrow"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg></div>
                          <p>NFT locks</p></div>
                      </div>
                    </div>
              </div>
            </div>
            <div className="admin-token-vesting-container">
              <div className="token-vesting-column1">
                <h3>Admin token vestings</h3>
                <div className="token-section1">
                   <div className="svg-div">
                      <svg>
                       <path cx="56" cy="56" name="In progress" stroke="#37298D" fill="#37298D" focusable="false"  d="M 107,56 A 51,51,0, 1,0, 106.99999999223226,56.00089011791847 L 88.99999999497382,56.00057595865313 A 33,33,0, 1,1, 89,56 Z" role="img" ></path>
                     </svg>
                  </div>
                    <div>
                      <p>In progress</p>
                      <span>1</span>
                      <p>Upcoming</p>
                      <span>0</span>
                    </div>
                    <div>
                      <p>Ended</p>
                      <span>0</span>
                    </div>
                </div>
              </div>
              <div className="token-vesting-column2">
                <a href="#">Manage vesting contracts <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="links-right-arrows" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg></a>
                  <h4>Available vestings</h4>
                <div className="token-section2">
                  <div>
                    <p>wallet</p>
                    <span>0x6E61...5B38</span>
                  </div>
                  <div>
                    <p>Allocation</p>
                    <span>1000 CDS</span>
                  </div>
                  <div>
                  <p>Start date</p>
                  <span>10 Aug 2024</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="admin-token-vesting-container">
              <div className="token-vesting-column1">
                <h3>Team token locks</h3>
                <div className="token-section1">
                   <div className="svg-div">
                      <svg>
                       <path cx="56" cy="56" name="In progress" stroke="#8acbf0" fill="#8acbf0" focusable="false"  d="M 107,56 A 51,51,0, 1,0, 106.99999999223226,56.00089011791847 L 88.99999999497382,56.00057595865313 A 33,33,0, 1,1, 89,56 Z" role="img" ></path>
                     </svg>
                  </div>
                    <div>
                      <p>Locked</p>
                      <span>1</span>
                    </div>
                    <div>
                      <p>Unlocked</p>
                      <span>1</span>
                    </div>
                </div>
              </div>
              <div className="token-vesting-column2">
                <a href="#">Manage Team token locks<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="links-right-arrows" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg></a>
                  <h4>Available Locks</h4>
                <div className="token-section2">
                  <div>
                    <p>Asset</p>
                    <span><img src="https://storage.googleapis.com/mint-token-images/1720458330489-D_VeLpoWwAAC2Go.jpg" alt="logo" />CDS</span>
                  </div>
                  <div>
                    <p>Amount</p>
                    <span>1000</span>
                  </div>
                  <div>
                  <p>Unlock date</p>
                  <span>10 Aug 2024</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="admin-token-vesting-container">
              <div className="token-vesting-column1">
                <h3>NFT locks</h3>
                <div className="token-section1">
                   <div className="svg-div">
                      <svg>
                       <path cx="56" cy="56" name="In progress" stroke="#8acbf0" fill="#8acbf0" focusable="false"  d="M 107,56 A 51,51,0, 1,0, 106.99999999223226,56.00089011791847 L 88.99999999497382,56.00057595865313 A 33,33,0, 1,1, 89,56 Z" role="img" ></path>
                     </svg>
                  </div>
                    <div>
                      <p>Locked</p>
                      <span>0</span>
                    </div>
                    <div>
                      <p>Unlocked</p>
                      <span>1</span>
                    </div>
                </div>
              </div>
              <div className="token-vesting-column2">
                <a href="#">Manage NFT locks<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="links-right-arrows" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg></a>
                  <h4>Available Locks</h4>
                <div className="token-section2">
                  <div>
                    <p>Asset</p>
                    <span><img src="https://app.team.finance/tokens/bsc-token.webp"  alt="logo" />MTK</span>
                  </div>
                  <div>
                  <p>Unlock date</p>
                  <span>10 Aug 2024</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="column1">
              <div>
                <img src="https://app.team.finance/_next/static/media/wallet-ringed.9d5742db.svg" alt="Description" />
              </div>
              <div>
                <h3>See what&apos;s under the hood</h3>
                <p>Connect your wallet to see all services and check your contracts.</p>
              </div>
            </div>
            <div className="column2">
              <div className="content">
                <div>
                  <h3>Token Creation</h3>
                  <p>Create your own fully-audited token in 5 minutes with no
                    programming experience.</p>
                </div>
                <div className="circle1">
                  <div className="circle2">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="logo1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5.559 8.855c.166 1.183.789 3.207 3.087 4.079C11 13.829 11 14.534 11 15v.163c-1.44.434-2.5 1.757-2.5 3.337 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-1.58-1.06-2.903-2.5-3.337V15c0-.466 0-1.171 2.354-2.065 2.298-.872 2.921-2.896 3.087-4.079C19.912 8.441 21 7.102 21 5.5 21 3.57 19.43 2 17.5 2S14 3.57 14 5.5c0 1.552 1.022 2.855 2.424 3.313-.146.735-.565 1.791-1.778 2.252-1.192.452-2.053.953-2.646 1.536-.593-.583-1.453-1.084-2.646-1.536-1.213-.461-1.633-1.517-1.778-2.252C8.978 8.355 10 7.052 10 5.5 10 3.57 8.43 2 6.5 2S3 3.57 3 5.5c0 1.602 1.088 2.941 2.559 3.355zM17.5 4c.827 0 1.5.673 1.5 1.5S18.327 7 17.5 7 16 6.327 16 5.5 16.673 4 17.5 4zm-4 14.5c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5.673-1.5 1.5-1.5 1.5.673 1.5 1.5zM6.5 4C7.327 4 8 4.673 8 5.5S7.327 7 6.5 7 5 6.327 5 5.5 5.673 4 6.5 4z"></path></svg>
                  </div>
                </div>
              </div>
              <div className="links">
                <div><a href="#">Create audited token<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="arrow-right" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path></svg></a></div>
                <div><a href="#">More info <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="arrow-right2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path><path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path></svg></a></div>
              </div>
            </div>
            <div className="column2">
              <div className="content">
                <div>
                  <h3>Token Vesting</h3>
                  <p>Let your investors, advisors and employees get paid automatically,
                    without you having to lift a finger.</p>
                </div>
                <div className="circle1">
                  <div className="circle2">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="logo1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5.559 8.855c.166 1.183.789 3.207 3.087 4.079C11 13.829 11 14.534 11 15v.163c-1.44.434-2.5 1.757-2.5 3.337 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-1.58-1.06-2.903-2.5-3.337V15c0-.466 0-1.171 2.354-2.065 2.298-.872 2.921-2.896 3.087-4.079C19.912 8.441 21 7.102 21 5.5 21 3.57 19.43 2 17.5 2S14 3.57 14 5.5c0 1.552 1.022 2.855 2.424 3.313-.146.735-.565 1.791-1.778 2.252-1.192.452-2.053.953-2.646 1.536-.593-.583-1.453-1.084-2.646-1.536-1.213-.461-1.633-1.517-1.778-2.252C8.978 8.355 10 7.052 10 5.5 10 3.57 8.43 2 6.5 2S3 3.57 3 5.5c0 1.602 1.088 2.941 2.559 3.355zM17.5 4c.827 0 1.5.673 1.5 1.5S18.327 7 17.5 7 16 6.327 16 5.5 16.673 4 17.5 4zm-4 14.5c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5.673-1.5 1.5-1.5 1.5.673 1.5 1.5zM6.5 4C7.327 4 8 4.673 8 5.5S7.327 7 6.5 7 5 6.327 5 5.5 5.673 4 6.5 4z"></path></svg>
                  </div>
                </div>
              </div>
              <div className="links">
                <div><a href="#">Create vesting<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="arrow-right" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path></svg></a></div>
                <div><a href="#">More info <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="arrow-right2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path><path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path></svg></a></div>
              </div>
            </div>
            <div className="column2">
              <div className="content">
                <div>
                  <h3>Team Token Locks</h3>
                  <p>Improve security and build trust in your token by locking your team
                    Tokens.</p>
                </div>
                <div className="circle1">
                  <div className="circle2">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="logo1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5.559 8.855c.166 1.183.789 3.207 3.087 4.079C11 13.829 11 14.534 11 15v.163c-1.44.434-2.5 1.757-2.5 3.337 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-1.58-1.06-2.903-2.5-3.337V15c0-.466 0-1.171 2.354-2.065 2.298-.872 2.921-2.896 3.087-4.079C19.912 8.441 21 7.102 21 5.5 21 3.57 19.43 2 17.5 2S14 3.57 14 5.5c0 1.552 1.022 2.855 2.424 3.313-.146.735-.565 1.791-1.778 2.252-1.192.452-2.053.953-2.646 1.536-.593-.583-1.453-1.084-2.646-1.536-1.213-.461-1.633-1.517-1.778-2.252C8.978 8.355 10 7.052 10 5.5 10 3.57 8.43 2 6.5 2S3 3.57 3 5.5c0 1.602 1.088 2.941 2.559 3.355zM17.5 4c.827 0 1.5.673 1.5 1.5S18.327 7 17.5 7 16 6.327 16 5.5 16.673 4 17.5 4zm-4 14.5c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5.673-1.5 1.5-1.5 1.5.673 1.5 1.5zM6.5 4C7.327 4 8 4.673 8 5.5S7.327 7 6.5 7 5 6.327 5 5.5 5.673 4 6.5 4z"></path></svg>
                  </div>
                </div>
              </div>
              <div className="links">
                <div><a href="#">Create Team token lock<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="arrow-right" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path></svg></a></div>
                <div><a href="#">More info <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="arrow-right2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path><path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path></svg></a></div>
              </div>
            </div>
            <div className="column2">
              <div className="content">
                <div>
                  <h3>NFT Locks</h3>
                  <p>Lock your NFTs to showcase your confidence in the collection.</p>
                </div>
                <div className="circle1">
                  <div className="circle2">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="logo1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5.559 8.855c.166 1.183.789 3.207 3.087 4.079C11 13.829 11 14.534 11 15v.163c-1.44.434-2.5 1.757-2.5 3.337 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-1.58-1.06-2.903-2.5-3.337V15c0-.466 0-1.171 2.354-2.065 2.298-.872 2.921-2.896 3.087-4.079C19.912 8.441 21 7.102 21 5.5 21 3.57 19.43 2 17.5 2S14 3.57 14 5.5c0 1.552 1.022 2.855 2.424 3.313-.146.735-.565 1.791-1.778 2.252-1.192.452-2.053.953-2.646 1.536-.593-.583-1.453-1.084-2.646-1.536-1.213-.461-1.633-1.517-1.778-2.252C8.978 8.355 10 7.052 10 5.5 10 3.57 8.43 2 6.5 2S3 3.57 3 5.5c0 1.602 1.088 2.941 2.559 3.355zM17.5 4c.827 0 1.5.673 1.5 1.5S18.327 7 17.5 7 16 6.327 16 5.5 16.673 4 17.5 4zm-4 14.5c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5.673-1.5 1.5-1.5 1.5.673 1.5 1.5zM6.5 4C7.327 4 8 4.673 8 5.5S7.327 7 6.5 7 5 6.327 5 5.5 5.673 4 6.5 4z"></path></svg>
                  </div>
                </div>
              </div>
              <div className="links">
                <div><a href="#">Create NFT lock<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="arrow-right" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path></svg></a></div>
                <div><a href="#">More info <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="arrow-right2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path><path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path></svg></a></div>
              </div>
            </div>
            <div className="column2">
              <div className="content">
                <div>
                  <h3>Liquidity Locks</h3>
                  <p>Prevent rug pulls and increase community trust by locking LP
                    tokens.</p>
                </div>
                <div className="circle1">
                  <div className="circle2">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="logo1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5.559 8.855c.166 1.183.789 3.207 3.087 4.079C11 13.829 11 14.534 11 15v.163c-1.44.434-2.5 1.757-2.5 3.337 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-1.58-1.06-2.903-2.5-3.337V15c0-.466 0-1.171 2.354-2.065 2.298-.872 2.921-2.896 3.087-4.079C19.912 8.441 21 7.102 21 5.5 21 3.57 19.43 2 17.5 2S14 3.57 14 5.5c0 1.552 1.022 2.855 2.424 3.313-.146.735-.565 1.791-1.778 2.252-1.192.452-2.053.953-2.646 1.536-.593-.583-1.453-1.084-2.646-1.536-1.213-.461-1.633-1.517-1.778-2.252C8.978 8.355 10 7.052 10 5.5 10 3.57 8.43 2 6.5 2S3 3.57 3 5.5c0 1.602 1.088 2.941 2.559 3.355zM17.5 4c.827 0 1.5.673 1.5 1.5S18.327 7 17.5 7 16 6.327 16 5.5 16.673 4 17.5 4zm-4 14.5c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5.673-1.5 1.5-1.5 1.5.673 1.5 1.5zM6.5 4C7.327 4 8 4.673 8 5.5S7.327 7 6.5 7 5 6.327 5 5.5 5.673 4 6.5 4z"></path></svg>
                  </div>
                </div>
              </div>
              <div className="links">
                <div><a href="#">Create Liquidity lock<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="arrow-right" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path></svg></a></div>
                <div><a href="#">More info <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="arrow-right2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path><path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path></svg></a></div>
              </div>
            </div>
            <div className="column2">
              <div className="content">
                <div>
                  <h3>Staking</h3>
                  <p>Create a staking pool in seconds. Better rewards and tokenomics,
                    without the hassle.</p>
                </div>
                <div className="circle1">
                  <div className="circle2">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="logo1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5.559 8.855c.166 1.183.789 3.207 3.087 4.079C11 13.829 11 14.534 11 15v.163c-1.44.434-2.5 1.757-2.5 3.337 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-1.58-1.06-2.903-2.5-3.337V15c0-.466 0-1.171 2.354-2.065 2.298-.872 2.921-2.896 3.087-4.079C19.912 8.441 21 7.102 21 5.5 21 3.57 19.43 2 17.5 2S14 3.57 14 5.5c0 1.552 1.022 2.855 2.424 3.313-.146.735-.565 1.791-1.778 2.252-1.192.452-2.053.953-2.646 1.536-.593-.583-1.453-1.084-2.646-1.536-1.213-.461-1.633-1.517-1.778-2.252C8.978 8.355 10 7.052 10 5.5 10 3.57 8.43 2 6.5 2S3 3.57 3 5.5c0 1.602 1.088 2.941 2.559 3.355zM17.5 4c.827 0 1.5.673 1.5 1.5S18.327 7 17.5 7 16 6.327 16 5.5 16.673 4 17.5 4zm-4 14.5c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5.673-1.5 1.5-1.5 1.5.673 1.5 1.5zM6.5 4C7.327 4 8 4.673 8 5.5S7.327 7 6.5 7 5 6.327 5 5.5 5.673 4 6.5 4z"></path></svg>
                  </div>
                </div>
              </div>
              <div className="links">
                <div><a href="#">Create Staking pool<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="arrow-right" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path></svg></a></div>
                <div><a href="#">More info <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="arrow-right2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path><path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path></svg></a></div>
              </div>
            </div>
            <div className="column2">
              <div className="content">
                <div>
                  <h3>Multisender</h3>
                  <p>Send tokens to unlimited wallet addresses in one single action.</p>
                </div>
                <div className="circle1">
                  <div className="circle2">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="logo1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5.559 8.855c.166 1.183.789 3.207 3.087 4.079C11 13.829 11 14.534 11 15v.163c-1.44.434-2.5 1.757-2.5 3.337 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-1.58-1.06-2.903-2.5-3.337V15c0-.466 0-1.171 2.354-2.065 2.298-.872 2.921-2.896 3.087-4.079C19.912 8.441 21 7.102 21 5.5 21 3.57 19.43 2 17.5 2S14 3.57 14 5.5c0 1.552 1.022 2.855 2.424 3.313-.146.735-.565 1.791-1.778 2.252-1.192.452-2.053.953-2.646 1.536-.593-.583-1.453-1.084-2.646-1.536-1.213-.461-1.633-1.517-1.778-2.252C8.978 8.355 10 7.052 10 5.5 10 3.57 8.43 2 6.5 2S3 3.57 3 5.5c0 1.602 1.088 2.941 2.559 3.355zM17.5 4c.827 0 1.5.673 1.5 1.5S18.327 7 17.5 7 16 6.327 16 5.5 16.673 4 17.5 4zm-4 14.5c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5.673-1.5 1.5-1.5 1.5.673 1.5 1.5zM6.5 4C7.327 4 8 4.673 8 5.5S7.327 7 6.5 7 5 6.327 5 5.5 5.673 4 6.5 4z"></path></svg>
                  </div>
                </div>
              </div>
              <div className="links">
                <div><a href="#">Send token<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="arrow-right" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path></svg></a></div>
                <div><a href="#">More info <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="arrow-right2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path><path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path></svg></a></div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
