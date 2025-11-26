import { Navigate, Outlet } from 'react-router-dom';
import RootLayout from '../pages/RootLayout';
import AuthPage from '../pages/authPage/AuthPage';

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
            element: <AuthPage /> 
          }
        ]
      },
      {
        path: 'preview',
        element: <AuthPage />
      }
    ]
  }
];

export default routes;
