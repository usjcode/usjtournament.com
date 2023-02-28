
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, NavLink } from "react-router-dom"
import { faTrophy ,faFileAlt,faUsers,faCircleInfo,faDoorOpen} from '@fortawesome/free-solid-svg-icons'

import './sidebar.css'
import { faUser } from '@fortawesome/free-regular-svg-icons'

export default  function Sidebar()
{
    
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
           <NavLink to="/"      className={({ isActive }) =>isActive ? 'active'  : undefined}>
             <FontAwesomeIcon icon={faDoorOpen} className="icon" size="2x"  />
             <span>se deconnecter</span>

             </NavLink>
           </div>
        </aside>
    )
}