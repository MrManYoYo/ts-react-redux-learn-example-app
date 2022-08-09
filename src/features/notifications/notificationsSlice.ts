import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { client } from '../../api/client'

interface Notification {
  [propName: string]: any;
}

const initialState: Notification[] = [];

export const selectNotifications = (state: RootState) => state.notifications

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async (_, { getState }) => {
  const allNotifications = selectNotifications(getState() as RootState)
  const [latestNotification] = allNotifications
  const latestTimestamp = latestNotification ? latestNotification.date : ''
  const response = await client.get(`/fakeApi/notifications?since=${latestTimestamp}`)
  return response.data
})

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      if (action.payload && Array.isArray(action.payload)) {
        state.push(...action.payload)
        state.sort((a, b) => b.date.localeCompare(a.date))
      }
    })
  }
})

export default notificationsSlice.reducer
