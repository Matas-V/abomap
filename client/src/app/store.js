import { configureStore } from '@reduxjs/toolkit';

import { placesApi } from '../features/placesApi';

export const store = configureStore({
  reducer: {
    [placesApi.reducerPath]: placesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(placesApi.middleware);
  },
});
