import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from '@/shared/lib/routes'
import { MainPage } from '@/pages/main-page'
import { DetailReposPage } from 'src/pages/detail-repos'
import Layout from '@/pages/layout'

const PagesRouting = () => {
  return (
    <Routes>
      <Route path={routes.main} element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path={routes.detailRepo} element={<DetailReposPage />} />
      </Route>
    </Routes>
  )
}

export default PagesRouting
