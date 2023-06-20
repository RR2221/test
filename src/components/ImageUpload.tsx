import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabaseClient'
import ScaleLoader from 'react-spinners/ScaleLoader'
import { AiOutlineCloudUpload } from 'react-icons/Ai'

const ImageUpload = ({
  url,
  setUrl,
  setImgPath,
}: {
  url: string | null
  setUrl: (url: string | null) => void
  setImgPath: (imgPath: string | null) => void
}) => {
  const [uploading, setUploading] = useState(false)
  const uploadAvatar = async (event: any) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const arr = file.name.split('.')
      const filePath = `${arr[0]}-${new Date().getTime()}.${
        arr[arr.length - 1]
      }`

      let { error: uploadError } = await supabase.storage
        .from('appends')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const absolutePath = URL.createObjectURL(file)
      setUrl(absolutePath)
      setImgPath(filePath)
    } catch (error) {
      console.log(error)
      alert('Error uploading avatar!')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="w-full">
      {url && (
        <Image
          src={url}
          alt="avatar"
          width={100}
          height={100}
          priority={true}
          className="w-full h-auto"
        />
      )}
      <label
        className="button primary border-2 shadow-sm bg-slate-300 border-gray-500 h-[50px] w-full rounded-md flex items-center justify-center "
        htmlFor="single"
      >
        {uploading ? (
          <ScaleLoader color="#2da3e7" height={10} width={3} />
        ) : (
          <AiOutlineCloudUpload className="w-[20px] h-[20px]" />
        )}
      </label>
      <input
        type="file"
        id="single"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
        className="hidden absolute"
      />
    </div>
  )
}

export default ImageUpload
