import { Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/authcontext";
import Sidebar from "../components/sidebar/sidebar";

function Layout()
{
  return(
    <div className='isj'>
      <Sidebar/>
      <div className='content'>
      <Outlet/>
      </div>

    </div>
  )
}

function PrivateRoute({ children }) {
  let { user } = useContext(AuthContext); 
  let location = useLocation();
 
  if (!user) {
      // not logged in so redirect to login page with the return url
      return <Navigate to="/login" state={{ from: location }} />
  }

  // authorized so return child components
  return <Layout/>
}

export default PrivateRoute;