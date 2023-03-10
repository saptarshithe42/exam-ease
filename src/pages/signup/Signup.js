import { useState } from "react"
import { useSignup } from "../../hooks/useSignup.js"

// styles
import "./Signup.css"

export default function Signup() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const {signup, isPending, error} = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()

    signup(email, password, displayName)
  }


  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign up</h2>

      <label>
        <span>email:</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>

      <label>
        <span>password:</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      <label>
        <span>display name:</span>
        <input
          required
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>

      {!isPending && <button className="btn btn-outline-success">Sign up</button>}
      {isPending && <button className="btn" disabled>loading</button>}
      {error && <div className="error">{error}</div>}
    </form>
  )
}
