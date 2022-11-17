import React from 'react';
import { Post, ReactionsTypes } from './post.types'

import { useAddReactionMutation } from '../api/apiSlice'

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
  const [addReaction] = useAddReactionMutation()

  const renderedButton = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button
      type='button'
      key={name}
      className='muted-button reaction-button'
      onClick={() => {
        addReaction({ postId: post.id, reaction: name })
      }}
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
