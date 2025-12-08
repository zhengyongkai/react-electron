import { createHashRouter } from 'react-router-dom';

import HomePage from '../pages/Home';
import SettingsPage from '../pages/Settings';

export const router = createHashRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
]);
