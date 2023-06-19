import React from 'react'
import Header from '@/components/Header'
export default function DetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <Header />
      {children}
    </div>
  )
}
