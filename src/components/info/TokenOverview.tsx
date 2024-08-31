import React from 'react'
import "../../styles/mint.css"
import "../../styles/Staking.css"
import "../../styles/multisender.css"
import "../../styles/info/tokenOverview.css"

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
              <input type="text" placeholder='Lap'/>
            </div>
          </div>
          <div className="second-box">
            <div className="row1">
              <div className='div'>
                <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
                 <span></span>
                 <p>Locked</p>
                </div>
                <h4>0</h4>
              </div>
              <div className='div'>
                <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
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
                  <button><svg stroke="#6893f2" fill="#6893f2" stroke-width="0" viewBox="0 0 24 24"  height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path d="M7 11h10v2H7zM4 7h16v2H4zm6 8h4v2h-4z"></path></svg></button>
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
    </>
  )
}

export default TokenOverview
