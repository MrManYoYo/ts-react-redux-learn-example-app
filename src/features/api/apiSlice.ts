// RTK Query (React-specific)
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from '../posts/post.types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  tagTypes: ['Post'],
  endpoints: builder => ({
    getPosts: builder.query<Post[], void>({
      // default method GET
      // query: (newPost) => {url: '/posts', method: 'POST', body: newPost}
      query: () => '/posts',
      providesTags: ['Post']
    }),
    getPost: builder.query<Post, string>({
      query: postId => `/posts/${postId}`
    }),
    addNewPost: builder.mutation({
      query: initialPost => ({
        url: '/posts',
        method: 'POST',
        body: initialPost
      }),
      invalidatesTags: ['Post']
    })
  })
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetPostsQuery, useGetPostQuery, useAddNewPostMutation } = apiSlice
