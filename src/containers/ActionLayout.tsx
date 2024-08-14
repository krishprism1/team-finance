import Link from 'next/link'
import React from 'react'

export default function ActionLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <div className="back-home-box">
        <div className='image-container'>
          <img src="https://app.team.finance/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-header.43749e9b.png&w=384&q=75" alt="" />
          <Link href="/"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="left-icon" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path></svg>
            <span>Back to home page</span></Link>
        </div>
      </div>
      {children}
    </div>
  )
}

