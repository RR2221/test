import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabaseClient'
import tw from 'tailwind-styled-components'

interface ImgWrapperProps {
  $zoom: boolean
}

const ImageDownload = ({ imgPath }: { imgPath: string }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const [zoom, setZoom] = useState<boolean>(false)

  const ImgWrapper = tw.div<ImgWrapperProps>`
    ${(p) => (p.$zoom ? 'w-full' : 'w-[100px]')}
    cursor-pointer
  `
  useEffect(() => {
    const downloadImage = async (path: string) => {
      try {
        if (!path) return
        setLoading(true)
        const { data, error } = await supabase.storage
          .from('appends')
          .download(path)
        setLoading(false)
        if (error) throw error
        const url = URL.createObjectURL(data)
        setImgUrl(url)
      } catch (err) {
        console.log(err)
      }
    }
    downloadImage(imgPath)
  }, [imgPath])
  return (
    <div>
      {loading && (
        <div className="w-[2px] h-[2px] bg-black backdrop-blur-sm"></div>
      )}
      {!loading && imgUrl && (
        <ImgWrapper $zoom={zoom}>
          <Image
            src={imgUrl}
            alt="img"
            width={100}
            height={100}
            onClick={() => setZoom(!zoom)}
            className="w-full h-full"
          />
        </ImgWrapper>
      )}
    </div>
  )
}

export default ImageDownload