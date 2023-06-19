import React from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import { Container, Logo } from './style'
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container>
      <Header />
      <Image
        src={Logo}
        alt="logo"
        width={100}
        height={100}
        className="mt-[30px]"
        priority={true}
        suppressHydrationWarning
      />
      {children}
    </Container>
  )
}
