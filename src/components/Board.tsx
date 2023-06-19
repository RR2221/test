'use client'

import React, { useEffect, useState, CSSProperties } from 'react'
import PuffLoader from 'react-spinners/PuffLoader'
import { supabase } from '@/lib/supabaseClient'
import BoardItem from './BoardItem'

interface Article {
  id: number
  title: string | null
  count: number
  created_at: string | null
  votes: number
  posts: number
  views: number
}

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
}

const Board = () => {
  const [articles, SetArticles] = useState<Article[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  let [color, setColor] = useState('#36d7b7')
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('articles')
          .select('id, title, created_at,votes,posts,views,count')
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
      {loading && (
        <PuffLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="mt-[20px]"
        />
      )}
    </div>
  )
}

export default Board
