import { Navigate, Outlet } from 'react-router-dom';
import RootLayout from '../pages/RootLayout';
import Auth from '../pages/auth/AuthPage';

const routes = [
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth" replace />
      },
      {
        path: 'auth',
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <Auth /> 
          }
        ]
      },
      {
        path: 'preview',
        element: <Auth />
      }
    ]
  }
];

export default routes;
