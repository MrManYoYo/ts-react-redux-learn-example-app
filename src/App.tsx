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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path='/' element={ <PostsList /> }></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
