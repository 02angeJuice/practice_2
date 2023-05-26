import Customer from './components/Customer/Customer'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root.jsx'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/customer',
    element: (
      <div className="sm:w-5/5 md:w-5/5 lg:w-5/5 xl:w-4/5 m-auto mt-10 p-2">
        <Customer />
      </div>
    ),
  },
])

function App() {
  return (
    <>
      {/* <RouterProvider router={router} /> */}

      <Router>
        <Routes>
          <Route path="/customer" element={<Customer />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
