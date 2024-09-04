import { formatEthAddr } from '@/utils/math.utils';
import React from 'react'
import CircularDistributionBar from '../progressBar/CircularDistributionBar'
import Next from "/public/form/next.svg"

interface TeamTokenLockCardProps {
  stats: any;
  asset: string;
  amount: number;
  unlockTime: number
}

const TeamTokenLockCard: React.FC<TeamTokenLockCardProps> = (props) => {
  const date = new Date(props?.unlockTime)
  return (
    <div className="admin-token-vesting-container">
      <div className="token-vesting-column1">
        <h3>Team token locks</h3>
        <div className="token-section1">
          <div className="svg-div">
            <CircularDistributionBar inProgress={props.stats?.locksInfo?.tokenCount} upcoming={0} ended={0} />
          </div>
          <div>
            <p>Locked</p>
            <span>{props.stats?.locksInfo?.tokenCount}</span>
          </div>
          <div>
            <p>Unlocked</p>
            <span>0</span>
          </div>
        </div>
      </div>
      <div className="token-vesting-column2">
        <a href="/team-token-locks">Manage team token locks
          <Next width="20" height="20" fill="currentColor" />
        </a>
        <h4>Available Locks</h4>
        <div className="token-section2">
          <div>
            <p>Asset</p>
            <span>{formatEthAddr(props.asset)}</span>
          </div>
          <div>
            <p>Amount</p>
            <span>{props.amount} CDS</span>
          </div>
          <div>
            <p>Unlock date</p>
            <span>{date?.toDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamTokenLockCard
