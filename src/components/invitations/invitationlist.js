import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem, Select, Stack, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { roles } from "../../data";


function InvitationUpdateDialog(props) {
    const [role, setrole] = useState("cl1i")
    const { update, setupdate } = props


    const updtournament = async () => {
        const response = await axios.patch(`http://127.0.0.1:8000/staff/invitations/${update}`,
            {
                "role": role,
            })


    }


    const submit = () => {
        updtournament()
        handleClose()
    }

    const handleClose = () => {
        setupdate(-1);
    };

    return (
        <Dialog open={update > -1} onClose={handleClose}>
            <DialogTitle>ajouter un concours</DialogTitle>
            <DialogContent>
                <DialogContentText>

                    <Stack>

                        <Select value={role} onChange={(e) => { setrole(e.target.value) }} >
                            {
                                Object.keys(roles).map(k => {
                                    return (
                                        <MenuItem value={k}>
                                            {roles[k]}
                                        </MenuItem>
                                    )
                                })
                            }


                        </Select>
                    </Stack>

                </DialogContentText>

            </DialogContent>
            <DialogActions>
                <Button>valider</Button>
                <Button onClick={handleClose}>annuler</Button>
            </DialogActions>
        </Dialog>

    )

}
export default function InvitationList() {

    const [update, setupdate] = useState(-1);
    const [invitations, setinvitations] = useState([])




    const deleteinvitation = async (id) => {
        const response = await axios.delete(`http://127.0.0.1:8000/staff/invitations/${id}`)
        updateinvitations()

    }

    const updateinvitations = async () => {
        const response = await axios.get("http://127.0.0.1:8000/staff/invitations")
        setinvitations(response.data)
    }

    useEffect(() => {
        updateinvitations()
    }, [])

    const updateinvitation = (id) => {
        setupdate(id);

    };

    return (
        <div style={{ height: "100%", overflow: "auto" }}>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                {

                    invitations.map(t => {

                        return (<Grid item sm={12} md={6}>

                            <Card >
                                <CardContent>

                                    <Typography sx={{ fontSize: 20 }} gutterBottom>
                                        {
                                            (t.validate) ? (<Typography sx={{ fontSize: 20 }} color={"#0f0"} gutterBottom>
                                                accepte
                                            </Typography>) : (<Typography sx={{ fontSize: 20 }} color={"#00f"} gutterBottom>
                                                active
                                            </Typography>)
                                        }
                                    </Typography>
                                    <Typography sx={{ fontSize: 15 }} gutterBottom>
                                        email:{t.email}
                                    </Typography>
                                    <Typography sx={{ fontSize: 15 }} >
                                        poste:{roles[t.role]}
                                    </Typography>

                                </CardContent>
                                <CardActions>

                                    {
                                        (t.validate) ?
                                            (
                                                <Button size="small" onClick={() => { updateinvitation(t.id) }}  >consulter le membre</Button>
                                            ) :
                                            (
                                                <Button size="small" onClick={() => { updateinvitation(t.id) }}  >modifier le poste </Button>

                                            )


                                    }
                                    <Button size="small" onClick={() => { deleteinvitation(t.id) }} >annuler l'invitation</Button>
                                </CardActions>
                            </Card>
                        </Grid>)
                    }
                    )

                }
            </Grid>

            <InvitationUpdateDialog update={update} setupdate={setupdate} />


        </div >

    )
}