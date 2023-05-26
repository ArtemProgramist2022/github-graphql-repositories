import { configureStore } from '@reduxjs/toolkit'
import { reposApi } from '@/shared/api/repos'

const reducer = {
  [reposApi.reducerPath]: reposApi.reducer,
}

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reposApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
