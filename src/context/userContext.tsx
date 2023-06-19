'use client'

import React, { useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { User } from '@supabase/auth-helpers-nextjs'

type ContextType = {
  user: User | null
  setUser: (user: User | null) => void
}

export const userContext = React.createContext<ContextType>({
  user: null,
  setUser: () => {},
})

export const useUserContext = () => useContext(userContext)

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  )
}
