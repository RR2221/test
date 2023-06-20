'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { AuthError } from '@supabase/supabase-js'
import ScaleLoader from 'react-spinners/ScaleLoader'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { supabase } from '@/lib/supabaseClient'
import { Heading, Form, Input, FormBtn } from '../style'

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
      const { email, password, cpassword } = values
      if (password !== cpassword) {
        toast.warning('Password does not match!')
        return
      }
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      setLoading(false)
      if (error) {
        setErr(error)
        toast.error(error.message)
        throw error
      }
      router.push('/login')
      toast.info('Please confirm your email.')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Heading className="xs:flex hidden">Register</Heading>
      <Form onSubmit={handleSubmit(onRegister)}>
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
          <span className="xs:flex hidden">Confirm Password</span>
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
