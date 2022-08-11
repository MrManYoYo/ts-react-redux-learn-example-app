import React from 'react';
import { reactionAdded } from './postsSlice'

import { useAppDispatch } from '../../app/hooks';

import { Post, ReactionsTypes } from './post.types'

interface Props {
  post: Post
}

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

const ReactionButtons = ({ post }: Props) => {
  const dispatch = useAppDispatch()

  const renderedButton = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button
      type='button'
      key={name}
      className='muted-button reaction-button'
      onClick={() => dispatch(reactionAdded({
        postId: post.id,
        reaction: name
      }))}
    >
      {emoji} {post.reactions[name as ReactionsTypes]}
    </button>
  ))
  return (
    <div>
      {renderedButton}
    </div>
  );
}

export default ReactionButtons;
