import React from 'react';

// router
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

// components
import Navbar from './features/navbar/Navbar'
import PostsList from './features/posts/PostsList'
import AddPostForm from './features/posts/AddPostForm';
import SinglePostPage from './features/posts/SinglePostPage';
import EditPostForm from './features/posts/EditPostForm';
import UsersList from './features/users/UsersList';
import UserPage from './features/users/UserPage';
import Notifications from './features/notifications/NotificationsList'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path='/'
            element={
              <>
                <AddPostForm />
                <PostsList />
              </>
            }>
          </Route>
          <Route path='/posts' element={ <SinglePostPage /> }>
            <Route path=':postId' element={ <SinglePostPage /> }></Route>
          </Route>

          <Route path='/editPost' element={ <EditPostForm /> }>
            <Route path=':postId' element={ <EditPostForm /> }></Route>
          </Route>

          <Route path='/users' element={ <UsersList /> }>
            <Route path=':userId' element={ <UserPage /> }></Route>
          </Route>
          <Route path='/notifications' element={ <Notifications /> }></Route>

          <Route path='*' element={ <div>404</div> }></Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
