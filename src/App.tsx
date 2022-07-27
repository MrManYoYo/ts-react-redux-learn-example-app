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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path='/' element={ <>
            <AddPostForm />
            <PostsList />
          </> }></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
