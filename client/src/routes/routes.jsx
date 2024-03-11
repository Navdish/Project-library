import {BrowserRouter, Routes, Route,Navigate} from 'react-router-dom';
import Home from '../pages/Home/Home';
import SignUp from '../pages/SignUp/SignUp';
import Login from '../pages/Login/Login';
import Profile from '../pages/Profile/Profile';
import { useSelector } from 'react-redux';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';
import ButtonAppBar from '../components/Navbar/Navbar';

function AllRoutes() {
  const Protected = ({ children }) => {
    const user = useSelector((state)=> state.user.user);
    return  user && Object.keys(user).length === 0 ? <Navigate to="/SignUp" /> : <>{children}</>;
  };
  return (
    <>
      <BrowserRouter> 
        <ButtonAppBar/>
        <Routes>
          <Route path='/' element={<Navigate to ='/Home' replace={true} />}></Route>
          <Route path='/SignUp' element={<SignUp />}></Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route path='/Home' element={<Protected><Home /></Protected>} />
          <Route path='/Profile' element={<Protected><Profile /></Protected>}></Route>
          <Route path='/AdminDashboard' element={<Protected><AdminDashboard /></Protected>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AllRoutes;