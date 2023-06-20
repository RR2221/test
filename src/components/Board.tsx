'use client'

import React, { useEffect, useState } from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'
import { supabase } from '@/lib/supabaseClient'
import BoardItem from './BoardItem'
import { Article } from '@/types/types'

const Board = () => {
  const [articles, SetArticles] = useState<Article[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('articles')
          .select('id, title, created_at,votes,views,count,posts')
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
          return <BoardItem key={key} data={item} />
        })}
      <div className="w-full flex justify-center mt-[50px]">
        {loading && <ScaleLoader color="#2da3e7" height={30} width={4} />}
      </div>
    </div>
  )
}

export default Board
