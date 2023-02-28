import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";


export function Candidateslist()
{
    
    return (
        <div className="clw">
        
        <Link to="add" style={{right:0,bottom:0,position:"absolute"}}>
        <Fab color="primary" aria-label="add" >
        <Add/>
      </Fab>
        </Link>

        </div>
    )
}