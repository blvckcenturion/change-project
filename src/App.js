import './styles/globals.scss'
import 'normalize.css'
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import MyProfile from './pages/MyProfile';
import NewPetition from './pages/NewPetition';
import Explore from './pages/Explore';
import Login from './pages/Login';
import Register from './pages/Register';
import MyPetitions from './pages/MyPetitions';
import DeleteAccount from './pages/DeleteAccount';
import Sign from './pages/Sign';
import Settings from './pages/Settings';
import Petition from './pages/Petition';

const App = () =>{
  return (
    <div>
      <Header/>
        <div className='page-content'>
          <Routes>
            <Route index element={<Home />} />
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="explore" element={<Explore />} />
            <Route path="new-petition" element={<NewPetition />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="my-petitions" element={<MyPetitions />} />
            <Route path="delete-account" element={<DeleteAccount />} />
            <Route path="account-settings" element={<Settings />} />
            <Route path="petition/:id" element={<Petition />} />
            <Route path="sign" element={<Sign />} />
            <Route path="new-petition" element={<NewPetition />} />
          </Routes>
        </div>
      <Footer/>
    </div>
  );
}

export default App;
