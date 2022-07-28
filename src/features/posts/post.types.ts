export interface PostsState {
  posts: Post[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

export interface Post {
  id: string
  date: string
  title: string
  content: string
  user: string
  reactions: Reactions
}

export interface Reactions {
  thumbsUp: number
  hooray: number
  heart: number
  rocket: number
  eyes: number
}

export type ReactionsTypes = keyof Reactions;
