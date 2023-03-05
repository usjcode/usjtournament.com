import { Button, Stack, TextField } from "@mui/material";
import logo from '../../assets/logo.jpg'

export default  function Login()
{
    return (
        <div className="isj">
        <form className="loginform">
        <img src={logo} width={100} style={{marginBottom:5}}/>
   <Stack spacing={1}
   width={"100%"}>
   <TextField
            labelText="Email"
            id="email"
            placeholder="email"
            
            
              fullWidth
            
  
          />
          <TextField
            labelText="Password"
            id="password"
           fullWidth
            placeholder="mot de passe"
            type="password"
          />

          <Button
          variant="contained" >
            Log in
          </Button>
   </Stack>

        </form>
      </div>
    )
}