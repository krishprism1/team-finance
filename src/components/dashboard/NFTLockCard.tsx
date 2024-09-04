import { formatEthAddr } from '@/utils/math.utils';
import React from 'react'
import CircularDistributionBar from '../progressBar/CircularDistributionBar'
import Next from "/public/form/next.svg"

interface NFTLockCardProps {
  stats: any;
  asset: string;
  tokenId: string;
  unlockTime: number;
}

const NFTLockCard: React.FC<NFTLockCardProps> = (props) => {
  const date = new Date(props?.unlockTime)
  return (
    <div className="admin-token-vesting-container">
      <div className="token-vesting-column1">
        <h3>NFT locks</h3>
        <div className="token-section1">
          <div className="svg-div">
            <CircularDistributionBar inProgress={props.stats?.locksInfo?.nftCount} upcoming={0} ended={0} />
          </div>
          <div>
            <p>Locked</p>
            <span>{props.stats?.locksInfo?.nftCount}</span>
          </div>
          <div>
            <p>Unlocked</p>
            <span>0</span>
          </div>
        </div>
      </div>
      <div className="token-vesting-column2">
        <a href="/team-token-locks">Manage NFT locks
          <Next width="20" height="20" fill="currentColor" />
        </a>
        <h4>Available Locks</h4>
        <div className="token-section2">
          <div>
            <p>Asset</p>
            <span>{formatEthAddr(props.asset)}</span>
          </div>
          <div>
            <p>Token ID</p>
            <span>{props?.tokenId}</span>
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

export default NFTLockCard
