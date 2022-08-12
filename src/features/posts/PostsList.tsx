import React, { ReactNode, useMemo } from 'react';
import { Link } from 'react-router-dom'

import { useGetPostsQuery } from '../api/apiSlice';

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons';
import { Post } from './post.types';

const PostExcerpt = React.memo(({ post }: { post: Post }) => {
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
  // const orderedPostIds = useAppSelector(selectPostIds)
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery()

  const sortedPosts = useMemo(() => {
    const _sortedPosts = posts.slice()
    _sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
    return _sortedPosts
  }, [posts])

  let content: ReactNode|null = null

  if (isLoading) {
    content = <>Loading...</>
  } else if (isSuccess) {
    content = sortedPosts.map((post: Post) => (
      <PostExcerpt post={post} key={post.id} />
    ))
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <div className='posts-list'>
      <h2>Posts</h2>
      <div>{ content }</div>
    </div>
  );
}

export default PostsList;
