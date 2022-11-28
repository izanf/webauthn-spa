import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Dashboard from '../dashboard'
import Login from '../authorization'
import useAuth from '../hooks/useAuth'

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { auth } = useAuth();

  return auth?.token ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    )
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

const Routes = () => (
  <RouterProvider router={router} />
)

export default Routes
