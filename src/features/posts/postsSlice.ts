import { createSlice, nanoid } from '@reduxjs/toolkit'
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
  reducers: {
    postAdded: {
      reducer (state, action) {
        state.posts.push(action.payload)
      },
      prepare ({ title, content }) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
          error: null,
          meta: null,
        }
      }
    }
  }
})

export const selectPosts = (state: RootState) => state.posts.posts

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer
