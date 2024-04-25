import logo from "./logo.svg";
import "./App.css";

import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Home from "./Component/Home/Home";
import SignIn from "./Component/SignIn/SignIn";
import NotFound from "./Component/NotFound/NotFound";
import LayOut from "./Component/LayOut/LayOut";
import SignUP from "./Component/SignUp/SignUP";
import Setting from "./Component/Setting/Setting";
import ConfiremEmail from "./Component/ConfiremEmail/ConfiremEmail";
import ProtectedRouter from "./Component/ProtectedRouter/ProtectedRouter";
import UsersStatus from "./Component/usersStat/UsersStatus.jsx";
import CustomerSignUp from "./Component/CustomerSignUp/CustomerSignUp.jsx";
function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <LayOut />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
          ),
        },

        {
          path: "/Home",
          element: (
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
          ),
        },
        {
          path: "/UsersStatus",
          element: (
            <ProtectedRouter>
              <UsersStatus />
            </ProtectedRouter>
          ),
        },
        {
          path: "/Setting",
          element: (
            <ProtectedRouter>
              <Setting />
            </ProtectedRouter>
          ),
        },
        {
          path: "/SignUP",
          element: (
            <ProtectedRouter>
              <SignUP />
            </ProtectedRouter>
          ),
        },
        { path: "/SignIn", element: <SignIn /> },
        { path: "/CustomerSignUp", element: <CustomerSignUp /> },
        { path: "/ConfiremEmail", element: <ConfiremEmail /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
