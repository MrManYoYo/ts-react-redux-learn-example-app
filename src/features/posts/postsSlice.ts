import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
// import { sub } from 'date-fns'
import { PostsState, ReactionsTypes } from './post.types'
import { client } from '../../api/client'
const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

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
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0
            }
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
    },
    reactionAdded (state, action) {
      const { postId, reaction }: { postId: string, reaction: ReactionsTypes } = action.payload
      const post = state.posts.find(post => post.id === postId)

      if (post && Object.prototype.hasOwnProperty.call(post.reactions, reaction)) {
        post.reactions[reaction]++
      }
    },
    clearPosts (state, payload) {
      state.posts = [];
    }
  },
  extraReducers (builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        console.log('set loading')
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'fetch failed'
      })
  }
})



export const selectPosts = (state: RootState) => state.posts.posts
export const selectPostById = (state: RootState, postId?: string) =>
  state.posts.posts.find(post => post.id === postId)

export const { postAdded, postUpdated, reactionAdded, clearPosts } = postsSlice.actions

export default postsSlice.reducer
