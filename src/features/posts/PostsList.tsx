import React, { ReactNode, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { RootState, AppDispatch } from '../../app/store'

import { fetchPosts, selectPostIds, selectPostById } from './postsSlice'
import { Post } from './post.types'

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons';

const PostExcerpt = React.memo(({ postId }: { postId: string|number }) => {
  const post = useSelector<RootState, Post|undefined>(state => selectPostById(state, postId))
  return post ? (
    <article className='post-excerpt' key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className='post-content'>{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">View Post</Link>
      <ReactionButtons post={post} />
    </article>
  ) : null
})


export const PostsList = () => {
  const dispatch: AppDispatch = useDispatch()
  const orderedPostIds = useSelector(selectPostIds)
  const postStatus = useSelector<RootState>((state) => state.posts.status)
  const error = useSelector<RootState>((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content: ReactNode|null = null

  if (postStatus === 'loading') {
    content = <>Loading...</>
  } else if (postStatus === 'succeeded') {
    content = orderedPostIds.map(postId => (
      <PostExcerpt postId={postId} key={postId} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error as string}</div>
  }

  return (
    <div className='posts-list'>
      <h2>Posts</h2>
      <div>{ content }</div>
    </div>
  );
}

export default PostsList;
