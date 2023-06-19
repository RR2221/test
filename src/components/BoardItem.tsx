import React from 'react'
import { useRouter } from 'next/navigation'
import { BsFillHandThumbsUpFill, BsFillReplyFill } from 'react-icons/bs'

const BoardItem = ({
  id,
  title,
  created,
  votes,
  posts,
  views,
  count,
}: {
  id: number
  title: string | null
  created: string | null
  votes: number
  posts: number
  views: number
  count: number
}) => {
  const router = useRouter()

  const getTime = (created_at: string | null): string => {
    if (created_at) {
      const date = new Date(created_at)
      const y = date.getFullYear(),
        m = date.getMonth(),
        d = date.getDate()
      const h = date.getHours(),
        mm = date.getMinutes(),
        s = date.getSeconds()
      return `${y}:${m}:${d} ${h}:${mm}:${s}`
    }
    return 'null'
  }

  const onDetail = () => {
    router.push(`\\detail\\${id}`)
  }
  return (
    <div className="flex w-full overflow-hidden mb-3 p-3 ">
      <div
        onClick={onDetail}
        className="flex w-[80%] justify-between  border-r-4 pr-8 border-yellow-300 hover:bg-slate-50 active:bg-slate-100 bg-none cursor-pointer"
      >
        <div className="flex gap-x-2">
          <div className="flex rounded-3xl w-[50px] h-[50px] bg-red-500 text-white items-center justify-center text-xl">
            {count}
          </div>
          <div>
            <div className="text-blue-400 text-2xl">{title}</div>
            <div className="text-sm text-gray-400">{getTime(created)}</div>
          </div>
        </div>

        <div className="flex gap-x-16">
          <div className="flex flex-col items-center justify-center">
            <div className="text-xl">{votes}</div>
            <div className="text-sm text-gray-400">VOTES</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-xl">{posts}</div>
            <div className="text-sm text-gray-400">POSTS</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-xl">{views}</div>
            <div className="text-sm text-gray-400">VIEWS</div>
          </div>
        </div>
      </div>
      <div className="flex pl-4 gap-x-5 items-center">
        <BsFillHandThumbsUpFill className="cursor-pointer w-full h-[30px] text-yellow-400 hover:text-yellow-500 active:text-yellow-400" />
        <BsFillReplyFill className="cursor-pointer w-full h-[30px] text-black-500 hover:text-gray-300 active:text-black" />
      </div>
    </div>
  )
}

export default BoardItem
