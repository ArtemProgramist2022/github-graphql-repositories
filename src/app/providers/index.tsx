import React, { ReactElement } from 'react'
import RouterProvider from './router-provider'
import StoreProvider from './store-provider'

const WithProviders = ({ children }: { children: ReactElement }) => (
  <RouterProvider>
    <StoreProvider>{children}</StoreProvider>
  </RouterProvider>
)

export default WithProviders
