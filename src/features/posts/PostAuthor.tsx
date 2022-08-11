import React from 'react';
import { selectUserById } from '../users/usersSlice'
import { useAppSelector } from '../../app/hooks';

const PostAuthor = ({ userId }: { userId: string }) => {
  const author = useAppSelector(state => selectUserById(state, userId))

  return (
    <span>By { author ? author.name : 'Unknow author' }</span>
  );
}

export default PostAuthor;
