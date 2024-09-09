import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://medix-backend-k0q1.onrender.com',
  credentials: 'include', // Include credentials like cookies in requests
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => '/data', // Assuming your endpoint is /data
    }),
  }),
});

export const { useGetDataQuery } = apiSlice;
