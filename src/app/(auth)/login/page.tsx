'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { AuthError } from '@supabase/supabase-js'
import ScaleLoader from 'react-spinners/ScaleLoader'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { supabase } from '@/lib/supabaseClient'
import { useUserContext } from '@/context/userContext'
import { Heading, Form, Input, FormBtn } from '../style'

const Login = () => {
  const router = useRouter()
  const { setUser, setIsLogin } = useUserContext()
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
      setLoading(false)
      if (error) {
        toast.error(error.message)
        setErr(error)
        throw error
      }
      setUser(data.user || null)
      setIsLogin(true)
      localStorage.setItem('token', data.session.access_token)
      router.push('/')
      toast.success('Welcome!')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <Heading className="xs:flex hidden">Login</Heading>
      <Form onSubmit={handleSubmit(onLogin)}>
        <div className="flex flex-col">
          <span className="xs:flex hidden">Email</span>
          <Input
            placeholder="Enter your email address..."
            {...register('email', {
              required: 'Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
            })}
          />
          <span className="flex justify-end text-red-400 text-sm">
            {errors?.email?.message?.toString()}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="xs:flex hidden">Password</span>
          <Input type="password" {...register('password')} />
        </div>
        <span className="flex justify-end text-red-400 text-sm"></span>
        <FormBtn className="flex items-center justify-center gap-x-2">
          Login
          {loading && <ScaleLoader color="#ffffff" height={15} width={2} />}
        </FormBtn>
      </Form>
      <span className="text-sm">
        New User?{' '}
        <Link href="/register" as="/register">
          <span className="text-sky-600">Create Account</span>
        </Link>
      </span>
    </>
  )
}

export default Login
