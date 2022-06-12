import Head from "../components/Head"
import { useState } from "react"
import useAuth from "../hooks/useAuth"
import { useEffect } from "react"
import { navigateTo } from "../utils/SillyFunctions"
import { useNavigate } from "react-router"
import Loader from '../components/Loader'
import { putPetitionApi, deletePetitionApi} from "../api/petition"
import { getSinglePetition } from "../api/petition";
import { useParams } from "react-router"
import Swal from "sweetalert2"

const EditPetition = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [directedTo, setDirectedTo] = useState("")
  const [goal, setGoal] = useState("")
  const { auth, logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      setLoading(true)
      const response = await getSinglePetition(id);
      if (response.data.success) {
        if (auth && parseInt(auth.idUser) !== response.data.data.userId) { 
          navigateTo(window, navigate, '/')
        }
        setTitle(response.data.data.title)
        setDescription(response.data.data.description)
        setDirectedTo(response.data.data.directedTo)
        setGoal(response.data.data.goal)
        setLoading(false) 
      } else {
        navigateTo(window, navigate, '/')
      }
      
    })()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    window.scrollTo(0,0)
    setLoading(true)
    let data = {
      title,
      description,
      directedTo,
      goal,
      imageUrl: "https://assets.change.org/photos/0/oq/xf/IuoqXFZuIxaOKSL-800x450-noPad.jpg?1596722986"
    }
    const response = await putPetitionApi(id, data, logout)
    if (response.data.success) {
      Swal.fire(
        {
          icon: "success",
          title: "¡Modificacion Exitosa!",
          text: "La peticion ha sido actualizada.",
          confirmButtonText: "Ok"
        }
      ).then((result) => {
        if (result.value) {
          navigateTo(window, navigate, `/petition/${id}`)
        }
      })
    }
  }

  if (!loading) {
    return (
      <div className="new-petition-page">
        <Head title={"New Petition"} />
        <h3>
          EDITAR PETICION
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
            Guardar Cambios
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

export default EditPetition