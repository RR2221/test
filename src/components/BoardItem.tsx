import React from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

interface Article {
  views: number
}

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
  votes: string[] | null
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

  const onDetail = async () => {
    try {
      router.push(`\\detail\\${id}`)
      await supabase
        .from('articles')
        .update({ views: views + 1 })
        .eq('id', id)
    } catch (err) {
      console.log(err)
    }
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
            <div className="text-xl">{votes?.length || 0}</div>
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
    </div>
  )
}

export default BoardItem
