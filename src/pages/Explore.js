import {useState, useEffect } from 'react'
import { myPetitions, otherPetitions } from '../utils/dummyData'
import { Link } from 'react-router-dom'
import Head from "../components/Head"
import { useNavigate } from 'react-router-dom'
import { getAllPetitions } from '../api/petition'
import Loader from '../components/Loader'
import { navigateTo } from '../utils/SillyFunctions'

const Explore = () => {

  const [petitions, setPetitions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true)
      const response = await getAllPetitions();
      setLoading(false)
      setPetitions(response.data);
    })()
    
  }, []);
  
  if (loading) {
    return (
      <div className='explore-page'>
        <Head title={"Explorar"} />
        <Loader />
      </div>
    )
  } else {
    return (
      <div className='explore-page'>
        <Head title={"Explore"}/>
        <div>
          <h3>EXPLORE POPULAR PETITIONS</h3>
        </div>
        <div>
          {petitions.map((e, i) => <Petition key={i} {...e} />)}
        </div>
      </div>
    )
  }
}

const Petition = ({id, title, description, imageUrl, goal, signatureCount }) => {
  const navigate = useNavigate();

  return (
    <div className='explore-card'>
      <div>
        <img src={imageUrl} alt={title} />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{description.length <= 200 ? description : description.slice(0, 200) + '...'}</p>
        <p style={{color: "#FF0A27", textAlign: "center"}}>{signatureCount} han firmado de un objetivo de {goal} firmas.</p>
        <button onClick={() => navigateTo(window, navigate, `/petition/${id}`)}>
          Ver mas
        </button>
      </div>
    </div>
  )
}


export default Explore