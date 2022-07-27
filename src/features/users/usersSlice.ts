import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
const initialState = [
  { id: '1', name: 'Jone' },
  { id: '2', name: 'Peter' },
  { id: '3', name: 'Sam' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
})

export const selectUsers = (state: RootState) => state.users

export default usersSlice.reducer
