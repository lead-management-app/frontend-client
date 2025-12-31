import {
  Route,
  Routes,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Login from "./_auth/forms/Login";
import Register from "./_auth/forms/Register";
import ResetPassword from "./_auth/forms/ResetPassword";
import SetPassword from "./_auth/forms/SetPassword";
import VerifyEmail from "./_auth/VerifyEmail";
import ForgotPassword from "./_auth/forms/ForgotPassword";
import AuthLayout from "./_auth/AuthLayout";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/setpassword" element={<SetPassword />} />
        </Route>

        {/* <Route path="/register" element={<Register />} /> */}

        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
