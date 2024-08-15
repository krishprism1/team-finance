import React from 'react'
import "../../styles/header.css"
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { formatEthAddr } from '@/utils/math.utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Header = () => {

  const {address} = useAccount()
  const {open} = useWeb3Modal()
  const connect = async() => {
    await open()
  }

  // nav open code
  useGSAP(()=>{
    let openIcon = document.querySelector(".nav-open-icon")
    openIcon.addEventListener("click",()=>{
      gsap.from(".side-container,.close-icon",{
          display:"block",
          x:0,
          duration:0.8,
          ease:"power2.inOut",
          opacity:99
      })
    })
 })
 useGSAP(()=>{
  let closeIcon = document.querySelector(".close-icon")
  closeIcon.addEventListener("click",()=>{
    gsap.to(".side-container,.close-icon",{
      display:"none",
      x:-500,
      duration:0.5,
      ease:"power2.inOut",
      opacity:0
    })
  })
 })

  return (
    <header>
    <div className='header-container'>
      <div className="nav-open-container">
        <button><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className='nav-open-icon' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg></button>
      </div>
      <div className="heading-box">
        <img src="https://app.team.finance/Blue_TF_Logotype.svg" alt="" />
        </div>
      <nav>
        <div className='nav-div'>
          <div><img src="https://app.team.finance/icons/wizard/ethereum.svg" alt="ig" />
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
