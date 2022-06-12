import Head from "../components/Head"
import { useParams } from "react-router"
import { useEffect, useState } from "react";
import { getSinglePetition } from "../api/petition";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
import { navigateTo } from "../utils/SillyFunctions";
import { useNavigate } from "react-router";
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import { postSigned, getUserSignedApi } from "../api/signed";
import { postComment } from "../api/comments";
import Swal from "sweetalert2";

const Petition = () => {
  const { id } = useParams();
  const [petition, setPetition] = useState({});
  const [loading, setLoading] = useState(false);
  const [signed, setSigned] = useState(false);
  const [comment, setComment] = useState("");
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      window.scrollTo(0, 0)
      setLoading(true)
      const response = await getSinglePetition(id);
      console.log(response.data);
      
      if (response.data.success) {
        if (auth && parseInt(auth.idUser) !== petition.userId) {
          const signed = await getUserSignedApi(id, logout);
          console.log(signed)
          if (signed.data.success) {
            if (signed.data.signed) { 
              setSigned(true)
            }
          }
        }
        setPetition(response.data.data);
        setLoading(false) 
      } else {
        navigateTo(window, navigate, '/')
      }
      
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleSign = (e) => {
    e.preventDefault()
    if (auth) {
      (async () => {
        window.scrollTo(0,0)
        setLoading(true)
        const response = await postSigned(id, logout);
        console.log(response)
        if (response.data.success) {
          Swal.fire(
            {
              icon: "success",
              title: "¡Gracias por firmar!",
              text: "Has firmado la petición",
              confirmButtonText: "Ok"
            }
          ).then((result) => {
            if (result.value) {
              window.location.reload()
            }
          })
        }
      })()
    }
  }

  const handleNewComment = (e) => { 
    e.preventDefault()
    setComment(comment.trim())
    
    if (auth) {
      if (comment.length > 0) { 
        (async () => {
          window.scrollTo(0, 0)
          setLoading(true)
          const formData = new FormData();
          formData.append('comment', comment);
          const response = await postComment(id, formData, logout);
          console.log(response)
          if (response.data.success) {
            Swal.fire(
              {
                icon: "success",
                title: "¡Gracias por comentar!",
                text: "Has comentado la petición",
                confirmButtonText: "Ok"
              }
            ).then((result) => {
              if (result.value) {
                window.location.reload()
              }
            })
            
          }
        })()
      } else {
        Swal.fire(
          {
            icon: "error",
            title: "Error",
            text: "El comentario no puede estar vacio"
          }
        )
      }
      
    }
  }

  if (!loading) {
    return (
      <div className="petition-page">
        <Head title={"Petition"} />
        <div className="petition-page-header">
          <h1>{petition.title}</h1>
          {auth && parseInt(auth.idUser) === petition.userId && (
            <button>
              Editar peticion
            </button>
          )}
          
        </div>
        <div className="petition-page-content">
          <div className="petition-page-content-img">
            <img src={petition.imageUrl} alt={petition.title} />
          </div>
          <div className="petition-page-content-details">
            <div>
              <div>
                <h3>Iniciada por:</h3>
              </div>
              <div>
                <h4>{petition.userName}</h4>
              </div>
            </div>
            <div>
              <div>
                <h3>Dirigida a:</h3>
              </div>
              <div>
                <h4>{ petition.directedTo}</h4>
              </div>
            </div>
          </div>
          <div className="petition-page-content-desc">
            <p>{ petition.description}</p>
          </div>
        </div>
        <div className="petition-page-action">
          <div>
            <h4>{ petition.signatureCount} personas han firmado de un objetivo de: <b>{petition.goal}</b></h4>
            <Progress percent={(petition.signatureCount * 100) / petition.goal <= 100 ? (petition.signatureCount * 100) / petition.goal : 100} status={petition.isGoalCompleted ? "success" : "error"} />
          </div>
          <div>
            {auth && parseInt(auth.idUser) === petition.userId && (
              <h4>No puedes firmar peticiones creadas por ti mismo.</h4>
            )}
            {!auth && (
              <button onClick={() => navigateTo(window, navigate, '/login')}>
                Iniciar sesión para firmar
              </button>
            )}
            {auth && parseInt(auth.idUser) !== petition.userId && !signed && (
              <button onClick={handleSign}>
                Firmar
              </button>
            )}
            {auth && signed && (
              <h4>Ya has firmado esta peticion.</h4>
            )}
          </div>
        </div>
        <div className="petition-page-comments">
          <h2>Comentarios</h2>
          <div className="petition-page-comments-container">
            {petition.comments && petition.comments.length === 0 && (
              <h4>Esta peticion no tiene comentarios.</h4>
            )}
            {petition.comments && petition.comments.length > 0 && petition.comments.map((comment, i) => <PetitionComment key={i} {...comment}/>)}
          </div>
          {auth && <div className="petition-page-comments-new">
            <h2>Deja un comentario</h2>
            <div className="petition-page-comments-new-container">
                <textarea name="comment" id="comment" value={comment} onChange={(e) => setComment(e.target.value)}/>
                <button onClick={handleNewComment}>Enviar</button>
              </div>
          </div>}
        </div>
      </div>
    )
  } else {
    return (
      <div className="petition-page">
        <Head title={"Petition"} />
        <Loader/>
      </div>
    )
  }
}

const PetitionComment = ({ comment, created_at, userName }) => {
  
  const date = new Date(created_at)
  const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`

  return (
    <div className="comment">
      <div className="comment-user">
        <h4>{userName}</h4>
        <h4>{dateString}</h4>
      </div>
      <div className="comment-content">
        <p>{comment}
        </p>
      </div>
    </div>
  )
}

export default Petition