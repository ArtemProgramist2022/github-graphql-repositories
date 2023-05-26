import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="max-w-max_app_width mx-auto py-[30px] overflow-x-hidden overflow-y-auto">
      <Outlet />
    </div>
  )
}

export default Layout
