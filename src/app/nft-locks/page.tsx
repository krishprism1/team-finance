"use client"
import Create from '@/components/Create'
import DashboardLayout from '@/containers/DashboardLayout'
import { nftLockProps } from '@/utils/constant.utils'


export default function NFTLock() {
    return (
        <DashboardLayout>
           <Create {...nftLockProps}/>
        </DashboardLayout>
    )
}