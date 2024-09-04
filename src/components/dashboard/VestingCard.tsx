import React from 'react'
import CircularDistributionBar from '../progressBar/CircularDistributionBar'
import Next from "/public/form/next.svg"

const VestingCard = () => {
  return (
    <div className="admin-token-vesting-container">
      <div className="token-vesting-column1">
        <h3>Admin token vestings</h3>
        <div className="token-section1">
          <div className="svg-div">
            <CircularDistributionBar inProgress={2} upcoming={1} ended={2} />
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
        <a href="#">Manage vesting contracts
          <Next width="20" height="20" fill="currentColor" />
        </a>
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
  )
}

export default VestingCard
