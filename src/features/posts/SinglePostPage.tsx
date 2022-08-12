import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'

import { useGetPostQuery } from '../api/apiSlice'

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo'

const SinglePostPage = ({ match }: any) => {
  const navigate = useNavigate()
  
  const { postId } = useParams()

  const {
    data: post,
    isFetching,
    isSuccess,
  } = useGetPostQuery(String(postId))

  const onEditHandle = () => {
    navigate(`/editPost/${postId}`)
  }
  
  return isFetching ? (
    <section>
      <h2>Loading...</h2>
    </section>
  ) : isSuccess ? (
    <section>
      <h2>{post.title}</h2>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p>{post.content}</p>
      <button type='button' onClick={onEditHandle}>Edit Post</button>
    </section>
  ) : (
    <section>
      <h2>Not Found</h2>
    </section>
  );
}

export default SinglePostPage;
