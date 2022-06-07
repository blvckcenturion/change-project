import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom";
import Head from '../components/Head';
import Swal from 'sweetalert2';
import { loginApi} from "../api/user";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { navigateTo } from "../utils/SillyFunctions";
import Loader from '../components/Loader';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { auth, login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    const response = await loginApi(formData)
    console.log(response)
    if (response?.data?.token) {
      
      login(response.data.token)
      Swal.fire({
        icon: "success",
        text: "Login correcto"
      })
      navigateTo(window, navigate, "/my-profile")
    } else {
      setLoading(false);
      Swal.fire({
        icon: "error",
        text: "Login incorrecto"
      })
    }
  }

  if (!loading) {
    return (
      <div className="login-page">
        <div className="form">
    <h3>
      LOG IN TO CHANGE PROJECT
    </h3>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">
        Log in
      </button>
    </form>
    <Link to="/register">Don't have an account?</Link>
  </div>
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

export default Login