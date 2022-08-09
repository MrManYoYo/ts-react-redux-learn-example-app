import React from 'react';
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store';
import { selectUserById, User } from '../users/usersSlice'

const PostAuthor = ({ userId }: { userId: string }) => {
  const author = useSelector<RootState, User|undefined>(state => selectUserById(state, userId))

  return (
    <span>By { author ? author.name : 'Unknow author' }</span>
  );
}

export default PostAuthor;
