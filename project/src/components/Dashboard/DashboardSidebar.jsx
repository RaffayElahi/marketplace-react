import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/src/libs/ui/tooltip"

function DashboardSidebar() {
  const location = useLocation();
  const getLinkClass = (path) => 
    location.pathname === path ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground";

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Link
            to="/dashboardofsite"
            className={`group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base ${getLinkClass("/dashboardofsite")}`}
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/dashboardofsite"
                className={`flex h-9 w-9 items-center justify-center rounded-lg md:h-8 md:w-8 ${getLinkClass("/dashboardofsite")}`}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/dashboardofsite/orders"
                className={`flex h-9 w-9 items-center justify-center rounded-lg md:h-8 md:w-8 ${getLinkClass("/dashboardofsite/orders")}`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Orders</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Orders</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/dashboardofsite/products"
                className={`flex h-9 w-9 items-center justify-center rounded-lg md:h-8 md:w-8 ${getLinkClass("/dashboardofsite/products")}`}
              >
                <Package className="h-5 w-5" />
                <span className="sr-only">Products</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Products</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/dashboardofsite/customers"
                className={`flex h-9 w-9 items-center justify-center rounded-lg md:h-8 md:w-8 ${getLinkClass("/dashboardofsite/customers")}`}
              >
                <Users2 className="h-5 w-5" />
                <span className="sr-only">Customers</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Customers</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/dashboardofsite/analytics"
                className={`flex h-9 w-9 items-center justify-center rounded-lg md:h-8 md:w-8 ${getLinkClass("/dashboardofsite/analytics")}`}
              >
                <LineChart className="h-5 w-5" />
                <span className="sr-only">Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/dashboardofsite/settings"
                className={`flex h-9 w-9 items-center justify-center rounded-lg md:h-8 md:w-8 ${getLinkClass("/dashboardofsite/settings")}`}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  )
}

export default DashboardSidebar