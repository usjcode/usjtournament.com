import './App.css';
import { Staff } from './pages/personnel/staff';
import {
  Routes,
  Route,
  Outlet
} from "react-router-dom";
import Sidebar from './components/sidebar/sidebar';
import { Tournaments } from './pages/concours/tournaments';
import Candidates from './pages/candidats/candidates';
import Add from './pages/candidats/add';
import About from './pages/about/about';
import { Tournament } from './pages/concours/tournament';
import Login from './pages/login/login';

function Layout()
{
  return(
    <div className='isj'>
      <Sidebar/>
      <div className='content'>
      <Outlet/>
      </div>

    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
    <Route path="/" element={<Layout />}>
      <Route index element={<Tournaments />} />
      <Route path="staff" element={<Staff />} />
      <Route path="candidates" >
      <Route index element={<Candidates />}/>
      <Route path="add" element={<Add />} />


      </Route>
   
      <Route path="about" element={<About />} />
      <Route path="*" redirect="/" />
      <Route path="tournament">
      <Route index navigate="/"/>

        <Route path=":id" element={<Tournament/>} />
      </Route>
    </Route>
  </Routes>
  );
}

export default App;
