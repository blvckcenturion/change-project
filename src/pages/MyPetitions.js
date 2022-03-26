import React from 'react'
import Head from "../components/Head"
import { myPetitions, otherPetitions } from '../utils/dummyData';

const MyPetitions = () => {
  return (
    <div className='my-petitions-page'>
      <Head title={"My petitions"}/>
      <div>
        <h3>ALVARO DIAZ ALVAREZ</h3>
      </div>
      <div>
        <PetitionsCard title={'Iniciadas'} petitions={myPetitions} />
        <PetitionsCard title={'Firmadas'} petitions={otherPetitions}/>
      </div>
      
    </div>
  )
}

const PetitionsCard = ({ title, petitions }) => {
  if (petitions.length === 0) return;
  return (
    <div className="petitions-card">
      <h3>{title}({petitions.length})</h3>
      <div>
        {petitions.map((e, i) => <Petition key={i} {...e} />)}
      </div>
    </div>
  )
}

const Petition = ({to, title, description, src, alt, signers, from}) => {
  return (
    <div className='petition'>
      <div>
        <div>
          <h4>Dirigida a: {to}</h4>
          <h3>{title}</h3>
          <p>{description.length <= 200 ? description : description.slice(0, 200)+ '...'}</p>
        </div>
        <div>
          <img src={src} alt={alt} />
        </div>
      </div>
      <div>
        <h4>{from}</h4>
        <h5>{signers} firmas</h5>
      </div>
    </div>
  )
}

export default MyPetitions