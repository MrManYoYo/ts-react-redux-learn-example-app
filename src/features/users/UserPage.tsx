import React from 'react';
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import { RootState } from '../../app/store'
import { selectUserById, User } from './usersSlice'
import { selectPostsByUser } from '../posts/postsSlice'
import { Post } from '../posts/post.types'

const UserPage = () => {
  const { userId } = useParams()
  const user = useSelector<RootState, User|undefined>(state => selectUserById(state, userId!))
  const postsForUser = useSelector<RootState, Post[]|[]>(state => selectPostsByUser(state, userId as string))

  if (!user) {
    return <div>Not Found</div>
  }

  const postTitles = postsForUser.map(post => (
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
