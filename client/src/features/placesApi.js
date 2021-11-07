import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const placesApi = createApi({
  name: 'placesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      headers.set('authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: ["Places", "AdminPlaces"],
  endpoints: (builder) => ({
    getPlaces: builder.query({
      query: () => '/places',
      providesTags: ["Places"],
    }),
    getPlace: builder.query({
      query: (placeId) => ({
        url: `/places/${placeId}`,
        method: 'GET',
      })
    }),
    likePlace: builder.mutation({
      query: ({ placeId, state }) => ({
        url: `/places/${placeId}/likePlace`,
        method: 'PATCH',
        body: state,
      }),
      invalidatesTags: ['Places'],
    }),
    deletePlace: builder.mutation({
      query: (placeId) => ({
        url: `/places/${placeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Places'],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/admin/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getAdminPlaces: builder.query({
      query: () => ({
        url: '/admin/places',
        method: 'GET',
      }),
      providesTags: ["AdminPlaces"],
    }),
    deleteAdminPlace: builder.mutation({
      query: (placeId) => ({
        url: `/admin/places/${placeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["AdminPlaces"],
    }),
    getAdminPlace: builder.query({
      query: (placeId) => ({
        url: `/admin/places/${placeId}`,
        method: 'GET',
      })
    }),
    moveAdminPlace: builder.mutation({
      query: (placeId) => ({
        url: `/admin/places/save/${placeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["AdminPlaces"],
    })
  })
});

export const {
  useGetPlacesQuery,
  useGetPlaceQuery,
  useLikePlaceMutation,
  useDeletePlaceMutation,
  useLoginMutation,
  useGetAdminPlacesQuery,
  useDeleteAdminPlaceMutation,
  useGetAdminPlaceQuery,
  useMoveAdminPlaceMutation,
} = placesApi;