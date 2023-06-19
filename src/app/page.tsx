import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import tw from 'tailwind-styled-components'

import Board from '@/components/Board'
import Header from '@/components/Header'
import Banner from '@/assets/images/Banner.png'

const Container = tw.div`
  flex
  flex-col
  w-full
  max-w-[1170px]
  mt-[20px]
  mx-[84px]
  px-[15px]
  pb-[20px]
  gap-y-6
`

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <Container>
        <Image
          src={Banner}
          alt="banner"
          width={500}
          height={500}
          priority={true}
          suppressHydrationWarning
          className="w-full h-full overflow-hidden mb-[40px]"
        />
        <hr className="w-full" />
        <button className="w-[115px] h-[38px] bg-blue-500 text-white rounded-xl">
          <Link href="/addarticle">Post</Link>
        </button>
        <hr className="w-full" />
        <Board />
      </Container>
    </main>
  )
}
