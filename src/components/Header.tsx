'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import tw from 'tailwind-styled-components'
import { useUserContext } from '@/context/userContext'
import { supabase } from '@/lib/supabaseClient'

const Wrapper = tw.section`
  flex
  justify-around
  w-full
  h-[54px]
  bg-gradient-to-b from-[#54b4eb] via-[#2fa4e7] to-[#1d9ce5]
  items-center
`

const Heading = tw.h1`
  text-white
  text-lg
  font-medium
`

const Button = tw.h3`
  text-white
  text-sm
`
const Header = () => {
  const { user, setUser } = useUserContext()
  const onLogout = () => {
    try {
      const data = supabase.auth.signOut()
      setUser(null)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Wrapper>
      <Heading className="cursor-pointer">
        <Link href="/">Gpushare.com</Link>
      </Heading>
      {!user && (
        <div className="flex gap-5">
          <Button className="cursor-pointer">
            <Link href="/register">Register</Link>
          </Button>
          <Button className="cursor-pointer">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      )}
      {user && (
        <Button onClick={onLogout} className="cursor-pointer">
          Log out
        </Button>
      )}
    </Wrapper>
  )
}

export default Header
