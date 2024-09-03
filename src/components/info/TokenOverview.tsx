import React from 'react'
import "../../styles/mint.css"
import "../../styles/Staking.css"
import "../../styles/multisender.css"
import "../../styles/info/tokenOverview.css"
import "../../styles/info/tokenOverviewResponsive.css"


const TokenOverview = () => {
  return (
    <>
      <div className="token-overview-column1">
        <div className='tk-view-row'>
          <h1>Team token locks</h1>
          <p>👋 Welcome to your team token locks info hub, 0x6E61...5B38. If you have any questions, feel free to contact us in <a href="#">our chat</a> or <a href="https://t.me/teamfinance_main" target="_blank" rel="noopener noreferrer">Telegram</a>.</p>
        </div>
      </div>

      <div className="token-overview-container">
        <div className="token-overview-column2">
          <div className="tk-view-box">
            <p>Number of active locks</p>
            <h3>7</h3>
          </div>
          <div className="tk-view-box">
            <p>Number of locks</p>
            <h3>5</h3>
          </div>
          <div className="tk-view-box">
            <p>Next unlock date</p>
            <h3>Sep 22, 2024</h3>
          </div>
        </div>
      </div>


      <div className="token-overview-container2">
        <div className='token-column1'>
          <div className="first-box">
            <h2>My team token locks total</h2>
            <div>
              <p>Your tokens</p>
              <select name="Select token" id='select token'>
                <option value="Select Token">Select Token</option>
                <option value="Lap">Lap</option>
                <option value="OOE">OOE</option>
                <option value="factorytest">factorytest</option>
                <option value="TestToken">TestToken</option>
                <option value="Candes">Candes</option>
              </select>
              <label htmlFor='select token' className='select-token-btn'>
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"  aria-hidden="true"  height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.47 4.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 0 1-1.06-1.06l3.75-3.75Zm-3.75 9.75a.75.75 0 0 1 1.06 0L12 17.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path></svg>
              </label>
            </div>
          </div>
          <div className="second-box">
            <div className="row1">
              <div className='div'>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span></span>
                  <p>Locked</p>
                </div>
                <h4>0</h4>
              </div>
              <div className='div'>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span></span>
                  <p>Unlocked</p>
                </div>
                <h4>0</h4>
              </div>
            </div>
            <div className="row2">
              <p>Want more info?</p>
              <a href="#">See Token Profile</a>
            </div>
          </div>
        </div>
      </div>

      <div className="token-overview-container3">
        <div className='my-team-token-lock-container'>
          <h3>My team token locks</h3>
          <div className="search-top-box">
            <div>
              <div className='input-box'>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className='svg1' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path></svg>
                <input type="text" placeholder='Search' />
              </div>
              <button><svg stroke="#6893f2" fill="#6893f2" stroke-width="0" viewBox="0 0 24 24" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path d="M7 11h10v2H7zM4 7h16v2H4zm6 8h4v2h-4z"></path></svg></button>
            </div>
            <a href="#">Create team token lock <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></a>
          </div>

          <div className="toggle-middle-container">

            <div className="toggle-button-box">
              <input type="checkbox" id='check' />
              <label htmlFor="check" className='button'></label>
            </div>

            <span style={{ fontSize: '0.9em' }}>Hide completed locks</span>
          </div>
        </div>
      </div>

      {/* filter box code here */}
      <div className="filter-box-container">
          <div className="filter-box-column">
            <div className="filter-row1">
              <h2>Filter</h2>
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"  aria-hidden="true" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
            </div>
            <div className="filter-row2">
              <span>Locked token</span>
              <div>
                <input type="text" placeholder='Start typing or select from the list'/>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" ><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
                </div>
            </div>
            <div className="filter-row2">
              <span>Lock start period</span>
              <div>
                <input type="datetime-local" placeholder='Start'/>
                </div>
            </div>
            <div className="filter-row2">
              <span>Lock end period</span>
              <div>
                <input type="datetime-local" placeholder='Start'/>
                </div>
            </div>
            <div className="filter-row2">
              <span>Status</span>
              <div>
                <select name="Status">
                  <option value="All">All</option>
                  <option value="Unlocked">Unlocked</option>
                  <option value="Locked">Locked</option>
                </select>
                </div>
            </div>
            <div className="filter-last-row">
              <a href="#">Cancel</a>
              <a href="#">Clear all</a>
              <a href="#">Apply</a>
            </div>
          </div>
      </div>


      <div className="token-overview-container4">
        <div className="token-details-container">
          <div className="top-heading-box">
            <p>Token</p>
            <p>Amount</p>
            <p>% of overall supply</p>
            <p>Lockup period</p>
            <p>Status</p>
            <p>Action</p>
          </div>

          <div className="borad-chart-column">

            <div className="board-chart-row1">
              <div className="board-chart-box1">
                <div className="div1">
                  <img src="https://app.team.finance/tokens/ethereum-token.webp" alt="logo" width='30px' height='30px' />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p>LAP</p>
                    <span>Lap</span>
                  </div>
                </div>
                <div className="div2">
                  <p>100 LAP</p>
                </div>
                <div className="div3">
                  <p>0.001%</p>
                </div>
                <div className="div4">
                  <p>30 Aug 2024</p>
                  <p>29 Nov 2024</p>
                </div>
                <div className="div5">
                  <svg viewBox="0 0 100 100" width='1.1em' height='1.1em' data-test-id="CircularProgressbar"><path d="M 50,50 m 0,-44 a 44,44 0 1 1 0,88 a 44,44 0 1 1 0,-88 " stroke-width="12" fill-opacity="0" style={{ stroke: 'rgb(191, 219, 254)', strokeLinecap: ' round', strokeDasharray: '276.46px, 276.46px', strokeDashoffset: ' 0px' }}></path><path d=" M 50,50 m 0,-44 a 44,44 0 1 1 0,88 a 44,44 0 1 1 0,-88 " stroke-width="12" fill-opacity="0" style={{ stroke: 'rgb(37, 99, 235)', strokeDasharray: '276.46px, 276.46px', strokeDashoffset: '16.031px' }}></path></svg>
                  <h6>Locked</h6>
                </div>
              </div>
            </div>

            <div className="board-chart-row2" >
              <div className="box11">
                <a href="#">Actions <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="12" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg></a>
              </div>
            </div>

          </div>

          <div className="borad-chart-column">

            <div className="board-chart-row1">
              <div className="board-chart-box1">
                <div className="div1">
                  <img src="https://app.team.finance/tokens/ethereum-token.webp" alt="logo" width='30px' height='30px' />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p>OOE</p>
                    <span>OOE</span>
                  </div>
                </div>
                <div className="div2">
                  <p>80 OOE</p>
                </div>
                <div className="div3">
                  <p>0.00027%</p>
                </div>
                <div className="div4">
                  <p>25 Aug 2024</p>
                  <p>15 Nov 2024</p>
                </div>
                <div className="div5">
                  <svg viewBox="0 0 100 100" width='1.1em' height='1.1em' data-test-id="CircularProgressbar"><path d="M 50,50 m 0,-44 a 44,44 0 1 1 0,88 a 44,44 0 1 1 0,-88 " stroke-width="12" fill-opacity="0" style={{ stroke: 'rgb(191, 219, 254)', strokeLinecap: ' round', strokeDasharray: '276.46px, 276.46px', strokeDashoffset: ' 0px' }}></path><path d=" M 50,50 m 0,-44 a 44,44 0 1 1 0,88 a 44,44 0 1 1 0,-88 " stroke-width="12" fill-opacity="0" style={{ stroke: 'rgb(37, 99, 235)', strokeDasharray: '276.46px, 276.46px', strokeDashoffset: '90.031px' }}></path></svg>
                  <h6>Locked</h6>
                </div>
              </div>
            </div>

            <div className="board-chart-row2" >
              <div className="box11">
                <a href="#">Actions <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="12" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg></a>
              </div>
            </div>

          </div>

          <div className="borad-chart-column">

            <div className="board-chart-row1">
              <div className="board-chart-box1">
                <div className="div1">
                  <img src="https://app.team.finance/tokens/bsc-token.webp" alt="logo" width='30px' height='30px' />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p></p>
                    <span></span>
                  </div>
                </div>
                <div className="div2">
                  <p>1e-18</p>
                </div>
                <div className="div3">
                  <p>0%</p>
                </div>
                <div className="div4">
                  <p>25 Aug 2024</p>
                  <p>15 Nov 2024</p>
                </div>
                <div className="div5">
                  <svg viewBox="0 0 100 100" width='1.1em' height='1.1em' data-test-id="CircularProgressbar"><path d="M 50,50 m 0,-44 a 44,44 0 1 1 0,88 a 44,44 0 1 1 0,-88 " stroke-width="12" fill-opacity="0" style={{ stroke: 'rgb(191, 219, 254)', strokeLinecap: ' round', strokeDasharray: '276.46px, 276.46px', strokeDashoffset: ' 0px' }}></path><path d=" M 50,50 m 0,-44 a 44,44 0 1 1 0,88 a 44,44 0 1 1 0,-88 " stroke-width="12" fill-opacity="0" style={{ stroke: 'rgb(37, 99, 235)', strokeDasharray: '276.46px, 276.46px', strokeDashoffset: '0px' }}></path></svg>
                  <h6>Locked</h6>
                </div>
              </div>
            </div>

            <div className="board-chart-row2" >
              <div className="box11">
                <a href="#">Switch Network <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="12" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg></a>
              </div>
            </div>

          </div>

          <div className="borad-chart-column">

            <div className="board-chart-row1">
              <div className="board-chart-box1">
                <div className="div1">
                  <img src="https://app.team.finance/tokens/bsc-token.webp" alt="logo" width='30px' height='30px' />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p>ft</p>
                    <span>factorytest</span>
                  </div>
                </div>
                <div className="div2">
                  <p>100 ft</p>
                </div>
                <div className="div3">
                  <p>1%</p>
                </div>
                <div className="div4">
                  <p>25 Aug 2024</p>
                  <p>15 Nov 2024</p>
                </div>
                <div className="div5" style={{ backgroundColor: '#dcfce7' }}>
                  <svg viewBox="0 0 100 100" width='1.1em' height='1.1em' data-test-id="CircularProgressbar"><path d="M 50,50 m 0,-44 a 44,44 0 1 1 0,88 a 44,44 0 1 1 0,-88 " stroke-width="12" fill-opacity="0" style={{ stroke: 'rgb(191, 219, 254)', strokeLinecap: ' round', strokeDasharray: '276.46px, 276.46px', strokeDashoffset: ' 0px' }}></path><path d=" M 50,50 m 0,-44 a 44,44 0 1 1 0,88 a 44,44 0 1 1 0,-88 " stroke-width="12" fill-opacity="0" style={{ stroke: '#16a34a', strokeDasharray: '276.46px, 276.46px', strokeDashoffset: '0px' }}></path></svg>
                  <h6 style={{ color: '#166534' }}>Unlocked</h6>
                </div>
              </div>
            </div>

            <div className="board-chart-row2" >
              <div className="box11">
                <a href="#">Switch Network <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="12" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg></a>
              </div>
            </div>

          </div>

          <div className="borad-chart-column">

            <div className="board-chart-row1">
              <div className="board-chart-box1">
                <div className="div1">
                  <img src="https://app.team.finance/tokens/bsc-token.webp" alt="logo" width='30px' height='30px' />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p></p>
                    <span></span>
                  </div>
                </div>
                <div className="div2">
                  <p>1e-18</p>
                </div>
                <div className="div3">
                  <p>0%</p>
                </div>
                <div className="div4">
                  <p>25 Aug 2024</p>
                  <p>15 Nov 2024</p>
                </div>
                <div className="div5">
                  <svg viewBox="0 0 100 100" width='1.1em' height='1.1em' data-test-id="CircularProgressbar"><path d="M 50,50 m 0,-44 a 44,44 0 1 1 0,88 a 44,44 0 1 1 0,-88 " stroke-width="12" fill-opacity="0" style={{ stroke: 'rgb(191, 219, 254)', strokeLinecap: ' round', strokeDasharray: '276.46px, 276.46px', strokeDashoffset: ' 0px' }}></path><path d=" M 50,50 m 0,-44 a 44,44 0 1 1 0,88 a 44,44 0 1 1 0,-88 " stroke-width="12" fill-opacity="0" style={{ stroke: 'rgb(37, 99, 235)', strokeDasharray: '276.46px, 276.46px', strokeDashoffset: '0px' }}></path></svg>
                  <h6>Locked</h6>
                </div>
              </div>
            </div>

            <div className="board-chart-row2" >
              <div className="box11">
                <a href="#">Switch Network <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="12" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg></a>
              </div>
            </div>

          </div>

          <div className="bottom-last-container">
            <div className="bottom-box1">
              <span>1 to <span>5</span> of 7 results</span>
            </div>

            <div className="bottom-box2">
              <p>Rows</p>
              <select>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
              <div>
              <button><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg></button>
              <div className='span'>
                <span >Page 1/1</span>
                </div>
              <button><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg></button>
              </div>
            </div>
          </div>

        </div>
      </div>

{/* team token lock datails box here */}
      <div className="team-token-lock-details-container">
        <div className="team-token-lock-column">

        <div className="team-token-row1">
              <h2>Team token lock details</h2>
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"  aria-hidden="true" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
          </div>

            <div className="team-token-row2">
              <div>
                <span>Token address</span>
                <p>0x7aE5DF7f030fF1AEFc542240E56900CF3d1Dc911</p>
              </div>
              <div>
                <span>Amount locked</span>
                <p>100 ft</p>
              </div>
              <div>
                <span>Start date</span>
                <p>29 Aug 2024 01:10 PM UTC+5.5</p>
              </div>
              <div>
                <span>End date </span>
                <p>Invalid dateUTC+5.5</p>
              </div>
              <div>
                <span>Status</span>
                <h4>Unlocked</h4>
              </div>
            </div>

            <div className="team-token-row3">

            </div>

            <div className="team-token-row4">
              <div>
                <p>Available for withdrawal</p>
                <span>100 ft</span>
              </div>
             <div>
               <a href="#">Switch Network</a>
               </div>
            </div>
        </div>
      </div>

 
    </>
  )
}

export default TokenOverview
