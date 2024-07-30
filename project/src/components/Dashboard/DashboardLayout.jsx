import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from './DashboardSidebar'
import DashboardHeader from './DashboardHeader'
function DashboardLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <DashboardSidebar/>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <DashboardHeader/>
            <Outlet/>
        </div>
    </div>
  )
}

export default DashboardLayout
