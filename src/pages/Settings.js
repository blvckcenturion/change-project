import Head from "../components/Head"
import {useState} from "react"

const Settings = () => {

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [repeatNewPassword, setRepeatNewPassword] = useState("")
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [birthdate, setBirthdate] = useState("")

  const handleBasicInformationChange = (e) => {
     e.preventDefault()
    console.log("Basic information submitted")
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    console.log("Password submitted")
  }

  return (
    <div className="settings-page">
      <Head title={"Settings"} />
      <div>
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
                <label htmlFor="city">City</label>
                <input type="text" name="city" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
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
}

export default Settings