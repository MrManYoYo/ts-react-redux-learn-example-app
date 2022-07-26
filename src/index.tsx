import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './primitiveui.css';
import { worker } from './api/server'
// import { fetchUsers } from './features/users/usersSlice'

import { usersExtendedApi } from './features/users/usersApiSlice';
const container = document.getElementById('root')!;
const root = createRoot(container);


// root.render(
//   <>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </>
// );

// Wrap app rendering so we can wait for the mock API to initialize
async function start() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: 'bypass' })

  // store.dispatch(fetchUsers())
  store.dispatch(usersExtendedApi.endpoints.getUsers.initiate(undefined))

  root.render(
    // <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    // </React.StrictMode>,
  )

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}

start()
