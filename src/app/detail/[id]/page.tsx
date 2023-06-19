import React from 'react'
import { useRouter } from 'next/navigation'

const DetailView = ({ id }: { id: number }) => {
  const router = useRouter()
  return (
    <div>
      <div>detail header</div>
      <div>detail body</div>
      <div>{}</div>
    </div>
  )
}

export default DetailView
