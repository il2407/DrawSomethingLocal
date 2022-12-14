import { Navigate, Outlet } from "react-router-dom";

//Protected route to validate authentacion according to the user's role
const PrivateRoutes = () => {
  const role = sessionStorage.getItem("role");

  let auth = { token: true };

  if (role === "mentor") auth = { token: true };
  else auth = { token: false };
  auth.token ? <p></p> : alert("user is not authenticated");
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
