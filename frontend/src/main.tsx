import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './routes/RootLayout.tsx'
import DashboardLayout from './routes/DashboardLayout.tsx'


// Import the components
import IndexPage from './routes'
import ContactPage from './routes/contact'
import SignInPage from './routes/sign-in'
import SignUpPage from './routes/sign-up'
import DashboardPage from './routes/dashboard'
import InvoicesPage from './routes/dashboard.invoices'

// Import your publishable key
const PUBLISHABLE_KEY = "pk_test_dHJ1c3RlZC1zZWFndWxsLTk4LmNsZXJrLmFjY291bnRzLmRldiQ"

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <IndexPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/sign-in/*', element: <SignInPage /> },
      { path: '/sign-up/*', element: <SignUpPage /> },
      {
        // we can assume that all the things inside dashboard layout are Authed
        // but all the the things just inside layout are Unauthed
        element: <DashboardLayout />,
        path: 'dashboard',
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/dashboard/invoices', element: <InvoicesPage /> },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)