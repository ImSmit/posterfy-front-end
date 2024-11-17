import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://imsmit.pythonanywhere.com/api/users/' }),
    endpoints: (builder) => ({
      userLoginAPI: builder.mutation({
        query: (credentials) => ({
            url:'login/',
            method: 'POST',
            body: credentials
        }),
      }),

      userRegisterAPI: builder.mutation({
        query: (credentials) => ({
            url:'register/',
            method: 'POST',
            body: credentials
        }),
      }),

      userUpdateAPI: builder.mutation({
        query: ({credentials, token}) => ({
            url:'update/',
            method: 'PUT',
            body: credentials,
            headers: {
              Authorization: `Bearer ${token}`,
          },
        }),
      }),

      userGetAPI: builder.mutation({
        query: ({id, token}) => ({
            url:`${id}`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
          },
        }),
      }),

    }),
  })

export const { useUserLoginAPIMutation, 
  useUserRegisterAPIMutation, 
  useUserUpdateAPIMutation,
  useUserGetAPIMutation } = usersAPI
