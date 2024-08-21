"use client"
import Create from '@/components/Create'
import DashboardLayout from '@/containers/DashboardLayout'
import { tokenLockProps } from '@/utils/constant.utils'


export default function TeamTokenLock() {
    return (
        <DashboardLayout>
           <Create {...tokenLockProps}/>
        </DashboardLayout>
    )
}