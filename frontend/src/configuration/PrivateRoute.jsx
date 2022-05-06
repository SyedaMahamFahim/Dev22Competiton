import React from "react";
import { Navigate} from "react-router-dom";
import useAuth from "../utils/useAuth";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const auth = useAuth();
  return auth ? children : <Navigate to="/" />;

  // let token = localStorage.getItem("token");
  // if(loading ===false){
  //   if (isAuthenticated === false) {
  //     return <Navigate to="/"/>;
  //   }
  //   return  children
  // }
 
}

export default PrivateRoute;

// if (isAuthenticated === false && (token === null || token === undefined || token === "")) {
//   return <Navigate to="/" />;
// }
