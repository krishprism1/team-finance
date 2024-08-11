import React from 'react'
import "../../styles/header.css"

const Header = () => {
  return (
    <header>
    <div className='header-container'>
      <div className="heading-box">
        <img src="https://app.team.finance/Blue_TF_Logotype.svg" alt="" />
        </div>
      <nav>
        <div className='nav-div'>
          <div><img src="https://app.team.finance/icons/wizard/ethereum.svg" alt="ig" />
          </div>
        <div><a href="#">connect wallet</a></div>
        </div>
      </nav>
    </div>
    </header>
  )
}

export default Header
