import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const AddApi = createApi({
  reducerPath: 'AddApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/data/' }),

  endpoints: (builder) => ({

    AddUserdb: builder.mutation({
      query: (user) => {
        alert("hii")
        return {
          url: 'Add',
          method: 'POST',
          body: user,
        }
      }
    }),

    getUser: builder.mutation({
      query: (user) => {
        return {
          url: 'list',
          method: "GET",
          body: user,
            headers: {
                "Content-Type": "application/json"
            }
        }
      }
    }),

    UpdateUserdb: builder.mutation({
      query: (user) => {
        alert("hii")
        return {
          url: 'Edit',
          method: 'PUT',
          body: user,
        }
      }
    }),

    DeleteUser: builder.mutation({
      query: (user) => {
        return {
          url: 'list',
          method: "GET",
          body: user,
            headers: {
                "Content-Type": "application/json"
            }
        }
      }
    }),


  }),
})

export const { useAddUserdbMutation, useGetUserMutation } = AddApi