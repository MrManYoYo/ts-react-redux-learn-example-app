import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { selectPostById, postUpdated } from './postsSlice'
import { RootState } from '../../app/store'

const EditPostForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { postId } = useParams()
  const post = useSelector((state: RootState) => selectPostById(state, postId))

  const defaultTitle = (post && post.title) || ''
  const defaultContent = (post && post.content) || ''

  const [title, setTitle] = useState(defaultTitle)
  const [content, setContent] = useState(defaultContent)

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)

  const onSaveHandle = () => {
    if (title && content) {
      dispatch(postUpdated({
        postId,
        title,
        content
      }))
      navigate('/')
    }
  }
  
  if (!post) {
    return (
      <section>
        <h2>Not Found</h2>
      </section>
    )
  }
  
  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor='postTitle'>Title:</label>
        <input
          name='postTitle'
          id='postTitle'
          type='text'
          value={title}
          onChange={onTitleChange} />
        <label htmlFor='postContent'>Content:</label>
        <textarea
          name='postContent'
          id='postContent'
          value={content}
          onChange={onContentChange} />

        <button type='button' onClick={onSaveHandle}>Save</button>
      </form>
    </section>
  );
}

export default EditPostForm;
