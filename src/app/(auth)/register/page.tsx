'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthError } from '@supabase/supabase-js'
import { useForm } from 'react-hook-form'

import { supabase } from '@/lib/supabaseClient'
import { Heading, Form, Input, FormBtn } from '../style'
import ScaleLoader from 'react-spinners/ScaleLoader'

const Register = () => {
  const router = useRouter()
  const [err, setErr] = useState<AuthError | null>()
  const [loading, setLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onRegister = async (values: any) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      })
      setErr(error)
      if (error) throw error
      router.push('/login')
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  return (
    <>
      <Heading>Register</Heading>
      <Form onSubmit={handleSubmit(onRegister)}>
        <div className="flex flex-col">
          <span>Email</span>
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
          <span>Password</span>
          <Input
            type="password"
            {...register('password', {
              required: 'Required',
              pattern: {
                value:
                  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,50}$/,
                message: '6-20 characters, 1 number, 1 letter, 1 symbol.',
              },
            })}
          />
          <span className="flex justify-end text-red-400 text-sm">
            {errors?.password?.message?.toString()}
          </span>
        </div>
        <div className="flex flex-col">
          <span>Confirm Password</span>
          <Input
            type="password"
            {...register('cpassword', {
              required: 'Required',
              pattern: {
                value:
                  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,50}$/,
                message: '6-20 characters, 1 number, 1 letter, 1 symbol.',
              },
            })}
          />
          <span className="flex justify-end text-red-400 text-sm">
            {errors?.cpassword?.message?.toString()}
          </span>
        </div>
        <FormBtn className="flex justify-center items-center gap-x-2">
          Register
          {loading && <ScaleLoader color="#ffffff" height={15} width={2} />}
        </FormBtn>
        <span className="text-red-500 text-sm">{err?.message}</span>
      </Form>
    </>
  )
}

export default Register
