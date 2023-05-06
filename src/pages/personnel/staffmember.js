import { Avatar, Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import logo from '../../assets/logo.jpg'
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { roles } from "../../data";


export function StaffMember() {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [member, setmember] = useState(undefined)
    console.log(member)
    const updatestaffmember = async () => {
        const response = await axios.get("http://127.0.0.1:8000/staff/" + id)
        setmember(response.data)
    }
    useEffect(() => {
        updatestaffmember()
    }, [])
    return (

        (member) && (
            <Box sx={{

                width: "100%",
                textAlign: "center",
                backgroundColor: "#fff",
                top: 100
            }} >

                <Avatar sx={{ borderColor: "#333", borderWidth: 3, borderStyle: "solid", margin: "auto", bottom: 100 }} style={{ width: 200, height: 200 }} src={"http://127.0.0.1:8000/" + member.avatar} />

                <Box>
                    <Typography sx={{ fontSize: 20, mb: 3 }}>{roles[member.role]}</Typography>
                    <Grid container spacing={2} padding={5}>
                        <Grid item xs={4}>
                            <Typography>{member.email}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>{member.contact}</Typography>

                        </Grid>
                        <Grid item xs={4}>
                            <Typography>{member.contact}</Typography>
                        </Grid>
                    </Grid>



                </Box>
                <Stack width={"100%"} direction="row" spacing={2} justifyContent={"center"}>
                    <Button variant="contained">vos information</Button>
                    <Button color="error" variant="contained">supprimer le compte</Button>
                </Stack>


            </Box>
        )


    )
}