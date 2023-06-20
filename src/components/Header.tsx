'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import tw from 'tailwind-styled-components'
import { useUserContext } from '@/context/userContext'
import { supabase } from '@/lib/supabaseClient'
import { BsList } from 'react-icons/bs'

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
      <Link href="/" as="/">
        <Heading className="cursor-pointer ">
          <div className="flex">
            <span>G</span>
            <span className="xs:flex hidden">pushare.com</span>
          </div>
        </Heading>
      </Link>
      {isLogin !== null && (
        <>
          {!isLogin && (
            <div className="hidden gap-5 sm:flex">
              <Link href="/register" as="/register">
                <Button className="cursor-pointer">Register</Button>
              </Link>
              <Link href="/login" as="/login">
                <Button className="cursor-pointer">Login</Button>
              </Link>
            </div>
          )}
          {isLogin && (
            <Button
              onClick={onLogout}
              className="cursor-pointer hidden gap-5 sm:flex"
            >
              Log out
            </Button>
          )}
        </>
      )}
    </Wrapper>
  )
}

export default Header
