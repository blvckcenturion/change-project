import Head from "../components/Head"
import { useState } from "react"
import useAuth from "../hooks/useAuth"
import { useEffect } from "react"
import { navigateTo } from "../utils/SillyFunctions"
import { useNavigate } from "react-router"
import Loader from '../components/Loader'
import { postPetitionApi } from "../api/petition"

const NewPetition = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [directedTo, setDirectedTo] = useState("")
  const [goal, setGoal] = useState("")
  const { auth, logout } = useAuth()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!auth) {
      navigateTo(window, navigate, "/login")
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("directedTo", directedTo)
    formData.append("goal", goal)
    formData.append("imageUrl", "https://assets.change.org/photos/0/oq/xf/IuoqXFZuIxaOKSL-800x450-noPad.jpg?1596722986")
    const response = await postPetitionApi(formData, logout)
  }

  if (!loading) {
    return (
      <div className="new-petition-page">
        <Head title={"New Petition"} />
        <h3>
          INICIAR UNA NUEVA PETICION
        </h3>
        <form onSubmit={handleSubmit}>
          <div>
          <label htmlFor="title">Titulo de peticion</label>
          <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label htmlFor="description">Descripcion</label>
            <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label htmlFor="directedTo">A quien se dirige la peticion</label>
            <input type="text" name="directedTo" id="directedTo" value={directedTo} onChange={(e) => setDirectedTo(e.target.value)} />
          </div>
          <div>
            <label htmlFor="goal">Objetivo de firmas</label>
            <input type="number" name="goal" id="goal" value={goal} onChange={(e) => setGoal(e.target.value)} />
          </div>
          <button type="submit">
            Iniciar peticion
          </button>
        </form>
      </div>
    )
  } else {
    return (
      <div className="login-page">
        <Head title={"Login"}/>
        <Loader/>
      </div>
    )
  }
  
}

export default NewPetition