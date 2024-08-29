"use client"
import "../styles/Dashboard.css"
import FeatureCard from "@/components/dashboard/FeatureCard";
import InProgressCard from "@/components/dashboard/InProgressCard";
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
  console.log(userInfo, "jj")
  let mint = userInfo?.data?.mint

  return (
    <>
      <DashboardLayout>
        <div className="dashboard-home-page">
          <div className="dashboard-container">
            <div className="heading">
              <h2>Dashboard</h2>
            </div>
            {stats && stats?.data?.totalServicesCount > 0 ? <>
              <ProgressLevelCard />

              <InProgressCard />
              <InProgressCard />
              <InProgressCard />

              {stats?.data?.mintCount &&
                <RecentTokenCard
                  tokenLogo={mint?.tokenLogo}
                  name={mint?.name}
                  symbol={mint?.symbol}
                  supply={mint?.supply} />
              }

              {stats?.data?.multisenderCount ? <RecentMultisentCard tokenLogo="ls" symbol="CDS" amount={1000} recipients={10} /> :""}
            </> :
              <WalletOverviewCard />
            }

            <div className="column2-container">
              {featureProps && stats?.data && featureProps.map((item: any, index: number) => (
                stats?.data?.arr[index] &&
                <FeatureCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  btnOne={item.btnOne}
                  btnTwo={item.btnTwo}
                  routeOne={item.routeOne} />
              ))}

            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
