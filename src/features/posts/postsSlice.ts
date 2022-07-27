import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

const initialState = {
  posts: [
    {
      id: '1',
      title: 'First Post',
      content: 'Hello!'
    },
    {
      id: '2',
      title: 'Second Post',
      content: 'Hello!!'
    },
  ],
  status: 'idle',
  error: null,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {}
})

export const selectPosts = (state: RootState) => state.posts.posts

export default postsSlice.reducer
