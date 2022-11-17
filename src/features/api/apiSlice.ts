// RTK Query (React-specific)
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from '../posts/post.types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/fakeApi',
    prepareHeaders: (headers) => {
      // modify headers
      return headers
    }
  }),
  tagTypes: ['Post'],
  endpoints: builder => ({
    getPosts: builder.query<Post[], void>({
      // default method GET
      // query: (newPost) => {url: '/posts', method: 'POST', body: newPost}
      query: () => '/posts',
      providesTags: (result = []) => 
        result ? [
          ...result.map(({ id }) => ({ type: 'Post' as const, id })),
          { type: 'Post' },
        ] : [{ type: 'Post' }],
    }),
    getPost: builder.query<Post, string>({
      query: postId => `/posts/${postId}`,
      providesTags: (result, error, arg) => [{ type: 'Post' as const, id: arg }]
    }),
    addNewPost: builder.mutation({
      query: initialPost => ({
        url: '/posts',
        method: 'POST',
        body: initialPost
      }),
      invalidatesTags: ['Post']
    }),
    editPost: builder.mutation({
      query: post => ({
        url: `/posts/${post.id}`,
        method: 'PATCH',
        body: post
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post' as const, id: arg.id }]
    }),
    addReaction: builder.mutation({
      query: ({ postId, reaction }) => ({
        url: `/posts/${postId}/reactions`,
        method: 'POST',
        body: { reaction }
      }),
      async onQueryStarted({ postId, reaction }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getPosts', undefined, darft => {
            console.log(darft)
            const post = darft.find(post => post.id === postId)
            if (post) {
              // @ts-ignore
              post.reactions[reaction]++;
            }
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      // invalidatesTags: (result, error, arg) => [{ type: 'Post' as const, id: arg.postId }]
    })
  })
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  useAddReactionMutation,
} = apiSlice
