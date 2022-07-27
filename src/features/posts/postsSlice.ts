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
