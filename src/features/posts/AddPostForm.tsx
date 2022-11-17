import React, { useState } from 'react';

import { selectAllUsers } from '../users/usersApiSlice'
import { useAddNewPostMutation } from '../api/apiSlice';
import { User } from '../users/users.types';
import { useSelector } from 'react-redux';

const AddPostForm = () => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const [addNewPost, { isLoading }] = useAddNewPostMutation();
  const users = useSelector(selectAllUsers)

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
  const onUserChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value);

  const canSave = [title, content, userId].every(Boolean) && !isLoading
  
  const onSaveHandle = async () => {
    if (canSave) {
      try {
        await addNewPost({ title, content, user: userId }).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.log('Failed to save the post')
        console.log(err)
      }
    }
  }


  const renderedUserOption = (users as User[]).map(user => (
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
