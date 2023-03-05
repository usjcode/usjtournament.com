import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Stack, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { Add } from "@mui/icons-material";
import { useState  } from "react";
import {  useNavigate} from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import React from "react";




function TournamentUpdateDialog(props)
{
  const [value, setValue] = React.useState(moment('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

    const {update,setupdate}=props

    const handleClose = () => {
        setupdate(-1);
    };
    return(
        <Dialog open={(update >-1)} onClose={handleClose}>
        <DialogTitle>modifier les informations d'un concours</DialogTitle>
        <DialogContent>
 
        <Stack spacing={3}>
      <TextField
            autoFocus
            margin="dense"
            id="name"
            label="courte description"
            type="text"
            fullWidth
          />

<DesktopDatePicker
          label="Date limite d'inscription"
          inputFormat="MM/DD/YYYY"
          fullWidth
          onChange={handleChange}
          value={value}
          renderInput={(params) => <TextField {...params} />}
        />

<DesktopDatePicker
          label="date de début"
          inputFormat="MM/DD/YYYY"
          onChange={handleChange}
          value={value}
          fullWidth
                  renderInput={(params) => <TextField {...params} />}
        />
        </Stack>
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
  const [value, setValue] = React.useState('2014-08-18T21:11:54');

  const handleChange = (newValue) => {
    setValue(newValue);
  };

    const {open,setOpen}=props

    const handleClose = () => {
        setOpen(false);
    };
    return(
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ajouter un concours</DialogTitle>
        <DialogContent>
          <DialogContentText>
           ajouter un concours  enc precisant une date de début , une date de limite de dépot de dossier, ainsi que son type
          </DialogContentText>

      <Stack spacing={3}>
      <TextField
            autoFocus
            margin="dense"
            id="name"
            label="courte description"
            type="text"
            fullWidth
          />

<DesktopDatePicker
          label="Date limite d'inscription"
          inputFormat="MM/DD/YYYY"
          fullWidth
          onChange={handleChange}
          value={value}
          renderInput={(params) => <TextField {...params} />}
        />

<DesktopDatePicker
          label="date de début"
          inputFormat="MM/DD/YYYY"
          onChange={handleChange}
          value={value}
          fullWidth
                  renderInput={(params) => <TextField {...params} />}
        />
        </Stack>
        

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
  const navigate = useNavigate()
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
        <Button size="small" onClick={()=>{navigate("/tournament/id");console.log("test")}}>consulter</Button>
        <Button size="small" onClick={()=>{handleClickupdate(0)}} >modifier</Button>
        <Button size="small">supprimer</Button>
      </CardActions>
    </Card>
            </div>
            <Fab color="primary"  onClick={handleClickOpen} aria-label="add" sx={{right:0,bottom:0,position:"absolute"}}>
        <Add/>
      </Fab>

      <LocalizationProvider dateAdapter={AdapterMoment}>
      <TournamentAddDialog open={open} setOpen={setOpen}/>
      <TournamentUpdateDialog update={update} setupdate={setupdate}/>
      </LocalizationProvider>

        </div>
    )
}