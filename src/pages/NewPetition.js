import Head from "../components/Head"
import { useState } from "react"
import useAuth from "../hooks/useAuth"
import { useEffect } from "react"
import { navigateTo } from "../utils/SillyFunctions"
import { useNavigate } from "react-router"
import Loader from '../components/Loader'
import { postPetitionApi } from "../api/petition"
import Swal from "sweetalert2"
const NewPetition = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [directedTo, setDirectedTo] = useState("")
  const [image, setImage] = useState(null)
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
    // setLoading(true)
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("directedTo", directedTo)
    formData.append("goal", goal)
    formData.append("image", image)
    console.log(formData)
    const response = await postPetitionApi(formData, logout)
    if (response.data.success) {
      Swal.fire(
        {
          icon: "success",
          title: "Creacion Exitosa!",
          text: "La peticion ha sido creada.",
          confirmButtonText: "Ok"
        }
      ).then((result) => {
        if (result.value) {
          navigateTo(window, navigate, `/my-profile`)
        }
      })
    }
    // console.log(response)
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
          <div>
            <label htmlFor="image">Imagen de la peticion</label>
            <input type="file" name="image" id="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
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