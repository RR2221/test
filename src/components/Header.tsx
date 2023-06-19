'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import tw from 'tailwind-styled-components'
import { useUserContext } from '@/context/userContext'
import { supabase } from '@/lib/supabaseClient'

const Wrapper = tw.section`
  flex
  justify-between
  w-full
  h-[54px]
  bg-gradient-to-b from-[#54b4eb] via-[#2fa4e7] to-[#1d9ce5]
  items-center
  px-[20px]
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
  const { isLogin, setIsLogin } = useUserContext()
  const onLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setIsLogin(false)
      localStorage.removeItem('token')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Wrapper>
      <Link href="/">
        <Heading className="cursor-pointer">Gpushare.com</Heading>
      </Link>
      {isLogin !== null && (
        <>
          {!isLogin && (
            <div className="flex gap-5">
              <Link href="/register">
                <Button className="cursor-pointer">Register</Button>
              </Link>
              <Link href="/login">
                <Button className="cursor-pointer">Login</Button>
              </Link>
            </div>
          )}
          {isLogin && (
            <Button onClick={onLogout} className="cursor-pointer">
              Log out
            </Button>
          )}
        </>
      )}
    </Wrapper>
  )
}

export default Header
