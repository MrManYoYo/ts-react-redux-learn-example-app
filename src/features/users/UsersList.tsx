import React from 'react';
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom';
import { selectUsers } from './usersSlice'

const UsersList = () => {
  const users = useSelector(selectUsers)
  
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