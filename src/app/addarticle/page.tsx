'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabaseClient'
import { Input, Area, PostBtn } from './style'
import ImageUpload from '@/components/ImageUpload'
import { useRouter } from 'next/navigation'

const AddArticle = () => {
  const router = useRouter()
  const { register, handleSubmit, setValue } = useForm()
  const [imgPath, setImgPath] = useState<string | null>(null)
  const [url, setUrl] = useState<string | null>(null)

  const onArticle = async (values: any) => {
    const { title, content, count } = values
    try {
      const { error } = await supabase
        .from('articles')
        .insert([{ title, content, img_path: imgPath, count }])
      if (error) throw error
      setValue('title', '')
      setValue('content', '')
      setValue('count', 0)
      setUrl('')
      router.push('/')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onArticle)}
      className="flex flex-col gap-10 w-[500px]"
    >
      <div className="flex flex-col gap-2">
        <span>Title:</span>
        <Input {...register('title')} />
      </div>
      <div className="flex flex-col gap-2">
        <span>Count:</span>
        <Input {...register('count')} />
      </div>
      <div className="flex flex-col gap-1">
        <span>Content:</span>
        <Area {...register('content')} />
      </div>
      <ImageUpload url={url} setUrl={setUrl} setImgPath={setImgPath} />
      <PostBtn>Add New Article</PostBtn>
    </form>
  )
}

export default AddArticle
