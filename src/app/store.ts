import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postsSlice from '../features/posts/postsSlice';
import usersSlice from '../features/users/usersSlice'
import notificationsSlice from '../features/notifications/notificationsSlice';
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    users: usersSlice,
    notifications: notificationsSlice,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
