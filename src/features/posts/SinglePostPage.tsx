import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks';

import { selectPostById } from './postsSlice'

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo'

const SinglePostPage = ({ match }: any) => {
  const navigate = useNavigate()
  
  const { postId } = useParams()

  const post = useAppSelector(state => selectPostById(state, postId as string))

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
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p>{post.content}</p>
      <button type='button' onClick={onEditHandle}>Edit Post</button>
    </section>
  );
}

export default SinglePostPage;
