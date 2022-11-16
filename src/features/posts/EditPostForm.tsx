import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

import { useGetPostQuery, useEditPostMutation } from '../api/apiSlice';

const EditPostForm = () => {
  const navigate = useNavigate()
  
  const { postId = '' } = useParams()
  const { data: post } = useGetPostQuery(postId)

  const defaultTitle = (post && post.title) || ''
  const defaultContent = (post && post.content) || ''

  const [title, setTitle] = useState(defaultTitle)
  const [content, setContent] = useState(defaultContent)

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)

  const [updatePost, { isLoading }] = useEditPostMutation()

  const onSaveHandle = async () => {
    if (title && content) {
      await updatePost({
        id: postId,
        title,
        content
      })
      navigate(`/posts/${postId}`)
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

        <button type='button' disabled={isLoading} onClick={onSaveHandle}>Save</button>
      </form>
    </section>
  );
}

export default EditPostForm;
