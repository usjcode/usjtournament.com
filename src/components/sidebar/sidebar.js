
import React, { useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  NavLink } from "react-router-dom"
import { faTrophy ,faFileAlt,faUsers,faCircleInfo,faSignOut} from '@fortawesome/free-solid-svg-icons'

import './sidebar.css'
import AuthContext from '../../context/authcontext'

export default  function Sidebar()
{
  const {  logoutUser } = useContext(AuthContext);
    return(
        <aside>
           <div className="menu">
             <NavLink to="/"      className={({ isActive }) =>isActive ? 'active'  : undefined}>
             <FontAwesomeIcon icon={faTrophy} className="icon" size="2x"  />
             <span>concours</span>
             </NavLink>
             <NavLink to="/candidates"  className={({ isActive }) =>isActive ? 'active'  : undefined}>
             <FontAwesomeIcon icon={faFileAlt} className="icon"  size="2x" />
             <span>Candidatures</span>

            </NavLink>
             <NavLink to="/staff"  className={({ isActive }) =>isActive ? 'active'  : undefined}>
             <FontAwesomeIcon icon={faUsers} className="icon" size="2x" />
             <span>Personnel</span>

             </NavLink>
             <NavLink to="/about"  className={({ isActive }) =>isActive ? 'active'  : undefined}>
             <FontAwesomeIcon icon={faCircleInfo} className="icon" size="2x" />
             <span>à propos</span>

             </NavLink>
           </div>

           <div className='bottom'>
           <link to='#' onClick={logoutUser}>
             <FontAwesomeIcon icon={faSignOut} className="icon" size="2x"  />
             <span>se deconnecter</span>

             </link>
           </div>
        </aside>
    )
}