import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Head from "../components/Head"
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { navigateTo } from "../utils/SillyFunctions";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [country, setCountry] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const navigate = useNavigate()
  const { auth, login } = useAuth();

  const handleSubmit = async (e) => {
    
    e.preventDefault()

    const formData = new FormData();
    formData.append('email', email);
    formData.append('name', name);
    formData.append('lastName', lastName);
    formData.append('password', password);
    formData.append('password_confirmation', repeatPassword);
    formData.append('country', country);
    formData.append('birthDate', birthdate);
    
    await axios.post(`http://localhost:8000/api/users/register`, formData)
      .then(({data}) => {
        Swal.fire({
          icon: "success",
          text: data.message
        })
        navigateTo(window, navigate, "/login")
      }).catch(({ response }) => {
        console.log(response)
        let error = "";
        if (response.data.message.email[0] === "The email has already been taken.") {
          error += "El email ya está registrado."
        }
        Swal.fire({
          icon: "error",
          text: error
        })
      })
  }

  useEffect(() => {
    if (auth) {
      navigateTo(window, navigate, "/")
    }
  }, [auth])
  

  return (
    <div className="register-page">
      <Head title={"Register"}/>
      <div className="form">
      <h3>
        SIGN UP TO CHANGE PROJECT
      </h3>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="birthdate">Birthdate</label>
          <input type="date" name="birthdate" id="birthdate" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label htmlFor="repeat-password">Repeat Password</label>
          <input type="password" name="repeat-password" id="repeat-password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
        </div>
        <button type="submit">
          Sign Up
        </button>
      </form>
      <Link to="/login">Already have an account?</Link>
      </div>
      
    </div>
  )
}

export default Register