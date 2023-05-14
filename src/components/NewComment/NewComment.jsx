// npm imports
import { useState } from 'react'

// css
import styles from './NewComment.module.css'

const NewComment = (props) => {
  const [formData, setFormData] = useState({text: ''})

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.handleAddComment(formData)
    setFormData({ text: ''})
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <textarea
        required
        type= "text"
        name= "text" 
        id= "text-input"
        value= {formData.text}
        placeholder = "Add a comment"
        onChange = {handleChange}
      />
      <button type="submit">Save</button>
    </form>
  )
}

export default NewComment