import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './index.css'
import Home, {
  loader as jobApplicationsLoader,
  action as addJobApplication
} from './routes/home.tsx'
import { ThemeProvider } from './components/theme-provider'
import AddJobApplication, {
  action as addAction
} from './routes/job-application-add.tsx'
import EditJobApplication, {
  loader as editJobApplication,
  action as editAction
} from './routes/job-application-edit.tsx'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home/>,
      loader: jobApplicationsLoader,
      action: addJobApplication
    },
    {
      path: "job-applications/add",
      element: <AddJobApplication/>,
      action: addAction,
    },
    {
      path: "job-applications/:jobApplicationId/edit",
      element: <EditJobApplication/>,
      loader: editJobApplication,
      action: editAction
    },
  ]
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="mx-auto max-w-sm mt-10">
        <RouterProvider router={router}/>
      </main>
    </ThemeProvider>
  </React.StrictMode>,
)
