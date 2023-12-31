'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import ImageUpload from '@/components/ImageUpload'
import { Input, Area, PostBtn } from './style'
import { useUserContext } from '@/context/userContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddArticle = () => {
  const router = useRouter()
  const { user, isLogin } = useUserContext()
  const { register, handleSubmit, setValue } = useForm()
  const [imgPath, setImgPath] = useState<string | null>(null)
  const [url, setUrl] = useState<string | null>(null)

  const onArticle = async (values: any) => {
    const { title, content, count, price } = values
    try {
      if (!isLogin) {
        toast.warning('Please log in first!')
        return
      }
      const { error } = await supabase.from('articles').insert([
        {
          title,
          content,
          img_path: imgPath,
          count,
          author_email: user?.email,
          price,
        },
      ])
      if (error) throw error
      setValue('title', '')
      setValue('content', '')
      setValue('count', 0)
      setValue('price', 0)
      setUrl('')
      toast.success('Your article has successfully posted.')
      router.push('/')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onArticle)}
        className="flex flex-col gap-10 sm:w-[500px] w-full"
      >
        <div className="flex flex-col gap-2">
          <span>Title:</span>
          <Input {...register('title')} />
        </div>
        <div className="flex flex-col gap-2">
          <span>Count:</span>
          <Input {...register('count')} />
        </div>
        <div className="flex flex-col gap-2">
          <span>Price:</span>
          <Input {...register('price')} />
        </div>
        <div className="flex flex-col gap-1">
          <span>Content:</span>
          <Area {...register('content')} />
        </div>
        <ImageUpload url={url} setUrl={setUrl} setImgPath={setImgPath} />
        <PostBtn>Add New Article</PostBtn>
      </form>
    </>
  )
}

export default AddArticle
