import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { AppDispatch } from '../../app/store'

import { fetchNotifications } from '../notifications/notificationsSlice'

function Navbar() {
  const dispatch: AppDispatch = useDispatch()
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
            <Link to='/notifications'>Notifications</Link>
          </div>
          <button className='button' onClick={fetchNewNotifications}>Refresh Notifications</button>
        </div>
      </section>
    </nav>
  );
}

export default Navbar;
