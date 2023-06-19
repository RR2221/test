'use client'

import React, { useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { User } from '@supabase/auth-helpers-nextjs'
import jwt from 'jwt-decode'

type ContextType = {
  user: User | null
  setUser: (user: User | null) => void
  isLogin: boolean
  setIsLogin: (isLogin: boolean) => void
}

export const userContext = React.createContext<ContextType>({
  user: null,
  setUser: () => {},
  isLogin: false,
  setIsLogin: () => {},
})

export const useUserContext = () => useContext(userContext)

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLogin, setIsLogin] = useState<boolean>(false)
  useEffect(() => {
    // const setToken = async () => {
    //   try {
    //     const {
    //       data: { session },
    //       error,
    //     } = await supabase.auth.getSession()
    //     if (error) throw error
    //     if (session) {
    //       localStorage.setItem('token', session.access_token)
    //       setUser(session.user)
    //     } else {
    //       setUser(null)
    //     }
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }

    const token = localStorage.getItem('token')
    if (token) {
      const { session_id }: { session_id: string } = jwt(token)
      if (session_id) setIsLogin(true)
      else setIsLogin(false)
    }
  }, [])

  return (
    <userContext.Provider value={{ user, setUser, isLogin, setIsLogin }}>
      {children}
    </userContext.Provider>
  )
}
