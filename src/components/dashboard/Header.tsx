import React from 'react'
import "../../styles/header.css"

const Header = () => {
  return (
    <header>
    <div className='header-container'>
      <div className="heading-box">
        <img src="https://app.team.finance/Blue_TF_Logotype.svg" alt="" />
        {/* <h2>Team Finance</h2> */}
        </div>
      <nav>
        <div className='nav-div'>
          <img src="https://app.team.finance/icons/wizard/ethereum.svg" alt="ig" />
        <a href="#">connect wallet</a>
        </div>
      </nav>
    </div>
    </header>
  )
}

export default Header
