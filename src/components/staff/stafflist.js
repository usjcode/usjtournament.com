import { Button, Card, CardActionArea, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TextField, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";

function StaffAddDialog(props)
{
    
    const {open,setOpen}=props
    const handleClose = () => {
        setOpen(false);
    };
    
    return(
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ajouter un nouvau membre du personnel</DialogTitle>
        <DialogContent>
          <DialogContentText>
entrez un adresse mail et un role une invitation seras envoyé
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>

    )
}

export function Stafflist()
{

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };



    return (
        <div className="slw">

            <div className="sl">
            <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
            </div>
        
            <Fab color="primary" aria-label="add" onClick={handleClickOpen} sx={{right:0,bottom:0,position:"absolute"}}>
        <Add/>
      </Fab>
      <StaffAddDialog open={open} setOpen={setOpen}/>
        </div>
    )
}