import './globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import { config } from '@/config'
import Web3ModalProvider from '@/context'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
// import Section from '@/components/dashboard/Section'
// import Page from "./token-creation/page";
import Mint from './mint/page'


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body>
        <Web3ModalProvider initialState={initialState}>
          {/* <Header /> */}
          {/* <Sidebar /> */}
          {/* <Page/> */}
          <Mint/>
          {/* <Section/> */}
          {children}
        </Web3ModalProvider>
        <ToastContainer />
      </body>
    </html>
  )
}