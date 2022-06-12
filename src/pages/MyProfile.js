import {ReactComponent as Profile} from '../assets/images/profile.svg'
import { useNavigate } from 'react-router'
import Head from "../components/Head"
import useAuth from '../hooks/useAuth'
import Loader from '../components/Loader'
import { useEffect } from 'react'
import { getMeApi } from '../api/user'
import { useState } from 'react'
import { capitalize, navigateTo } from '../utils/SillyFunctions'
const MyProfile = () => {

  let navigate = useNavigate();
  const { auth, logout } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (auth) {
      (async () => {
        const response = await getMeApi(logout);
        if (response?.data?.data) { 
          response.data.data.created_at = new Date(response.data.data.created_at);
          setUser(response.data.data);
        } else {
          navigateTo(window,navigate, '/login')
        }
      })()
    } else {
      navigateTo(window,navigate, '/login')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth])

  const handleLogout = () => {
    logout();
  }

  if (user) {
    
    return (
      <div className='my-profile-page'>
        <div className='info'>
          <Profile/>
          <div>
            <h3>{`${capitalize(user.name)} ${capitalize(user.lastname)}`}</h3>
            <h4>{capitalize(user.country)}</h4>
            <h4>{user.email}</h4>
            <h4>Usuario desde: { user.created_at.toUTCString()}</h4>
          </div>
        </div>
        <div>
          <h3>PERFIL Y PREFERENCIAS</h3>
          <button onClick={() => navigateTo(window,navigate, '/account-settings')}>
            Editar perfil
          </button>
          <button onClick={() => navigateTo(window,navigate, '/my-petitions')}>
            Mis peticiones
          </button>
          <button onClick={handleLogout}>
            Cerrar Sesion
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div className='my-profile-page'>
      <Head title={"My profile"}/>
      <Loader/>
      </div>
    )
  }
}

export default MyProfile