import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { selectAllUsers } from './usersSlice'

const UsersList = () => {
  const users = useAppSelector(selectAllUsers)
  
  const renderedUsers = users.map(user => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ))
  
  return (
    <>
      <section>
        <h2>User</h2>
        <ul>{renderedUsers}</ul>
      </section>
      <Outlet />
    </>
  );
}

export default UsersList;
