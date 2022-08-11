import React from 'react';
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

import { fetchNotifications, selectAllNotifications } from '../notifications/notificationsSlice'

const Navbar = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectAllNotifications)
  const numUnread = notifications.filter(n => !n.read).length

  let unreadBadge = numUnread > 0 ? (
    <span className='badge'>{numUnread}</span>
  ) : null

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to='/'>Back</Link>
            <Link to='/users'>Users</Link>
            <Link to='/notifications'>Notifications {unreadBadge}</Link>
          </div>
          <button className='button' onClick={fetchNewNotifications}>Refresh Notifications</button>
        </div>
      </section>
    </nav>
  );
}

export default Navbar;
