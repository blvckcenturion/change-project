import React from 'react'
import Head from "../components/Head"
import { useState, useEffect } from 'react'
import { getMeApi } from '../api/user'
import { getMyPetitionsApi } from '../api/petition'
import { navigateTo } from '../utils/SillyFunctions'
import { useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth'
import Loader from '../components/Loader'

const MyPetitions = () => {
  const [user, setUser] = useState(undefined)
  const [myPetitions, setMyPetitions] = useState([])
  const [petitionsSigned, setPetitionsSigned] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { auth, logout } = useAuth()

  useEffect(() => {
    if (auth) {
      (async () => {
        setLoading(true)
        const response = await getMeApi(logout)
        if (response?.data?.data) {
          setUser(response.data.data)
          const petitions = await getMyPetitionsApi(logout)
          console.log(petitions)
          if (petitions?.data) { 
            setMyPetitions(petitions.data.created_petitions)
            setPetitionsSigned(petitions.data.signed_petitions)
            console.log(petitions.data)
          }
          setLoading(false)
        } else {
          navigateTo(window,navigate, '/login')
        }
      })()
    } else {
      navigateTo(window,navigate, '/login')
    }
  }, [])
  if (!loading && user) {
    return (
      <div className='my-petitions-page'>
        <Head title={"My petitions"}/>
        <div className='title'>
          <h3>{user.name?.toUpperCase()} {user.lastname?.toUpperCase()}</h3>
        </div>
        <div className='petitions'>
          <PetitionsCard title={'Iniciadas'} petitions={myPetitions} />
          <PetitionsCard title={'Firmadas'} petitions={petitionsSigned}/>
        </div>
        
      </div>
    )  
  } else {
    return (
      <div className='my-petitions-page'>
        <Head title={"My petitions"} />
        <Loader/>
      </div>
    )
  }
  
}

const PetitionsCard = ({ title, petitions }) => {
  console.log(petitions)
  return (
    <div className="petitions-card">
      <h3>{title}({petitions?.length})</h3>
      <div>
        {petitions && petitions.length > 0 ? petitions.map((petition, index) => <Petition key={index} {...petition} />) : <h4>No hay peticiones {title.toLowerCase()}.</h4>}
      </div>
    </div>
  )
}

const Petition = ({directedTo, title, description, imageUrl, signatureCount, userName, id}) => {
  const navigate = useNavigate()

  return (
    <div className='petition' onClick={() => navigateTo(window, navigate, `/petition/${id}`)}>
      <div>
        <div>
          <h4>Dirigida a: {directedTo}</h4>
          <h3>{title}</h3>
          {/* <p>{description && description.length <= 200 ? description : description.slice(0, 200)+ '...'}</p> */}
        </div>
        <div>
          <img src={imageUrl} alt={title} />
        </div>
      </div>
      <div>
        <h4>{userName}</h4>
        <h5>{signatureCount} firmas</h5>
      </div>
    </div>
  )
}

export default MyPetitions