import { Button, Stack, TextField } from "@mui/material";
import logo from '../../assets/logo.jpg'
import AuthContext from "../../context/authcontext";
import { useContext } from "react";

export default  function Login()
{

  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    console.log(e.target)
    const username = e.target.email.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };
    return (
        <div className="isj">
        <form className="loginform" onSubmit={handleSubmit}>
        <img src={logo} width={100} alt={"logo"} style={{marginBottom:5}}/>
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

          <Button type="submit"
          variant="contained" >
            Log in
          </Button>
   </Stack>

        </form>
      </div>
    )
}