import React from 'react'
import "../../styles/header.css"
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { formatEthAddr } from '@/utils/math.utils';

const Header = () => {

  const {address} = useAccount()
  const {open} = useWeb3Modal()
  const connect = async() => {
    await open()
  }

  // nav open code
  function openIcon(){
    let sidebox= document.querySelector('.side-container');
    if (sidebox) {
      (sidebox as HTMLElement).style.transform = "translateX(0%)";
    }
   }
 

  return (
    <header>
    <div className='header-container'>
      <div className="nav-open-container">
        <button onClick={openIcon}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className='nav-open-icon' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg></button>
      <h2>Dashboard</h2>
      </div>
      <nav>
        <div className='nav-div'>
          <div><img src="https://app.team.finance/icons/wizard/binance.svg" alt="ig" />
          </div>
        <div>
          <a href="#" onClick={() => connect()}>{address ? formatEthAddr(address) : "connect wallet"}</a>
        </div>
        </div>
      </nav>
    </div>
    </header>
  )
}

export default Header
