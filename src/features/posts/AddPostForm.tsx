import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../app/store'
import { addNewPost } from './postsSlice'
import { selectUsers } from '../users/usersSlice'

const AddPostForm = () => {
  const dispatch: AppDispatch = useDispatch();

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addReqStatus, setAddReqStatus] = useState('idle')

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
  const onUserChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value);

  const canSave = [title, content, userId].every(Boolean) && addReqStatus === 'idle'
  
  const onSaveHandle = async () => {
    if (canSave) {
      try {
        setAddReqStatus('pending')
        const result = await dispatch(addNewPost({ title, content, user: userId })).unwrap()
        console.log(result)
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.log('Failed to save the post')
        console.log(err)
      } finally {
        setAddReqStatus('idle')
      }
    }
  }

  const users = useSelector(selectUsers)

  const renderedUserOption = users.map(user => (
    <option value={user.id} key={user.id}>{user.name}</option>
  ))
  return (
    <section>
      <h2>Add New Post</h2>
      <form>
        <label htmlFor='postTitle'>Title: </label>
        <input
          type='text'
          id='postTitle'
          name='postTitle'
          value={title}
          onChange={onTitleChanged}
          placeholder='Enter post title' />

        <label htmlFor='postAuthor'>Author: </label>
        <select value={userId} onChange={onUserChanged} placeholder='Choose post author'>
          <option value=''></option>
          {renderedUserOption}
        </select>
        <label htmlFor='postContent'>Content: </label>
        <textarea
          name="postContent"
          id="postContent"
          rows={3}
          value={content}
          onChange={onContentChanged}
          placeholder='Enter post content'></textarea>

        <button type='button' onClick={onSaveHandle}>Save</button>
      </form>
    </section>
  );
}

export default AddPostForm;
