import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <LoginPage />, // Default to login for now
  },
]);
