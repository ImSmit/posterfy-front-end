import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsAPI = createApi({
    reducerPath: 'productsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.0.167:8000/api/' }),
    endpoints: (builder) => ({
      getProducts: builder.query({
        query: () => `products`,
      }),
      
      getProduct: builder.query({
        query: (id) => `products/${id}`,
      }),
    }),
  })

export const { useGetProductsQuery, useGetProductQuery } = productsAPI
  