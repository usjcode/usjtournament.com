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
    <Route path="/" element={<Layout />}>
      <Route index element={<Tournaments />} />
      <Route path="staff" element={<Staff />} />
      <Route path="candidates" >
      <Route index element={<Candidates />}/>
      <Route path="add" element={<Add />} />

      </Route>
   
      <Route path="about" element={<About />} />
      <Route path="*" redirect="/" />
    </Route>
  </Routes>
  );
}

export default App;
