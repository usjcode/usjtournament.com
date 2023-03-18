import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Modal, Stack, TextField } from "@mui/material";
import { Add, Article, Edit,  Remove } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";


import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import axios from "axios";


function NotationDialog(props)
{

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "700px",
    height: "500px",
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

const {notationid,rows}=props;
const [notation,setnotation]=React.useState(notationid)

React.useEffect(()=>
{
setnotation(notationid)

},[notationid])
var anonymat;

if(rows[notation])
anonymat=rows[notation].anonymat_number 




return(
<Modal open={notation>-1}  >
<Box sx={style}>
<Button onClick={()=>{setnotation(notation-1)}}>precedant</Button>
  <Button onClick={()=>{setnotation(notation+1)}}>suivant</Button>

</Box>

</Modal>
)
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'anonymat',
    numeric: false,
    disablePadding: true,
    label: 'nom',
  },
  {
    id: 'nm',
    numeric: true,
    disablePadding: false,
    label: 'notes manquantes',
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: 'actions',

  }

];

function EnhancedTableHead(props) {
  const { order, orderBy,  onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Liste des candidatures
        </Typography>
      )}

      {numSelected > 0 ? (
        <div style={{display:'flex'}}>
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="modifier les information de ce candidat">
            <IconButton>
              <Edit/>
            </IconButton>
        </Tooltip>
        </div>

      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    <Tooltip title="ajouter un nouveau candidat">
          <IconButton>
            <Add />
          </IconButton>
        </Tooltip>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

 function CandidateTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [remove,setremove] = React.useState("")
  const [rows,setrows]=React.useState([])
  const [notation,setnotation]=React.useState(-1)
  const{id}=useParams()
  const handleClose = () => {
    setremove("");
};


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };



  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const updatetournamentcandidates=async ()=>
  {
      const response= await axios.get("http://127.0.0.1:8000/tournaments/"+id+"/candidates")
      setrows(response.data)
  }

  React.useEffect(() => {
        updatetournamentcandidates()
  },[])




  const isSelected = (name) => selected.indexOf(name) !== -1;



  return (
    <Box sx={{ width: '100%',height:'100%' }}>
      <Paper sx={{ width: '100%', mb: 2 ,height:"100%",overflow:'auto'}}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer >
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                  const isItemSelected = isSelected(row.anonymat);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.anonymat)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.anonymat_number}
                      selected={isItemSelected}
                    >

             
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.anonymat_number}
                      </TableCell>
                      <TableCell >{row.nm}</TableCell>
                      <TableCell><IconButton onClick={()=>setremove(row.anonymat)}><Remove/></IconButton> <IconButton onClick={()=>{setnotation(index)}}><Article/></IconButton></TableCell>
                    </TableRow>
                  );
                })}
            
                
        
            </TableBody>
          </Table>
        </TableContainer>

      </Paper>

      <NotationDialog notationid={notation}  rows={rows}/>

      <Dialog open={(remove)} onClose={handleClose}>
        <DialogTitle>retirer un candidat</DialogTitle>
        <DialogContent>
        <DialogContentText>
        vous appretez a virer un candidat de ce concour si vous ete conscient de cela 
        saisisez
        {remove}
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


        </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>retirer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}


export function Tournamentcandidate()
{
    
    return (
        <div className="clw">
        <CandidateTable/>
        <Link to="add" style={{right:0,bottom:0,position:"absolute"}}>
        <Fab color="primary" aria-label="add" >
        <Add/>
      </Fab>
        </Link>

        </div>
    )
}