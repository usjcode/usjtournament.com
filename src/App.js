import {
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import { AuthProvider } from './context/authcontext';
import About from './pages/about/about';
import Add from './pages/candidats/add';
import Candidates from './pages/candidats/candidates';
import { Tournament } from './pages/concours/tournament';
import { Tournaments } from './pages/concours/tournaments';
import Login from './pages/login/login';
import { Staff } from './pages/personnel/staff';
import PrivateRoute from './utils/privateroute';
import { StaffMember } from "./pages/personnel/staffmember";



function App() {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/login" element={<Login/>}/>
    <Route path="/" element={<PrivateRoute/>}>
      <Route index element={<Tournaments />} />
      <Route path="staff" element={<Staff />} />
      <Route path="staff/:id" element={<StaffMember />} />
      <Route path="staff/invitations" element={<StaffMember />} />


      <Route path="candidates" >
      <Route index element={<Candidates />}/>
      <Route path="add/:type" element={<Add />} />


      </Route>
   
      <Route path="about" element={<About />} />
      <Route path="*" redirect="/" />
      <Route path="tournament">
      <Route index navigate="/"/>

        <Route path=":id" element={<Tournament/>} />
      </Route>
    </Route>
  </Routes>
  </AuthProvider>
  );
}

export default App;
