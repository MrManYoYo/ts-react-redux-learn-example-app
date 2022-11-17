import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom'
import { createSelector } from '@reduxjs/toolkit';
import { useAppSelector } from '../../app/hooks';

import { selectUserById } from './usersApiSlice'
import { useGetPostsQuery } from '../api/apiSlice';
import { Post } from '../posts/post.types';

const UserPage = () => {
  const { userId = '' } = useParams()
  const user = useAppSelector(state => selectUserById(state, userId!))

  const selectPostsForUser = useMemo(() => {
    return createSelector(
      (res: any) => res.data,
      (res: any, userId: any) => userId,
      (data, userId) => data?.filter((post: Post) => post.user === userId) ?? []
    )
  }, []);

  const { postsForUser } = useGetPostsQuery(undefined, {
    selectFromResult: result => ({
      ...result,
      postsForUser: selectPostsForUser(result, userId)
    })
  })
  
  if (!user) {
    return <div>Not Found</div>
  }



  const postTitles = postsForUser.map((post: Post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))
  
  return (
    <section>
      <h2>{user.name}</h2>
      
      <ul>{postTitles}</ul>
    </section>
  );
}

export default UserPage;
