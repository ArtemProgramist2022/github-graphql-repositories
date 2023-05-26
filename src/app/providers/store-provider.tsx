import React, { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/shared/model'

const StoreProvider: FC<{ children: ReactElement }> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
)

export default StoreProvider
