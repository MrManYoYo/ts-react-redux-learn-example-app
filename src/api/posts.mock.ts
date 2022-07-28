const postsResponse = {
  status: 200,
  message: 'success',
  data: {
    total: 6,
    list: [
      { id: '1', title: 'Post-1', content: 'Hello!', date: new Date().toISOString(), userId: '1',
        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 } },
      { id: '2', title: 'Post-2', content: 'Hello!', date: new Date().toISOString(), userId: '2',
        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 } },
      { id: '3', title: 'Post-3', content: 'Hello!', date: new Date().toISOString(), userId: '2',
        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 } },
      { id: '4', title: 'Post-4', content: 'Hello!', date: new Date().toISOString(), userId: '3',
        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 } },
      { id: '5', title: 'Post-5', content: 'Hello!', date: new Date().toISOString(), userId: '1',
        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 } },
      { id: '6', title: 'Post-6', content: 'Hello!', date: new Date().toISOString(), userId: '3',
        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 } },
    ]
  }
}

const PostsAPI = {
  fetchPosts (): Promise<typeof postsResponse> {
    return Promise.resolve(postsResponse)
  }
}

export default PostsAPI
