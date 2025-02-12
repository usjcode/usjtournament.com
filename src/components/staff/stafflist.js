import { Button, Card, CardActionArea, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { Add, Mail } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { roles } from "../../data";


function StaffAddDialog(props) {

  const { open, setOpen } = props
  const [email, setemail] = useState("")
  const [role, setrole] = useState("S")
  const handleClose = () => {
    setOpen(false);
  };
  const submit = async (e) => {
    const response = await axios.post('http://127.0.0.1:8000/staff/invitations',
      {
        "email": email,
        "role": role
      })
    console.log(response.status)

  }



  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>ajouter un nouvau membre du personnel</DialogTitle>
      <DialogContent>
        <DialogContentText>
          entrez un adresse mail et un role une invitation sera envoyé
        </DialogContentText>

        <Stack spacing={3}>
          <TextField
            value={email}
            onChange={(e) => { setemail(e.target.value) }}
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            required
          />

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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={submit}>inviter</Button>
      </DialogActions>
    </Dialog>

  )
}

export function Stafflist() {

  const [open, setOpen] = useState(false);
  const [staff, setstaff] = useState([])
  const navigate = useNavigate()


  const handleClickOpen = () => {
    setOpen(true);
  };


  const updatestaff = async () => {
    const response = await axios.get("http://127.0.0.1:8000/staff/")
    setstaff(response.data)
  }

  useEffect(() => {
    updatestaff()
  }, [])
  return (
    <div className="slw">

      <div className="slw">
        {
          staff.map(t => {
            return (<Card sx={{ maxWidth: 246 }}>
              <CardActionArea onClick={() => { navigate(t.id.toString()) }}>
                <CardMedia
                  component="img"
                  height="100"
                  image={`http://127.0.0.1:8000${t.avatar}`}
                  alt={t.username}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {t.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">

                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>)
          })
        }

      </div>

      <Fab color="primary" aria-label="add" onClick={handleClickOpen} sx={{ right: 0, bottom: 0, position: "fixed" }}>
        <Add />
      </Fab>

      <Fab color="primary" aria-label="/invitations" onClick={() => { navigate("invitations") }} sx={{ right: 0, bottom: 100, position: "fixed" }}>
        <Mail />
      </Fab>
      <StaffAddDialog open={open} setOpen={setOpen} />


    </div>
  )
}