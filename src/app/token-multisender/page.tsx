"use client"
import Create from '@/components/Create'
import DashboardLayout from '@/containers/DashboardLayout'
import { tokenSenderProps } from '@/utils/constant.utils'


export default function tokenMultiSender() {
    return (
        <DashboardLayout>
           <Create {...tokenSenderProps}/>
        </DashboardLayout>
    )
}




