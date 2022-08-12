import React, { ReactNode, useMemo } from 'react';
import { Link } from 'react-router-dom'
import classNames from 'classnames';

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
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
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
    const _sortedPosts = sortedPosts.map((post: Post) => (
      <PostExcerpt post={post} key={post.id} />
    ))

    const containerClassnames = classNames('posts-container', {
      disabled: isFetching
    })

    content = <div className={containerClassnames}>{_sortedPosts}</div>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <div className='posts-list'>
      <h2>Posts</h2>
      <button onClick={refetch}>Refetch Posts</button>
      <div>{ content }</div>
    </div>
  );
}

export default PostsList;
