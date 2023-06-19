'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { supabase } from '@/lib/supabaseClient'
import { useForm } from 'react-hook-form'
import { Heading, Form, Input, FormBtn } from '../style'
import { AuthError } from '@supabase/supabase-js'
import { useUserContext } from '@/context/userContext'
import RotateLoader from 'react-spinners/RotateLoader'

const Login = () => {
  const router = useRouter()
  const { setUser } = useUserContext()
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
      if (data.user?.id) localStorage.setItem('user', data.user?.id)
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
        <FormBtn className="flex items-center justify-center">
          Login
          {loading && <RotateLoader color="#36d7b7" />}
        </FormBtn>
      </Form>
      <span className="text-sm">
        New User?{' '}
        <span className="text-sky-600">
          <Link href="/register">Create Account</Link>
        </span>
      </span>
    </>
  )
}

export default Login
