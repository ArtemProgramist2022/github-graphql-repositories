import React, { FC, ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'

const RouterProvider: FC<{ children: ReactElement }> = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

export default RouterProvider
