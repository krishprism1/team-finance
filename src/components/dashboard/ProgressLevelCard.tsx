import Link from 'next/link';
import React from 'react'
import Arrow from "/public/dashboard/arrowtor.svg"
import Tick from "/public/dashboard/tick.svg"
import Bell from "/public/dashboard/bell.svg"
import CircularProgressBar from '../progressBar/CircularProgressBar';

interface ActiveCardProps {
    title: string;
}
interface ExploreCardProps {
    title: string;
    path: string;
}

interface ProgressLevelCardProps {
    stats: any
}

const ProgressLevelCard: React.FC<ProgressLevelCardProps> = (props) => {
    const data = props.stats?.data;
    const percentage = data?.totalServicesCount ? Math.ceil((data?.totalServicesCount / 7) * 100) : 0
    return (
        <div className="securty-level-bar-container">
            <div className="level-bar-column">
                <CircularProgressBar progress={percentage} />
            </div>
            <div className="level-heading-column">
                <div className="first-box1">
                    <div>
                        <h3>Security Level</h3>
                        <span>Intermediate
                            <Bell width="14" height="14" fill="currentColor" />
                        </span>
                    </div>
                    <p className="circle-heading-top">You have made it. Nice job!</p>
                </div>
                <div className="second-box2">
                    <div className="small-box">
                        {data?.mintCount ? <ActiveCard title='Token creation' /> : <ExploreCard title='Token creation' path='/token-creation' />}
                        {data?.vestingCount ? <ActiveCard title='Token vesting' /> : <ExploreCard title='Token vesting' path='/token-vesting' />}
                        {data?.locksInfo?.tokenCount ? <ActiveCard title='Team token locks' /> : <ExploreCard title='Team token locks' path='/team-token-locks' />}
                    </div>
                    <div className="small-box">
                        {data?.locksInfo?.nftCount ? <ActiveCard title='NFT locks' /> : <ExploreCard title='NFT locks' path='/nft-locks' />}
                        {data?.locksInfo?.lpCount ? <ActiveCard title='Liquidity Locks' /> : <ExploreCard title='Liquidity Locks' path='/' />}
                        {data?.multisenderCount ? <ActiveCard title='Multisender' /> : <ExploreCard title='Multisender' path='/token-multisender' />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgressLevelCard

const ActiveCard: React.FC<ActiveCardProps> = ({ title }) => {
    return (
        <div className="row33">
            <div className="done-arrow">
                <Tick width="16" height="16" fill="currentColor" />
            </div>
            <p>{title}</p>
        </div>
    )
}

const ExploreCard: React.FC<ExploreCardProps> = ({ title, path }) => {
    return (
        <div className="liquid-locks-box1">
            <p>{title}</p>
            <div>
                <Link href={path}>Explore  <Arrow width="20" height="20" fill="currentColor" /></Link>
            </div>
        </div>
    )
}
