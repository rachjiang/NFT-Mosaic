import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Collections from './components/Collections';
// Importing the Bootstrap 5 CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Collections />,
  },
]);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;