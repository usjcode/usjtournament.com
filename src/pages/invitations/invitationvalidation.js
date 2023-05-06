import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";


export function InvitationValidation() {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [role, setrole] = useState("")


    const navigate = useNavigate()
    const { id } = useParams()
    const validate = async () => {
        const { data } = axios.get(`http://127.0.0.1:8000/staff/invitations/${id}/validation`)
    }
    useEffect(() => {
        validate()
    }, [])
    return (<div className="invitations">
        <Dialog open={true}>
            <DialogTitle>vos identifiants</DialogTitle>
            <DialogContent>
                <DialogContentText>


                    <Alert>
                        veillez copier le mot de passe si dessous  il vous permettra de vous connecter ,
                        vous devrez le changer plutart
                    </Alert>

                    <Stack>

                    </Stack>

                </DialogContentText>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => { navigate("/") }}>aller sur le site</Button>
            </DialogActions>
        </Dialog>
    </div>)
}