import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatDistanceToNow, parseISO } from 'date-fns'
import classNames from 'classnames';
import { AppDispatch } from '../../app/store';


import { selectAllUsers } from '../users/usersSlice'
import { selectAllNotifications, allNotificationsRead } from './notificationsSlice';

const NotificationsList = () => {
  const dispatch: AppDispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectAllUsers)

  useEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find(user => user.id === notification.user) || {
      name: 'Unknown User'
    }

    const notificationClassname = classNames('notification', {
      new: notification.isNew
    })
    return (
      <div key={notification.id} className={notificationClassname}>
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
