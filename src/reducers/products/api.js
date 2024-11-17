import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsAPI = createApi({
    reducerPath: 'productsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://imsmit.pythonanywhere.com/api/' }),
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
  