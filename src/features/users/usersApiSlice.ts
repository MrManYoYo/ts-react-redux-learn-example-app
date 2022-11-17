import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiSlice } from "../api/apiSlice";
import { User } from "./users.types";

const usersAdapter = createEntityAdapter<User>()

const initialState = usersAdapter.getInitialState()

export const usersExtendedApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: (resData: User[]) => usersAdapter.setAll(initialState, resData)
    })
  }),
  overrideExisting: false,
})

export const selectUsersResult = usersExtendedApi.endpoints.getUsers.select(undefined)

export const selectUsersData = createSelector(
  selectUsersResult,
  usersResult => usersResult.data
)

export const {
  useGetUsersQuery,
} = usersExtendedApi

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById
} = usersAdapter.getSelectors((state: RootState) => selectUsersData(state) ?? initialState)