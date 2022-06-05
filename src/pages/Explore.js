import React from 'react'
import { myPetitions, otherPetitions } from '../utils/dummyData'
import { Link } from 'react-router-dom'
import Head from "../components/Head"
import { useNavigate } from 'react-router-dom'

const Explore = () => {

  const allPetitions = [...myPetitions, ...otherPetitions];
  return (
    <div className='explore-page'>
      <Head title={"Explore"}/>
      <div>
        <h3>EXPLORE POPULAR PETITIONS</h3>
      </div>
      <div>
        {allPetitions.map((e, i) => <Petition key={i} {...e} />)}
      </div>
    </div>
  )
}

const Petition = ({id, title, description, src, alt, signers, objective }) => {
  const navigate = useNavigate();

  return (
    <div className='explore-card'>
      <div>
        <img src={src} alt={alt} />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{description.length <= 200 ? description : description.slice(0, 200) + '...'}</p>
        <p style={{color: "#FF0A27", textAlign: "center"}}>{signers} han firmado de un objetivo de {objective} firmas.</p>
        <button onClick={() => navigate(`/petition/${id}`)}>
          Ver mas
        </button>
      </div>
    </div>
  )
}


export default Explore