'use client'

import React, { useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { User } from '@supabase/auth-helpers-nextjs'
import jwt from 'jwt-decode'

type ContextType = {
  user: User | null
  setUser: (user: User | null) => void
  isLogin: boolean | null
  setIsLogin: (isLogin: boolean | null) => void
}

export const userContext = React.createContext<ContextType>({
  user: null,
  setUser: () => {},
  isLogin: null,
  setIsLogin: () => {},
})

export const useUserContext = () => useContext(userContext)

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLogin, setIsLogin] = useState<boolean | null>(null)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const { session_id }: { session_id: string } = jwt(token)
      if (session_id) {
        setIsLogin(true)
        setUser(jwt(token))
      } else setIsLogin(false)
    } else {
      setIsLogin(false)
    }
  }, [])

  return (
    <userContext.Provider value={{ user, setUser, isLogin, setIsLogin }}>
      {children}
    </userContext.Provider>
  )
}
