'use client'
import React, { useEffect, useState } from 'react'
import { Container } from './style'
import { supabase } from '@/lib/supabaseClient'
import { BsFillHandThumbsUpFill, BsFillReplyFill } from 'react-icons/bs'
import { useUserContext } from '@/context/userContext'
import tw from 'tailwind-styled-components'
import ImageUpload from '@/components/ImageUpload'
import ImageDownload from '@/components/ImageDownload'
import PurchaseModal from '@/components/PurchaseModal'
import { Article, Reply } from '@/types/types'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Area = tw.textarea`
rounded-xl
p-[10px]
border-2 border-stone-300/200
resize-none
`
interface VoteProps {
  $vote: boolean
}

const DetailView = ({ params }: { params: { id: number } }) => {
  const { user, isLogin } = useUserContext()
  const [url, setUrl] = useState<string | null>(null)
  const [data, setData] = useState<Article | null>(null)
  const [index, setIndex] = useState<number>(-1)
  const [isVote, setIsVote] = useState<boolean>(false)
  const [isBuyer, setIsBuyer] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [isReply, setIsReply] = useState<boolean>(false)
  const [imgPath, setImgPath] = useState<string | null>(null)
  const [replies, setReplies] = useState<Reply[] | null>(null)
  const [replyContent, setReplyContent] = useState<string>('')
  const [isReplyAdded, setIsReplyAdded] = useState<number>(0)
  const [posts, setPosts] = useState<number[] | null>(null)

  const Vote = tw.label<VoteProps>`
  ${(p) => (p.$vote ? 'text-yellow-400' : 'text-gray-400')}
  cursor-pointer  
  hover:text-yellow-500
  active:text-yellow-400
  `
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('articles')
          .select('title,content,img_path,votes,author_email,price,posts,buyer')
          .eq('id', params.id)
        setLoading(false)
        if (error) throw error
        setData(data[0])
        setPosts(data[0].posts)
      } catch (err) {
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
  useEffect(() => {
    if (data?.buyer && user?.email) {
      const { buyer } = data
      if (buyer === user.email) setIsBuyer(true)
      else setIsBuyer(false)
    }
  }, [data, user?.email])
  useEffect(() => {
    const getReplies = async () => {
      try {
        const { data, error } = await supabase
          .from('replies')
          .select('content,img_path')
          .eq('parent_id', params.id)
        if (error) throw error
        setReplies(data)
      } catch (err) {
        console.log(err)
      }
    }
    getReplies()
  }, [params.id, isReplyAdded])
  const onVote = async () => {
    if (!isLogin) {
      toast.warning('Please log in first.')
      return
    }
    if (!loading && data && user && user.email) {
      let newVotes: string[]
      if (data.votes) newVotes = data.votes
      else newVotes = []
      setIsVote(!isVote)
      if (index === -1) {
        newVotes.push(user.email)
        setIndex(newVotes.length - 1)
        toast.success('Thumbs Up!')
      } else {
        newVotes.splice(index, 1)
        setIndex(-1)
        toast.success('Thumbs Down!')
      }
      const { error } = await supabase
        .from('articles')
        .update({ votes: newVotes })
        .eq('id', params.id)
      if (error) throw error
    }
  }
  const IncPostsCount = async (id: number) => {
    try {
      if (id) {
        let newPosts: number[] = []
        newPosts = posts || []
        newPosts.push(id)
        const { error } = await supabase
          .from('articles')
          .update({ posts: newPosts })
          .eq('id', params.id)
        if (error) throw error
      }
    } catch (err) {
      console.log(err)
    }
  }
  const onReply = async () => {
    try {
      if (!isLogin) {
        toast.warning('Please log in first.')
        return
      }
      const { data, error } = await supabase
        .from('replies')
        .insert([
          { content: replyContent, img_path: imgPath, parent_id: params.id },
        ])
        .select('id')
      if (error) throw error
      setReplyContent('')
      setUrl('')
      setImgPath('')
      setIsReplyAdded(isReplyAdded + 1)
      IncPostsCount(data[0].id)
      toast.success('Your reply successfully submitted.')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="w-full h-screen flex-col">
      <div className="w-full h-[75%]  flex justify-center ">
        <Container className="shadow-sm overflow-y-scroll scroll-smooth">
          <div>
            <div className="text-3xl text-blue-400">{data?.title}</div>
            <div className="flex justify-end">
              <div className="flex pl-4 gap-x-5">
                <Vote $vote={isVote} onClick={onVote}>
                  <BsFillHandThumbsUpFill className="w-full h-[20px]" />
                </Vote>
                <div
                  className="cursor-pointer  text-gray-500 hover:text-gray-300 active:text-black"
                  onClick={() => {
                    if (!isLogin) toast.warning('Please log in first.')
                    else setIsReply(!isReply)
                  }}
                >
                  <BsFillReplyFill className="w-full h-[20px]" />
                </div>
                <PurchaseModal id={params.id} isBuyer={isBuyer} />
              </div>
            </div>
          </div>
          <hr />
          <div className="px-3 pt-4 gap-y-1 flex flex-col">
            <div className="text-md">{data?.content}</div>
            {data?.img_path && <ImageDownload imgPath={data.img_path} />}
            <div className=" flex justify-end text-gray-500 text-sm">
              <div className="flex flex-col gap-y-1">
                <span>price: {data?.price}$</span>
                <span>owner: {data?.author_email}</span>
              </div>
            </div>
          </div>
          {replies &&
            replies.map((item: Reply, key: number) => {
              return (
                <div key={key}>
                  <hr />
                  <div className="px-3 pt-4 gap-y-1 flex flex-col">
                    {item.content}
                    {item.img_path && <ImageDownload imgPath={item.img_path} />}
                  </div>
                </div>
              )
            })}
        </Container>
      </div>
      {isReply && (
        <div className="w-full h-[15%] flex justify-center">
          <div className="w-full max-w-[900px] flex flex-col gap-y-4">
            <hr className="w-full" />
            <span>Content</span>
            <div className="flex flex-col xs:flex-row justify-between gap-x-5">
              <div className="flex flex-col w-full gap-y-5">
                <Area
                  className="w-full"
                  value={replyContent}
                  onChange={(e) => {
                    setReplyContent(e.target.value)
                  }}
                />
                <div className="w-full flex justify-end">
                  <button
                    onClick={onReply}
                    className="flex justify-end border w-min px-2 py-1 border-stone-300 rounded-md shadow-sm"
                  >
                    Reply
                  </button>
                </div>
              </div>
              <div className="xs:w-[15%] w-full">
                <ImageUpload
                  url={url}
                  setUrl={setUrl}
                  setImgPath={setImgPath}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailView
