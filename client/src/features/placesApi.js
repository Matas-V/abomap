import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const placesApi = createApi({
  name: 'placesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.REACT_APP_DATA_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      headers.set('authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: ["Places", "Place", "Request", "Requests", "AdminPlaces", "AdminPlace"],
  endpoints: (builder) => ({
    getPlaces: builder.query({
      query: () => '/places',
      providesTags: ["Places"],
    }),
    getPlace: builder.query({
      query: (placeId) => ({
        url: `/places/${placeId}`,
        method: 'GET',
      }),
      providesTags: ["Place"],
    }),
    submitPlace: builder.mutation({
      query: (formData) => ({
        url: '/places',
        method: 'POST',
        body: formData,
      }),
    }),
    likePlace: builder.mutation({
      query: ({ placeId, state }) => ({
        url: `/places/${placeId}/likePlace`,
        method: 'PATCH',
        body: state,
      }),
      invalidatesTags: ['Places', 'Place'],
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
    getAdminRequests: builder.query({
      query: () => ({
        url: '/admin/places/requests',
        method: 'GET',
      }),
      providesTags: ["Requests"],
    }),
    deleteAdminRequest: builder.mutation({
      query: (placeId) => ({
        url: `/admin/places/requests/${placeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Requests"],
    }),
    getAdminRequest: builder.query({
      query: (placeId) => ({
        url: `/admin/places/requests/${placeId}`,
        method: 'GET',
      }),
      providesTags: ["Request"],
    }),
    editAdminRequest: builder.mutation({
      query: ({ id, edit }) => ({
        method: 'POST',
        url: `/admin/requests/edit/${id}`,
        body: edit,
      }),
      invalidatesTags: ['Requests', 'Request'],
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
      }),
      providesTags: ["AdminPlace"],
    }),
    editAdminPlace: builder.mutation({
      query: ({ id, edit }) => ({
        method: 'POST',
        url: `/admin/places/edit/${id}`,
        body: edit,
      }),
      invalidatesTags: ["AdminPlaces", "AdminPlace", 'Place'],
    }),
    moveAdminPlace: builder.mutation({
      query: (placeId) => ({
        url: `/admin/places/save/${placeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Requests"],
    })
  })
});

export const {
  useGetPlacesQuery,
  useGetPlaceQuery,
  useSubmitPlaceMutation,
  useLikePlaceMutation,
  useDeletePlaceMutation,
  useLoginMutation,
  useGetAdminPlacesQuery,
  useDeleteAdminPlaceMutation,
  useGetAdminPlaceQuery,
  useGetAdminRequestsQuery,
  useDeleteAdminRequestMutation,
  useGetAdminRequestQuery,
  useEditAdminRequestMutation,
  useEditAdminPlaceMutation,
  useMoveAdminPlaceMutation,
} = placesApi;