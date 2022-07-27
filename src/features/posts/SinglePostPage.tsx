import React from 'react';
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { selectPosts } from './postsSlice'

import PostAuthor from './PostAuthor';

const SinglePostPage = ({ match }: any) => {
  const navigate = useNavigate()
  
  const { postId } = useParams()

  const posts = useSelector(selectPosts)

  const post = posts.find(post => post.id === postId)

  const onEditHandle = () => {
    navigate(`/editPost/${postId}`)
  }

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
      <p>
        <PostAuthor userId={post.userId} />
      </p>
      <button type='button' onClick={onEditHandle}>Edit Post</button>
    </section>
  );
}

export default SinglePostPage;
