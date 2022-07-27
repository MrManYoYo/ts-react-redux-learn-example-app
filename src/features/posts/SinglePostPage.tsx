import React from 'react';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { selectPosts } from './postsSlice'

const SinglePostPage = ({ match }: any) => {
  const { postId } = useParams()

  const posts = useSelector(selectPosts)

  const post = posts.find(post => post.id === postId)

  if (!post) {
    return (
      <section>
        <h2>Not Found</h2>
      </section>
    )
  }
  
  return (
    <section>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </section>
  );
}

export default SinglePostPage;
