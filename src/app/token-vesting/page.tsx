"use client"
import Create from '@/components/Create'
import DashboardLayout from '@/containers/DashboardLayout'
import { tokenVestingProps } from '@/utils/constant.utils'


export default function TokenVesting() {
    return (
        <DashboardLayout>
           <Create {...tokenVestingProps}/>
        </DashboardLayout>
    )
}

