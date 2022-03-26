import { useState } from "react"
import { Link } from "react-router-dom"
import Head from '../components/Head'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault()
    console.table({ email, password})
  }

  return (
    <div className="login-page">
      <Head title={"Login"}/>
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
}

export default Login