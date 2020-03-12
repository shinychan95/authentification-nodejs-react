import Register from "./views/Register.jsx";
import Login from "./views/Login.jsx";
import ResetPassword from "./views/ResetPassword.jsx";


var routes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    icon: "ni ni-lock-circle-open text-pink",
    component: ResetPassword,
    layout: "/auth"
  }
];

export default routes;
