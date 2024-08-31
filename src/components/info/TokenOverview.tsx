import React from 'react'
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
    </>
  )
}

export default TokenOverview
