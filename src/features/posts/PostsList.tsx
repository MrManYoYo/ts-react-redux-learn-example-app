import React from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectPosts } from './postsSlice'

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo'

export const PostsList = () => {
  const posts = useSelector(selectPosts)

  const renderedPosts = posts.map((post) => (
    <article className='post-excerpt' key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className='post-content'>{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">View Post</Link>
    </article>
  ))
  
  return (
    <div className='posts-list'>
      <h2>Posts</h2>
      <div>{renderedPosts}</div>
    </div>
  );
}

export default PostsList;
