import React from 'react';
import { useSelector } from 'react-redux';
import { formatDistanceToNow, parseISO } from 'date-fns'

import { selectUsers } from '../users/usersSlice'
import { selectNotifications } from './notificationsSlice';

const NotificationsList = () => {
  const notifications = useSelector(selectNotifications)
  const users = useSelector(selectUsers)

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find(user => user.id === notification.user) || {
      name: 'Unknown User'
    }
    return (
      <div key={notification.id} className='notification'>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })
  
  return (
    <section className='notificationsList'>
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  );
}

export default NotificationsList;
