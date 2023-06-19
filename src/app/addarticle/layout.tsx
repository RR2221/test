import React from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import { Container, Heading } from './style'
export default function AddArticleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container>
      <Header />
      <Heading>Add New GPU</Heading>
      {children}
    </Container>
  )
}
