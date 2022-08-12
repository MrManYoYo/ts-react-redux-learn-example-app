// RTK Query (React-specific)
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from '../posts/post.types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  endpoints: builder => ({
    getPosts: builder.query<Post[], void>({
      // default method GET
      // query: (newPost) => {url: '/posts', method: 'POST', body: newPost}
      query: () => '/posts'
    })
  })
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetPostsQuery } = apiSlice
