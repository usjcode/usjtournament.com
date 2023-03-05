import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar/sidebar";
import AuthContext from "../context/authcontext";

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