"use client"
import Create from '@/components/Create'
import DashboardLayout from '@/containers/DashboardLayout'
import { tokenStaking } from '@/utils/constant.utils'


export default function TokenStaking() {
    return (
        <DashboardLayout>
           <Create {...tokenStaking}/>
        </DashboardLayout>
    )
}

