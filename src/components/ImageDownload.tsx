import React, { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components'
import Image from 'next/image'

import { supabase } from '@/lib/supabaseClient'
import ScaleLoader from 'react-spinners/ScaleLoader'

interface ImgWrapperProps {
  $zoom: boolean
}

const ImageDownload = ({ imgPath }: { imgPath: string }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const [zoom, setZoom] = useState<boolean>(false)

  const ImgWrapper = tw.div<ImgWrapperProps>`
    ${(p) => (p.$zoom ? 'w-full h-auto' : 'w-[10%] h-auto min-w-[50px]')}
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
      {loading && <ScaleLoader color="#2da3e7" height={5} width={2} />}
      {!loading && imgUrl && (
        <ImgWrapper $zoom={zoom}>
          <Image
            src={imgUrl}
            alt="img"
            width={100}
            height={100}
            priority={true}
            onClick={() => setZoom(!zoom)}
            className="w-auto h-auto"
          />
        </ImgWrapper>
      )}
    </div>
  )
}

export default ImageDownload
