"use client"
import FeatureCard from "@/components/dashboard/FeatureCard";
import InProgressCard from "@/components/dashboard/InProgressCard";
import RecentTokenCard from "@/components/dashboard/RecentTokenCard";
import DashboardLayout from "@/containers/DashboardLayout";
import { liquidityLockCard, multisenderCard, nftLockCard, stakingCard, teamLockCard, tokenCard, vestingCard } from "@/utils/constant.utils";
import "../styles/Dashboard.css"

export default function Home() {
  // await axios.get("/api/users/logout")

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


            <InProgressCard />
            <div className="admin-token-vesting-container">
              <div className="token-vesting-column1">
                <h3>Team token locks</h3>
                <div className="token-section1">
                  <div className="svg-div">
                    <svg>
                      <path cx="56" cy="56" name="In progress" stroke="#8acbf0" fill="#8acbf0" focusable="false" d="M 107,56 A 51,51,0, 1,0, 106.99999999223226,56.00089011791847 L 88.99999999497382,56.00057595865313 A 33,33,0, 1,1, 89,56 Z" role="img" ></path>
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
                      <path cx="56" cy="56" name="In progress" stroke="#8acbf0" fill="#8acbf0" focusable="false" d="M 107,56 A 51,51,0, 1,0, 106.99999999223226,56.00089011791847 L 88.99999999497382,56.00057595865313 A 33,33,0, 1,1, 89,56 Z" role="img" ></path>
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
                    <span><img src="https://app.team.finance/tokens/bsc-token.webp" alt="logo" />MTK</span>
                  </div>
                  <div>
                    <p>Unlock date</p>
                    <span>10 Aug 2024</span>
                  </div>
                </div>
              </div>
            </div>


            <RecentTokenCard />
            <div className="recently-history-container">
              <div className="recently-history-column1">
                <h3>Recently created tokens</h3>
                <div className="history-box">
                  <div className="history-small-box1">
                    <div>
                      <p>Total amount</p>
                      <span><img src="https://app.team.finance/tokens/bsc-token.webp" alt="1" id="hs-first-imgae" /> 300 ft</span>
                    </div>
                  </div>
                  <div className="history-small-box2">
                    <div>
                      <p>Total recipients</p>
                      <span>2</span>
                    </div>
                    <img src="https://app.team.finance/icons/wizard/binance.svg" alt="l" />
                  </div>
                </div>
              </div>
              <div className="recently-history-column2">
                <a href="#">View sent token<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="links-right-arrows" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg></a>
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

            <div className="column2-container">

            </div>

            <div className="column2-container">
              <FeatureCard title={tokenCard.title} description={tokenCard.description} btnOne={tokenCard.btnOne} btnTwo={tokenCard.btnTwo} />
              <FeatureCard title={vestingCard.title} description={vestingCard.description} btnOne={vestingCard.btnOne} btnTwo={vestingCard.btnTwo} />
              <FeatureCard title={teamLockCard.title} description={teamLockCard.description} btnOne={teamLockCard.btnOne} btnTwo={teamLockCard.btnTwo} />
              <FeatureCard title={nftLockCard.title} description={nftLockCard.description} btnOne={nftLockCard.btnOne} btnTwo={nftLockCard.btnTwo} />
              <FeatureCard title={multisenderCard.title} description={multisenderCard.description} btnOne={multisenderCard.btnOne} btnTwo={multisenderCard.btnTwo} />
              <FeatureCard title={stakingCard.title} description={stakingCard.description} btnOne={stakingCard.btnOne} btnTwo={stakingCard.btnTwo} />
              <FeatureCard title={liquidityLockCard.title} description={liquidityLockCard.description} btnOne={liquidityLockCard.btnOne} btnTwo={liquidityLockCard.btnTwo} />
            </div>

            <div className="column2-container">
              
            </div>

          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
