import React, { ReactNode, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { RootState, AppDispatch } from '../../app/store'

import { selectPosts, fetchPosts } from './postsSlice'
import { Post } from './post.types'

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons';

const PostExcerpt = ({ post }: { post: Post }) => {
  return (
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
  )
}

export const PostsList = () => {
  const dispatch: AppDispatch = useDispatch()
  const posts = useSelector(selectPosts)

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
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map(post => (
      <PostExcerpt post={post} key={post.id} />
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
