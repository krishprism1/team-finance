"use client"
import Create from '@/components/Create'
import DashboardLayout from '@/containers/DashboardLayout'
import { tokenLockProps } from '@/utils/constant.utils'


export default function NFTLock() {
    return (
        <DashboardLayout>
           <Create {...tokenLockProps}/>
        </DashboardLayout>
    )
}