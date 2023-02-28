import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TextField, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState  } from "react";
import { redirect} from "react-router-dom";



function TournamentUpdateDialog(props)
{
    const {update,setupdate}=props

    const handleClose = () => {
        setupdate(-1);
    };
    return(
        <Dialog open={(update >-1)} onClose={handleClose}>
        <DialogTitle>modifier les informations d'un concours</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>annuler</Button>
          <Button onClick={handleClose}>valider</Button>
        </DialogActions>
      </Dialog>

    )
}




function TournamentAddDialog(props)
{
    const {open,setOpen}=props

    const handleClose = () => {
        setOpen(false);
    };
    return(
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ajouter un concours</DialogTitle>
        <DialogContent>
          <DialogContentText>
           ajouter un concours  en precisant une date de début , une date de limite de dépot de dossier, ainsi que son type
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>annuler</Button>
          <Button onClick={handleClose}>valider</Button>
        </DialogActions>
      </Dialog>

    )
}
export function Tournamentslist()
{
    const [open, setOpen] = useState(false);
    const [update, setupdate] = useState(-1);

    const handleClickOpen = () => {
        setOpen(true);
    };



    const handleClickupdate = (id) => {
        setupdate(id);
    };


    return (
        <div className="tlw">

            <div className="list">
            <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 20}}  gutterBottom>
          concour Management
        </Typography>
        <Typography  component="div" color="text.secondary">
        date limite d'inscription  :
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        date de début du concours :
        </Typography>

      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>{redirect("/candidates")}}>consulter</Button>
        <Button size="small" onClick={()=>{handleClickupdate(0)}} >modifier</Button>
        <Button size="small">supprimer</Button>
      </CardActions>
    </Card>
            </div>


        
            <Fab color="primary"  onClick={handleClickOpen} aria-label="add" sx={{right:0,bottom:0,position:"absolute"}}>
        <Add/>
      </Fab>

      <TournamentAddDialog open={open} setOpen={setOpen}/>
      <TournamentUpdateDialog update={update} setupdate={setupdate}/>



        </div>
    )
}