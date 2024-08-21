"use client"
import Create from '@/components/Create'
import DashboardLayout from '@/containers/DashboardLayout'
import { createTokenProps } from '@/utils/constant.utils'


export default function tokenCreation() {
    return (
        <DashboardLayout>
           <Create {...createTokenProps}/>
        </DashboardLayout>
    )
}


