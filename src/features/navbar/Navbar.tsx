import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { AppDispatch } from '../../app/store'

import { fetchNotifications, selectNotifications } from '../notifications/notificationsSlice'

function Navbar() {
  const dispatch: AppDispatch = useDispatch();
  const notifications = useSelector(selectNotifications)
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
