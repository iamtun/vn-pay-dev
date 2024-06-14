import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts';
import { IntroductionPage, OrderPage, VerifyPage } from '../pages';

const RouterApp: React.FC = () => {
  const routers = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <IntroductionPage />,
        },
        {
          path: '/order',
          element: <OrderPage />,
        },
        {
          path: '/verify-order',
          element: <VerifyPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routers} />;
};

export default RouterApp;
