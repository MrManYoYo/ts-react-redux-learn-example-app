import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { PostsState, ReactionsTypes, AddPostForm } from './post.types'
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

export const addNewPost = createAsyncThunk<any, AddPostForm>('posts/addNewPost', async initialPost => {
  const response = await client.post('/fakeApi/posts', initialPost)
  return response.data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
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
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
      })
  }
})



export const selectPosts = (state: RootState) => state.posts.posts
export const selectPostById = (state: RootState, postId?: string) =>
  state.posts.posts.find(post => post.id === postId)
export const selectPostsByUser = createSelector(
  [selectPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
)

export const { postUpdated, reactionAdded, clearPosts } = postsSlice.actions

export default postsSlice.reducer
