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

function App() {
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

          <Route path='*' element={ <div>404</div> }></Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
