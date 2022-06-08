import Head from "../components/Head"
import {useState, useEffect} from "react"
import { useNavigate } from "react-router"
import useAuth from "../hooks/useAuth";
import { getMeApi, updateUserApi, updateUserPassword } from "../api/user";
import Loader from "../components/Loader"
import Swal from "sweetalert2";
import { navigateTo } from "../utils/SillyFunctions";

const Settings = () => {
  let navigate = useNavigate();
  const { auth, logout } = useAuth();

  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [repeatNewPassword, setRepeatNewPassword] = useState("")
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [country, setCountry] = useState("")
  const [birthdate, setBirthdate] = useState("")

  const [loading, setLoading] = useState(false)


  useEffect(() => {
    if (auth) {
      (async () => {
        const response = await getMeApi(logout);
        if (response?.data?.data) { 
          console.log(response.data.data)
          response.data.data.created_at = new Date(response.data.data.created_at);
          setUser(response.data.data);
          setName(response.data.data.name)
          setLastName(response.data.data.lastname)
          setCountry(response.data.data.country)
          setBirthdate(response.data.data.birthDate)
        } else {
          navigate('/login')
        }
      })()
    } else {
      navigate('/login')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth])
  

  const handleBasicInformationChange = async (e) => {
    e.preventDefault();
    console.log('a')
    console.log(name)
    setLoading(true);
    const data = {
      name,
      lastName,
      country,
      birthDate: birthdate
    };
    
    const response = await updateUserApi(data, logout);
    if (response?.data?.success) { 
      Swal.fire({
        title: 'Actualizado',
        icon: 'success',
        text: 'Se ha actualizado correctamente',
      })
      navigateTo(window,navigate, '/my-profile')
    } else {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'No se ha podido actualizar su informacion.',
      })
      setLoading(false)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setLoading(true)
    window.scrollTo(0,0)
    if (newPassword === repeatNewPassword) {
      const data = {
        oldPassword,
        password: newPassword
      };
      const response = await updateUserPassword(data, logout);
      if (response?.data?.success) { 
        Swal.fire({
          title: 'Actualizado',
          icon: 'success',
          text: 'Se ha actualizado correctamente, vuelva a iniciar sesion con la nueva contraseña.'
        })
        logout()
        navigateTo(window,navigate, '/login')
      } else {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'No se ha podido actualizar su contraseña.',
        })
        setLoading(false)
      }  
    } else {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Las contraseñas no coinciden',
      })
      setLoading(false)
    }
  }

  if (user && !loading) {
    return (
      <div className="settings-page">
        <Head title={"Settings"} />
        <div className="content">
          <div>
            <h3>EDIT BASIC INFORMATION</h3>
            <div>
              <form onSubmit={handleBasicInformationChange}>
                <div>
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="lastname">Last Name</label>
                  <input type="text" name="lastname" id="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="country">Country</label>
                  <input type="text" name="country" id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="birthdate">Birthdate</label>
                  <input type="date" name="birthdate" id="birthdate" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                </div>
                <button type="submit">
                  Save
                </button>
              </form>
            </div>
          </div>
          <div>
            <h3>CHANGE PASSWORD</h3>
            <div>
              <form onSubmit={handlePasswordChange}>
                <div>
                  <label htmlFor="password">Old Password</label>
                  <input type="password" name="password" id="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="new-password">New Password</label>
                  <input type="password" name="new-password" id="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="repeat-password">Repeat New Password</label>
                  <input type="password" name="repeat-password" id="repeat-password" value={repeatNewPassword} onChange={(e) => setRepeatNewPassword(e.target.value)} />
                </div>
                <button type="submit">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="settings-page">
        <Head title={"Settings"} />
        <Loader />
      </div>
    )
  }
}

export default Settings