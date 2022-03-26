import {ReactComponent as Svg} from '../assets/images/home.svg'
import { useNavigate } from 'react-router-dom'
import Head from "../components/Head"
const Home = () => {
  let navigate = useNavigate();
  
  return (
    <div className='home-page'>
      <Head title={"Home"}/>
      <div>
        <Svg/>
      </div>
      <div>
        <h3>PETICIONES QUE GENERAN CAMBIOS</h3>
        <div>
          <button onClick={() => navigate('/new-petition')}>
            Iniciar una peticion
          </button>
          <button onClick={() => navigate('/explore')}>
            Ver peticiones populares
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home