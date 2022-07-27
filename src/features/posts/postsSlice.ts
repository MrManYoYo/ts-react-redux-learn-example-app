import { createSlice, nanoid } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { sub } from 'date-fns'

const initialState = {
  posts: [
    {
      id: '1',
      date: sub(new Date(), { minutes: 10 }).toISOString(),
      title: 'First Post',
      content: 'Hello!',
      userId: '1'
    },
    {
      id: '2',
      date: sub(new Date(), { minutes: 5 }).toISOString(),
      title: 'Second Post',
      content: 'Hello!!',
      userId: '2'
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
      prepare ({ title, content, userId }) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            userId,
          },
          error: null,
          meta: null,
        }
      }
    },
    postUpdated (state, action) {
      const { postId, title, content } = action.payload
      const post = state.posts.find(post => post.id === postId)

      if (post) {
        post.title = title
        post.content = content
      }
    }
  }
})

export const selectPosts = (state: RootState) => state.posts.posts

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer
