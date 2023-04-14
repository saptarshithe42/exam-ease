import { useState } from "react"
import { useSignup } from "../../hooks/useSignup.js"

// styles
import "./Signup.css"

export default function Signup() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const { signup, isPending, error } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()

    signup(email, password, displayName)
  }


  return (
    <div className="signup-div">
      <div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign up</h2>

          <label>
            <span>Email:</span>
            <input
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>

          <label>
            <span>Password:</span>
            <input
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>

          <label>
            <span>Display name:</span>
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
      </div>
    </div>
  )
}
