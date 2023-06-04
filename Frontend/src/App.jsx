import Post from "./pages/post/Post"
import Register from './pages/register/Register'
 import Login from './pages/login/Login'
 import Update from './pages/update/Update'
 import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
   path:"/register",
   element: <Register/>
  },
  {
    path:"/post",
    element: <Post/>
   },
   {
    path:"/update/:index",
    element: <Update/>
   },
]);

function App() {
  

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
