import Head from "../components/Head"
import { useState } from "react"

const NewPetition = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    console.log("submit")
  }

  return (
    <div className="new-petition-page">
      <Head title={"New Petition"} />
      
    </div>
  )
}

export default NewPetition