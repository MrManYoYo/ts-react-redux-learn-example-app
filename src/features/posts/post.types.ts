export interface PostsState {
  posts: Post[]
  status: string
  error: string | null
}

export interface Post {
  id: string
  date: string
  title: string
  content: string
  userId: string
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
