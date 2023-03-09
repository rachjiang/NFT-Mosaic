import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Collections from './Collections';
// Importing the Bootstrap 5 CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Collections />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;