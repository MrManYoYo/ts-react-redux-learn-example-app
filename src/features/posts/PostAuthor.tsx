import React from 'react';
import { useSelector } from 'react-redux'
import { selectUsers } from '../users/usersSlice'

const PostAuthor = ({ userId }: { userId: string }) => {
  const users = useSelector(selectUsers)

  const author = users.find(user => user.id === userId)
  return (
    <span>By { author ? author.name : 'Unknow author' }</span>
  );
}

export default PostAuthor;
