import { Box, Button, Checkbox, FormControlLabel, FormGroup, MenuItem, Select, Tab, Tabs, TextField, Typography } from "@mui/material";
import React from "react";
import PropTypes from 'prop-types';
import { DatePicker, DesktopDatePicker, YearPicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Navigate, useNavigate, useParams } from "react-router";
import axios from "axios";


function TabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Addtabs() {
  const [value, setValue] = React.useState(0);
  const [birthdate, setbirthdate] = React.useState('2014-08-18');
  const { type } = useParams()
  const [data, setdata] = React.useState({ type: type })
  const navigate = useNavigate()


  const handleChange = (event) => {
    var i = event.target.id
    console.log(event.target.id)
    var temp = { ...data }
    temp[i] = event.target.value
    setdata({
      ...temp
    });
  };



  const handleChangevalue = (e, newtab) => {
    setValue(newtab)
  }


  const submit = async () => {
    const response = await axios.post("http://127.0.0.1:8000/candidates/", data)
    if (response.status === 201)
      navigate("/candidates")
  }


  return (
    <Box sx={{ width: '100%', backgroundColor: "#fff", minHeight: 600 }} >
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChangevalue} aria-label="basic tabs example">
            <Tab label="informations personnels" {...a11yProps(0)} />
            <Tab label="informations scolaires" {...a11yProps(1)} />
            <Tab label="informations familiales" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <Box
          onSubmit={(e) => {
            e.preventDefault()
            console.log(e.target.mother_name.value)
          }}
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },

          }}
          noValidate
          autoComplete="off"
        >
          <TabPanel value={value} index={0}>
            <div>
              <TextField
                required
                id="name"
                value={data.name}

                label="name"
                onChange={handleChange}
              />

              <TextField
                required
                id="lastname"
                label="prenom"
                value={data.lastname}

                onChange={handleChange}

              />

            </div>
            <div>

              <DesktopDatePicker
                onChange={(e) => { setbirthdate(e.target.value) }}
                value={birthdate}
                renderInput={(params) => <TextField {...params} />}

              />

              <TextField
                required
                id="birth_place"
                label="lieu de naissance"
                value={data.birth_place}
                onChange={handleChange}

              />

            </div>
            <div>
              <Select id="sex" onChange={handleChange}
                value={data.sex} sx={{ m: 1, minWidth: "25ch" }}>
                <MenuItem value={"m"}>
                  masculin
                </MenuItem>
                <MenuItem value={"f"}>
                  feminin
                </MenuItem>
              </Select>


            </div>

            <div>
              <TextField
                required
                id="nationality"
                label="nationalité"
                value={data.nationality}
                fullWidth
                onChange={handleChange}

              />
              <TextField
                required
                id="region"
                label="region"
                onChange={handleChange}
                value={data.region}

              />



            </div>
            <div>
              <TextField
                required
                id="cni_number"
                label="numéro de cni"
                onChange={handleChange}
                value={data.cni_number}

              />
              <TextField
                label="email"
                id="email"
                required
                type="email"
                onChange={handleChange}
                value={data.email}

              />
            </div>
            <div>
              <TextField
                required
                id="adress"
                label="adresse"

                onChange={handleChange}
                value={data.adress}
              />
              <TextField
                label="téléphone"
                id="phone"
                type="tel"
                required
                onChange={handleChange}
                value={data.phone}

              />



            </div>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <div>
              <FormGroup sx={{ m: 1, minWidth: "25ch" }}>
                <FormControlLabel control={<Checkbox defaultChecked />} label="avez vous le bacc" />
              </FormGroup>


              <TextField
                required
                id="obtentionyear"
                label="année d'obtention"
                type="number"
                onChange={handleChange}
                value={data.obtentionyear}

              />

              <Select
                required
                onChange={handleChange}
                sx={{ m: 1, minWidth: "25ch" }}
                value={"p"} label="mention"
                id="mention">
                <MenuItem value={"p"}>passable</MenuItem>
                <MenuItem value={"ab"}>assez bien</MenuItem>

                <MenuItem value={"b"}>bien</MenuItem>
                <MenuItem value={"tb"}> très bien</MenuItem>
                <MenuItem value={"e"}>excelent</MenuItem>

              </Select>

            </div>
            <div>
              <Select sx={{ m: 1, minWidth: "25ch" }} value={"c"} label={"votre série"} id={"series"} onChange={handleChange}
              >
                <MenuItem value={"a"}>a</MenuItem>
                <MenuItem value={"b"}>b</MenuItem>

                <MenuItem value={"c"}>c</MenuItem>
                <MenuItem value={"d"}> d</MenuItem>
                <MenuItem value={"e"}>e</MenuItem>
                <MenuItem value={"ses"}>ses</MenuItem>
                <MenuItem value={"ti"}>ti</MenuItem>


                <MenuItem value={"mise"}>mise</MenuItem>

                <MenuItem value={"f1"}>f1</MenuItem>

                <MenuItem value={"f2"}>f2</MenuItem>

                <MenuItem value={"f3"}>f3</MenuItem>

                <MenuItem value={"f5"}>f5</MenuItem>
                <MenuItem value={"f6"}>f6</MenuItem>

                <MenuItem value={"f7"}>f7</MenuItem>
                <MenuItem value={"f8"}>f8</MenuItem>

              </Select>
              <TextField
                required
                onChange={handleChange}
                value={data.exschool}

                id="exschool"
                label="votre établissement"
              />

              <TextField
                required
                id="exschoolcity"
                label="ville"
                onChange={handleChange}
                value={data.exschoolcity}

              />

            </div>
            <div>
              <TextField
                required
                id="baccmoy"
                label="moyenne générale au bacc"
                type="number"
                value={data.baccmoy}
                onChange={handleChange}

              />

              <TextField
                required
                id="probmoy"
                label="moyenne générale au probatoire"
                value={data.probmoy}
                onChange={handleChange}
                type="number"

              />

              <TextField
                required
                id="examcenter"
                label="centre d'examination"
                fullWidth
                value={data.examcenter}
                onChange={handleChange}
              />

            </div>

            <div>
              <FormGroup sx={{ m: 1, minWidth: "25ch" }}>
                <FormControlLabel control={<Checkbox defaultChecked />} label="avez vous déja redoublé??" />
              </FormGroup>
              <Select value={"t"} sx={{ m: 1, minWidth: "25ch" }} onChange={handleChange}>
                <MenuItem value={"t"}>terminale</MenuItem>
                <MenuItem value={"1"}>premiere</MenuItem>
                <MenuItem value={"2"}>seconde</MenuItem>
                <MenuItem value={"3"}>troizieme</MenuItem>
                <MenuItem value={"4"}>quatrieme</MenuItem>

                <MenuItem value={"6"}>sixième</MenuItem>

              </Select>


            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div>
              <TextField
                required
                id="nommere"
                label="nom de la mere"
                onChange={handleChange}
                value={data.nommere}
              />

              <TextField
                required
                id="nompere"
                label="nom du Père"
                value={data.nompere}
                onChange={handleChange}

              />

            </div>
            <div>
              <TextField
                required
                id="professionmere"
                onChange={handleChange}
                label="profession de la mère"
                value={data.professionmere}
              />

              <TextField
                required
                onChange={handleChange}
                id="professionpere"
                label="profession du père"
                value={data.professionpere}
              />

            </div>
            <div>
              <TextField
                required
                id="nombreenfant"
                onChange={handleChange}
                label="nombre d'enfant"
                type="number"
                value={data.nombreenfant}

              />

              <TextField
                required
                id="nombreenfantes"
                onChange={handleChange}
                label="nombre d'enfant en etudes superieur"
                type="number"
                value={data.nombreenfantes}

              />

            </div>

            <div>
              <TextField
                required
                id="adressparent"
                onChange={handleChange}
                value={data.adressparent}

                label="addresse des parents"
                style={{
                  width: "25ch"
                }}
              />
            </div>
            <div>
              <Select sx={{ m: 1, minWidth: "25ch" }} id="situation"
                value={data.situation}

                required
              >
                <MenuItem value={"c"}>
                  célibataire
                </MenuItem>
                <MenuItem value={"m"}>
                  marié(e)
                </MenuItem>
              </Select>

            </div>
          </TabPanel>
          <Button type="submit" onClick={submit} >ajouter ce candidat</Button>

        </Box>
      </LocalizationProvider>
    </Box>
  );
}