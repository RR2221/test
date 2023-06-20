'use client'

import React, { useEffect, useState } from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'
import { supabase } from '@/lib/supabaseClient'
import BoardItem from './BoardItem'

interface Article {
  id: number
  title: string | null
  count: number
  created_at: string | null
  votes: string[] | null
  posts: number
  views: number
}

const Board = () => {
  const [articles, SetArticles] = useState<Article[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('articles')
          .select('id, title, created_at,votes,posts,views,count')
          .order('id', { ascending: false })
        if (error) throw error
        setLoading(false)
        SetArticles(data)
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
    }
    getData()
  }, [])

  return (
    <div>
      {!loading &&
        articles?.map((item, key) => {
          return (
            <BoardItem
              key={key}
              id={item.id}
              title={item.title}
              created={item.created_at}
              votes={item.votes}
              posts={item.posts}
              views={item.views}
              count={item.count}
            />
          )
        })}
      <div className="w-full flex justify-center mt-[20px]">
        {loading && <ScaleLoader color="#2da3e7" height={50} width={4} />}
      </div>
    </div>
  )
}

export default Board
