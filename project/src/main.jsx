import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Toaster } from "@/src/libs/ui/toaster"
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster/>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
