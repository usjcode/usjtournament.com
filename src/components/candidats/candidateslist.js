import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Stack, TextField } from "@mui/material";
import { Add, Edit, RemoveRedEye } from "@mui/icons-material";
import { Link, Navigate, useNavigate } from "react-router-dom";


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
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'nom',
  },
  {
    id: 'cni_number',
    numeric: true,
    disablePadding: false,
    label: 'numero de cni',
  },
  {
    id: 'concours',
    numeric: false,
    disablePadding: false,
    label: 'concours',
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: 'actions',
  },

];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
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
            align={ 'left'}
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
   const navigate =useNavigate()
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
          <IconButton onClick={()=>{navigate("add")}}>
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
  const [remove,setremove] = React.useState(undefined)
  const [rows,setrows]=React.useState([])
  const handleClose = () => {
    setremove(undefined);
};

const updatecandidates=async ()=>
{
    const response= await axios.get("http://127.0.0.1:8000/candidates/")
    setrows(response.data)
}

const removecandidate=async (id)=>
{
  const response= await axios.delete("http://127.0.0.1:8000/candidates/"+id)
  updatecandidates()


}

React.useEffect(()=>
{
  updatecandidates()
},[])

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






  const isSelected = (name) => selected.indexOf(name) !== -1;
var setremcni=""

console.log(rows)

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
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >

             
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.cni_number}</TableCell>
                      <TableCell align="left">{row.tournament.type}</TableCell>
                      <TableCell align="left">
                        <IconButton><Edit/></IconButton>
                        <IconButton><RemoveRedEye/></IconButton>
                        <IconButton onClick={(e)=>{e.stopPropagation();setremove(row)}}><DeleteIcon/></IconButton>

                        </TableCell>
                    </TableRow>
                  );
                })}
            

        
            </TableBody>
          </Table>
        </TableContainer>

      </Paper>
{
(remove)&&(
<Dialog open={remove} onClose={handleClose}>
<DialogTitle>retirer un candidat</DialogTitle>
<DialogContent>
<DialogContentText>
vous appretez a supprimer une candidature  si vous etes conscient de cela 
saisisez
<br/>
{remove.cni_number}
</DialogContentText>

<Stack spacing={3}>
<TextField
    autoFocus
    margin="dense"
    id="cni"
    label="courte description"
    type="text"
    fullWidth
    onChange={(e)=>{setremcni=e.target.value}}
  />


</Stack>
</DialogContent>
<DialogActions>
  <Button onClick={()=>
  {
    if(setremcni==remove.cni_number)
       {
        removecandidate(remove.id)
        handleClose()
       }
     
  }}>retirer</Button>
</DialogActions>
</Dialog>)
}
 
    </Box>
  );
}


export function Candidateslist()
{
    
    return (
        <div className="clw">
        <CandidateTable/>


        </div>
    )
}