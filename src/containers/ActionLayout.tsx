import React from 'react'

export default function ActionLayout({
    children
  }: Readonly<{
    children: React.ReactNode
  }>) {
  return (
    <div>
      {children}
    </div>
  )
}

