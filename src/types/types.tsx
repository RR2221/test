export interface Article {
  id?: number
  title?: string | null
  content?: string
  count?: number
  img_path?: string
  votes?: string[] | null
  posts?: number[] | null
  views?: number
  author_email?: string
  price?: number
  buyer?: string | null
  created_at?: string | null
}

export interface Reply {
  id?: number
  content?: string
  img_path?: string
  parent_id?: number
  created_at?: string
}
