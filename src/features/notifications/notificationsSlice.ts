import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../../app/store'
import { client } from '../../api/client'
interface Notification {
  [propName: string]: any;
}

const notificationsAdapter = createEntityAdapter<Notification>({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = notificationsAdapter.getInitialState();

export const fetchNotifications = createAsyncThunk<any, void, {
  dispatch: AppDispatch,
  state: RootState
}>('notifications/fetchNotifications', async (_, { getState }) => {
  const allNotifications = selectAllNotifications(getState())
  console.log('allNotifications', allNotifications)
  const [latestNotification] = allNotifications
  const latestTimestamp = latestNotification ? latestNotification.date : ''
  const response = await client.get(`/fakeApi/notifications?since=${latestTimestamp}`)
  return response.data
})

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    allNotificationsRead (state) {
      Object.values(state.entities).forEach(notification => {
        notification!.read = true
      })
    }
  },
  extraReducers (builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      if (action.payload && Array.isArray(action.payload)) {
        Object.values(state.entities).forEach(notification => {
          // Any notifications we've read are no longer new
          notification!.isNew = !notification!.read
        })
        notificationsAdapter.upsertMany(state, action.payload)
      }
    })
  }
})

export const { allNotificationsRead } = notificationsSlice.actions
export default notificationsSlice.reducer

export const { selectAll: selectAllNotifications } =
  notificationsAdapter.getSelectors<RootState>(state => state.notifications)