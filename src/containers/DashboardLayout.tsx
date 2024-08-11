import Footer from '@/components/dashboard/Footer'
import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
import React from 'react'

export default function DashboardLayout({
    children
  }: Readonly<{
    children: React.ReactNode
  }>) {
  return (
    <div>
      <Header />
      <Sidebar />
      {children}
      <Footer />
    </div>
  )
}

