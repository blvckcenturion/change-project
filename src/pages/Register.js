import { useState } from "react"
import { Link } from "react-router-dom"
import Head from "../components/Head"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [birthdate, setBirthdate] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault()
    console.table({ email, password, name, lastName, country, city, birthdate })
  }

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
          <label htmlFor="city">City</label>
          <input type="text" name="city" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
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