import {ReactComponent as Profile} from '../assets/images/profile.svg'
import { useNavigate } from 'react-router'
import Head from "../components/Head"
const MyProfile = () => {
  let navigate = useNavigate();

  return (
    <div className='my-profile-page'>
      <Head title={"My profile"}/>
      <div>
        <Profile/>
        <div>
          <h3>ALVARO DIAZ ALVAREZ</h3>
          <h4>Cochabamba, Bolivia</h4>
          <h4>Usuario desde: 22/03/2022</h4>
        </div>
      </div>
      <div>
        <h3>PERFIL Y PREFERENCIAS</h3>
        <button onClick={() => navigate('/account-settings')}>
          Editar perfil
        </button>
        <button onClick={() => navigate('/my-petitions')}>
          Mis peticiones
        </button>
      </div>
    </div>
  )
}

export default MyProfile