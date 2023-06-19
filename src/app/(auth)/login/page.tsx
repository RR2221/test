'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { supabase } from '@/lib/supabaseClient'
import { useForm } from 'react-hook-form'
import { Heading, Form, Input, FormBtn } from '../style'
import { AuthError } from '@supabase/supabase-js'
import { useUserContext } from '@/context/userContext'
import ScaleLoader from 'react-spinners/ScaleLoader'

const Login = () => {
  const router = useRouter()
  const { setUser, setIsLogin, isLogin } = useUserContext()
  const [loading, setLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [err, setErr] = useState<AuthError | null>()

  const onLogin = async (value: any) => {
    try {
      setErr(null)
      setLoading(true)
      const { email, password } = value
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        setErr(error)
        throw error
      }
      setUser(data.user || null)

      localStorage.setItem('token', data.session.access_token)
      setIsLogin(true)
      if (!error) router.push('/')
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }
  return (
    <>
      <Heading>Login</Heading>
      <Form onSubmit={handleSubmit(onLogin)}>
        <div className="flex flex-col">
          <span>Email</span>
          <Input
            placeholder="Enter your email address..."
            {...register('email')}
          />
        </div>
        <div className="flex flex-col">
          <span>Password</span>
          <Input type="password" {...register('password')} />
        </div>
        <span className="flex justify-end text-red-400 text-sm">
          {err?.message}
        </span>
        <FormBtn className="flex items-center justify-center gap-x-2">
          Login
          {loading && <ScaleLoader color="#ffffff" height={15} width={2} />}
        </FormBtn>
      </Form>
      <span className="text-sm">
        New User?{' '}
        <Link href="/register">
          <span className="text-sky-600">Create Account</span>
        </Link>
      </span>
    </>
  )
}

export default Login
