import { createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../components/Home/Home";
import Shop from "../components/Shop/Shop";
import About from "../components/About/About";
import SingleBookData from "../components/Home/Books/SingleBookData";
import DashboardLayout from "../../src/Pages/Dashboard/DashboardLayout";
import Dashboard from "../../src/Pages/Dashboard/Dashboard";
import Upload from "../../src/Pages/Dashboard/Upload";
import ManageBooks from "../../src/Pages/Dashboard/ManageBooks";
import EditBooks from "../../src/Pages/Dashboard/EditBooks";
import SignUp from "../components/Auth/SignUp";
import SingleWriterData from "../components/Home/Writers/SingleWriterData";
import AddWriters from "../../src/Pages/Dashboard/AddWriters";
import ManageWriters from "../../src/Pages/Dashboard/ManageWriters";
import EditWriters from "../../src/Pages/Dashboard/EditWriters";
import AllBooks from "../components/Home/Books/AllBooks";
import Cart from "../Pages/Cart";
import ManageUsers from "../../src/Pages/Dashboard/ManageUsers";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Modal from "../components/Auth/Modal";
import AllWriters from "../components/Home/Writers/AllWriters";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
        path: "/",
        element: <Home />
        },
        {
          path: "/shop",
          element: < Shop />
        },
        {
          path: "/books",
          element: < AllBooks />
        },
        {
          path: "/writers",
          element: < AllWriters />
        },
        {
          path: "/cart",
          element: < Cart />
        },
        {
          path: "/about",
          element: < About />
        },
        {
          path: "/books/:id",
          element: < SingleBookData />,
          loader: ({params}) => fetch(`https://bookapp-backend-ylwm.onrender.com/books/${params.id}`)
        },
        {
          path: "/writers/:id",
          element: < SingleWriterData />,
          loader: ({params}) => fetch(`https://bookapp-backend-ylwm.onrender.com/writers/${params.id}`)
        },
        {
          path: "/admin/dashboard",
          element: <PrivateRoute>< DashboardLayout /></PrivateRoute> ,
          children: [
            {
              path: "/admin/dashboard",
              element: < Dashboard />,
            },
            {
              path: "/admin/dashboard/upload-books",
              element: < Upload />,
            },
            {
              path: "/admin/dashboard/manage-books",
              element: < ManageBooks />,
            },
            {
              path: "/admin/dashboard/upload-writers",
              element: < AddWriters />,
            },
            {
              path: "/admin/dashboard/manage-writers",
              element: < ManageWriters />,
            },
            {
              path: "/admin/dashboard/edit-books/:id",
              element: < EditBooks />,
              loader: ({params}) => fetch(`https://bookapp-backend-ylwm.onrender.com/books/${params.id}`)
            },
            {
              path: "/admin/dashboard/edit-writers/:id",
              element: < EditWriters />,
              loader: ({params}) => fetch(`https://bookapp-backend-ylwm.onrender.com/writers/${params.id}`)
            },
            {
              path: "/admin/dashboard/manage-users",
              element: <ManageUsers />,
            },
          ]
        },
        {
          path: "/signup",
          element: < SignUp />,
        },
        {
          path: "/login",
          element: < Modal/>,
        },
       

      ]
    },
  ]);

  export default router;