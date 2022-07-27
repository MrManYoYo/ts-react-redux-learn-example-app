import React, { useState } from 'react';
import { useDispatch } from 'react-redux'

import { postAdded } from './postsSlice'

const AddPostForm = () => {
  const dispatch = useDispatch();
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  const onSaveHandle = () => {
    if (title && content) {
      dispatch(postAdded({ title, content }))
      setTitle('')
      setContent('')
    }
  }
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
