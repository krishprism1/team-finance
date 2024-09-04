"use client"
import "../styles/Dashboard.css"
import FeatureCard from "@/components/dashboard/FeatureCard";
import VestingCard from "@/components/dashboard/VestingCard";
import ProgressLevelCard from "@/components/dashboard/ProgressLevelCard";
import RecentMultisentCard from "@/components/dashboard/RecentMultisentCard";
import RecentTokenCard from "@/components/dashboard/RecentTokenCard";
import WalletOverviewCard from "@/components/dashboard/WalletOverviewCard";
import DashboardLayout from "@/containers/DashboardLayout";
import { featureProps } from "@/utils/constant.utils";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import axios from 'axios'
import { userUrl } from "@/utils/apiUrl.utils";
import NFTLockCard from "@/components/dashboard/NFTLockCard";
import TeamTokenLockCard from "@/components/dashboard/TeamTokenLockCard";


export default function Home() {
  const { address } = useAccount()
  const [stats, setStats] = useState<any>()
  const [userInfo, setUserInfo] = useState<any>()

  useEffect(() => {
    if (address) {
      fetchStats()
      fetchUserInfo()
    }
  }, [address])

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${userUrl.stats}?wallet=${address}`);
      setStats(res.data)
    } catch (error) {
      console.log(error, "++++")
    }
  }

  const fetchUserInfo = async () => {
    try {
      const res = await axios.get(`${userUrl.info}?wallet=${address}`);
      setUserInfo(res.data)
    } catch (error) {
      console.log(error, "++++")
    }
  }

  let mint = userInfo?.data?.mint
  let multisent = userInfo?.data?.multisent
  let tokenLock = userInfo?.data?.tokenlock
  let nftLock = userInfo?.data?.nftlock

  console.log(stats, "jj", userInfo)

  return (
    <>
      <DashboardLayout>
        <div className="dashboard-home-page">
          <div className="dashboard-container">
            <div className="heading">
              <h2>Dashboard</h2>
            </div>
            {address ? <ProgressLevelCard stats={stats} /> : <WalletOverviewCard />}


            {stats && stats?.data?.totalServicesCount > 0 ? <>
              {stats?.data?.vestingCount ?
                <VestingCard /> : ""
              }

              {stats?.data?.locksInfo?.tokenCount ?
                <TeamTokenLockCard
                  stats={stats?.data}
                  asset={tokenLock?.token}
                  amount={tokenLock?.amount}
                  unlockTime={tokenLock?.unlockTime}
                /> : ""
              }

              {stats?.data?.locksInfo?.nftCount ?
                <NFTLockCard
                  stats={stats?.data}
                  asset={nftLock?.nftAddr}
                  tokenId={nftLock?.tokenId}
                  unlockTime={nftLock?.unlockTime}
                /> : ""
              }

              {stats?.data?.mintCount ?
                <RecentTokenCard
                  tokenLogo={mint?.tokenLogo}
                  name={mint?.name}
                  symbol={mint?.symbol}
                  supply={mint?.supply} /> : ""
              }

              {stats?.data?.multisenderCount ?
                <RecentMultisentCard
                  tokenLogo=""
                  symbol={multisent?.symbol}
                  amount={multisent?.totalAmount}
                  recipients={multisent?.totalRecipients}
                />
                : ""}
            </> : ""
            }

            <div className="column2-container">
              {stats?.data ? featureProps.map((item: any, index: number) => (
                stats?.data?.arr[index] &&
                <FeatureCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  btnOne={item.btnOne}
                  btnTwo={item.btnTwo}
                  routeOne={item.routeOne} />
              )) :

                featureProps.map((item: any, index: number) => (
                  <FeatureCard
                    key={index}
                    title={item.title}
                    description={item.description}
                    btnOne={item.btnOne}
                    btnTwo={item.btnTwo}
                    routeOne={item.routeOne} />
                ))
              }

            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
