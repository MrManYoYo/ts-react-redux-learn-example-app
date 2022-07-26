import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { client } from '../../api/client'

export interface User {
  id: string
  name: string
}

const usersAdapter = createEntityAdapter<User>()

const initialState = usersAdapter.getInitialState()

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
  }
})

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors<RootState>(state => state.users)

export default usersSlice.reducer
