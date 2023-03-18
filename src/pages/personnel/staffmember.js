import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import logo from '../../assets/logo.jpg'
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";


export function StaffMember()
{
    const {id} = useParams()
    const [loading,setLoading]=useState(false)
    const [member,setmember]=useState(undefined)

    const updatestaffmember=async ()=>
    {
        const response= await axios.get("http://127.0.0.1:8000/staff/"+id)
        setmember(response.data)
    }
    useEffect(() => {
        updatestaffmember()
  },[])
    return(
        
(member)&&(
    <Box >
        
    <Paper  sx={{padding:10}}>
    <Avatar sx={{borderColor:"#333",borderWidth:3,borderStyle:"solid"}} style={{width:200,height:200}} src={"http://127.0.0.1:8000/"+member.Avatar}/> 

       <Box>
       <Typography>{member.contact}</Typography>
       <Typography>directeur</Typography>
       <Typography>{member.email}</Typography>



       </Box>
       <Button>vos information</Button>
       <Button>supprimer le compte</Button>


    </Paper>
   </Box>
)
        

    )
}