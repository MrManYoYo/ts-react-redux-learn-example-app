import React from 'react';
import { useParams, Link } from 'react-router-dom'

import { selectUserById } from './usersSlice'
import { selectPostsByUser } from '../posts/postsSlice'
import { useAppSelector } from '../../app/hooks';

const UserPage = () => {
  const { userId } = useParams()
  const user = useAppSelector(state => selectUserById(state, userId!))
  const postsForUser = useAppSelector(state => selectPostsByUser(state, String(userId)))

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
