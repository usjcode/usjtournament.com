import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { Add, Construction } from "@mui/icons-material";
import { useEffect, useState  } from "react";
import {  useNavigate} from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import React from "react";
import axios from "axios";
import { tournamentslist } from "../../data";




function TournamentUpdateDialog(props)
{
  const [value, setValue] = React.useState('2014-08-18');
  const {updatetournaments}=props
const [description,setdescription]=useState("")
const [tournament,settournament]=useState("cl1i")
const {update,setupdate}=props



  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const updtournament= async ()=>
  {
    const response= await  axios.patch(`http://127.0.0.1:8000/tournaments/${update}`,
    {
      "type":tournament,
      "description":description,
      "date_debut":value,
      "nbr_place":100
    })
      updatetournaments()
      
  }


  const submit = ()=>
  {
    updtournament()
    handleClose()
  }

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
            value={description}
            onChange={(e)=>{setdescription(e.target.value)}}
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
          <Button  onClick={submit}>valider</Button>
        </DialogActions>
      </Dialog>

    )
}




function TournamentAddDialog(props)
{

  const [datei, setdatei] = React.useState(moment('2014-08-18'));
  const [dated, setdated] = React.useState(moment('2014-08-18'));
  const {open,setOpen,updatetournaments}=props
const [description,setdescription]=useState("")
const [tournament,settournament]=useState("cl1i")
const [error1,seterror1]=useState(false)



  async function  createtournament  ()
  {
    const response= await  axios.post('http://127.0.0.1:8000/tournaments/',
    {
      "type":tournament,
      "description":description,
      "date_debut":dated.format("YYYY-MM-DD"),
      "date_inscription":datei.format("YYYY-MM-DD"),
      "nbr_place":100
    })
    updatetournaments()
    console.log(response)
    return response.status
      

  }

  const showexist =()=>
  {
    seterror1(true)
  }
  


  const submit =  async ()=>
  {
    (await createtournament()==201)?handleClose():showexist()

  }

    const handleClose = () => {
        setOpen(false);
        seterror1(false)
    };


    return(
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ajouter un concours</DialogTitle>
        <DialogContent>
          <DialogContentText>
           ajouter un concours  enc precisant une date de début , une date de limite de dépot de dossier, ainsi que son type
          </DialogContentText>

      <Stack spacing={3}>

        <Select value={tournament} onChange={(e)=>{settournament(e.target.value)}} >
        {
          Object.keys(tournamentslist).map(k=>
            {
              return(
                <MenuItem value={k}> 
                {tournamentslist[k]}
                     
                </MenuItem>
              )
            })
        }  

          
        </Select>
      
      <TextField
            autoFocus
            margin="dense"
            id="name"
            label="courte description"
            type="text"
            fullWidth
            value={description}
            onChange={(e)=>{setdescription(e.target.value)}}
          />

<DesktopDatePicker
          label="Date limite d'inscription"
          inputFormat="MM/DD/YYYY"
          fullWidth
          onChange={setdatei}

          value={datei}
          renderInput={(params) => <TextField {...params} />}
        />

<DesktopDatePicker
          label="date de début"
          inputFormat="MM/DD/YYYY"
          onChange={setdated}
          value={dated}
          fullWidth
          minDate={datei}
                  renderInput={(params) => <TextField {...params} />}
        />
        </Stack>
        

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>annuler</Button>
          <Button onClick={submit}>valider</Button>
        </DialogActions>

        <Dialog open={error1} onClose={handleClose}>
        <DialogTitle>ajouter un concours</DialogTitle>
        <DialogContent>
          <DialogContentText>
            il exist deja un concours encours pour 
            <br/>
            {tournamentslist[tournament]}
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ok</Button>
        </DialogActions>
      </Dialog>
      
      </Dialog>
      

    )
}
export function Tournamentslist()
{
  const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [update, setupdate] = useState(-1);
    const[tournaments,settournaments]=useState([])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const deletetournament = async (id)=>
    {
      const response= await axios.delete(`http://127.0.0.1:8000/tournaments/${id}`)
      updatetournaments()

    }

    const updatetournaments=async ()=>
    {
        const response= await axios.get("http://127.0.0.1:8000/tournaments/")
        settournaments(response.data)
    }

    useEffect(() => {
          updatetournaments()
    },[])

    const handleClickupdate = (id) => {
        setupdate(id);
    };

    

    return (
        <div className="tlw">

            <div className="list" style={{height:"100%",overflow:"auto"}}>
           {
            tournaments.map(t=>{
             
              return(
                <Card sx={{ minWidth: 275,marginTop:2 }}>
                <CardContent>
                  
                  <Typography sx={{ fontSize: 20}}  color={( tournamentslist[t.type].indexOf("Management")>0)?"#f00":"#00f"}  gutterBottom>
                    {tournamentslist[t.type]}
                  </Typography>
                  <Typography sx={{ fontSize: 15}}  gutterBottom>
                    {t.description}
                  </Typography>
                  <Typography  component="div" color="text.secondary">
                  date limite d'inscription  :{t.date_inscription}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  date de début du concours : {t.date_debut}
                  </Typography>
          
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={()=>{navigate("/tournament/"+t.id);console.log("test")}}>consulter</Button>
                  <Button size="small" onClick={()=>{handleClickupdate(t.id)}} >modifier</Button>
                  <Button size="small" onClick={()=>{deletetournament(t.id)}}>supprimer</Button>
                </CardActions>
              </Card>
              )
            })
           }
  
            </div>
            <Fab color="primary"  onClick={handleClickOpen} aria-label="add" sx={{right:0,bottom:0,position:"absolute"}}>
        <Add/>
      </Fab>

      <LocalizationProvider dateAdapter={AdapterMoment}>
      <TournamentAddDialog open={open} updatetournaments={updatetournaments} setOpen={setOpen}/>
      <TournamentUpdateDialog update={update} setupdate={setupdate}  updatetournaments={updatetournaments}/>
      </LocalizationProvider>

        </div>
    )
}