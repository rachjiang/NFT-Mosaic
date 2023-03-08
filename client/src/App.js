import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Collections from './Collections';

const router = createBrowserRouter([
  {
    path: '/collection',
    element: <Collections />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;