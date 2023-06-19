'use client'
import React, { useEffect, useState } from 'react'
import { Container } from './style'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import { ClipLoader } from 'react-spinners'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsFillHandThumbsUpFill, BsFillReplyFill } from 'react-icons/bs'
import { useUserContext } from '@/context/userContext'
import tw from 'tailwind-styled-components'
interface Article {
  title: string
  content: string
  img_path: string
  votes: string[] | null
}

const DetailView = ({ params }: { params: { id: number } }) => {
  const [data, setData] = useState<Article | null>(null)
  const [imgUrl, setImgUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [zoom, setZoom] = useState<boolean>(false)
  const { user, setUser } = useUserContext()
  const [index, setIndex] = useState<number>(-1)
  const [isVote, setIsVote] = useState<boolean>(false)
  useEffect(() => {
    const downloadImage = async (path: string) => {
      try {
        const { data, error } = await supabase.storage
          .from('appends')
          .download(path)
        if (error) throw error
        const url = URL.createObjectURL(data)
        setImgUrl(url)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
    }

    const getData = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('articles')
          .select('title,content,img_path,votes')
          .eq('id', params.id)
        if (error) throw error
        setData(data[0])
        if (data[0].img_path) downloadImage(data[0].img_path)
        else {
          setLoading(false)
        }
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
    }
    getData()
  }, [params.id])

  useEffect(() => {
    if (data?.votes && user?.email) {
      const { votes } = data
      const id = votes.findIndex((email: string) => {
        return email === user.email
      })
      if (id !== -1) setIsVote(true)
      else setIsVote(false)
      setIndex(id)
    }
  }, [data, user?.email])

  const onVote = async () => {
    if (!loading && data && user && user.email) {
      let newVotes: string[]
      if (data.votes) newVotes = data.votes
      else newVotes = []
      if (index === -1) {
        newVotes.push(user.email)
        setIndex(newVotes.length - 1)
      } else {
        newVotes.splice(index, 1)
        setIndex(-1)
      }
      await supabase
        .from('articles')
        .update({ votes: newVotes })
        .eq('id', params.id)
      setIsVote(!isVote)
    }
  }
  interface VoteProps {
    $vote: boolean
  }

  const Vote = tw.label<VoteProps>`
  ${(p) => (p.$vote ? 'text-yellow-400' : 'text-gray-400')}
  cursor-pointer  
  hover:text-yellow-500
  active:text-yellow-400
  `
  return (
    <div className="w-full flex justify-center">
      {zoom && (
        <div className="absolute w-full h-[90%] bg-white backdrop-blur-xl flex justify-center items-center">
          <Image
            src={imgUrl}
            alt="img"
            width={50}
            height={50}
            blurDataURL={'@/assets/images/logo.png'}
            className="w-[50%] max-h-[90%]"
          ></Image>
          <AiFillCloseCircle
            className="absolute right-10 top-10"
            width={30}
            height={30}
            onClick={() => setZoom(false)}
          />
        </div>
      )}
      <Container>
        <div>
          <div className="text-3xl text-blue-400">{data?.title}</div>
          <div className="flex justify-end">
            <div className="flex pl-4 gap-x-5 items-center">
              <Vote $vote={isVote} onClick={onVote}>
                <BsFillHandThumbsUpFill className="w-full h-[30px]" />
              </Vote>
              <BsFillReplyFill className="cursor-pointer w-full h-[30px] text-gray-500 hover:text-gray-300 active:text-black" />
            </div>
          </div>
        </div>
        <hr />
        <div className="px-3 pt-4">
          <div className="text-sm">{data?.content}</div>
        </div>
        {!loading && imgUrl && (
          <Image
            src={imgUrl}
            alt="img"
            width={50}
            height={50}
            blurDataURL={'@/assets/images/logo.png'}
            onClick={() => setZoom(true)}
          ></Image>
        )}
        {loading && (
          <div className="w-full flex justify-center">
            <ClipLoader color="#222222" size={50} speedMultiplier={2} />
          </div>
        )}
      </Container>
    </div>
  )
}

export default DetailView
