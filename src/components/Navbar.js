import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// styles & images
import './Navbar.css'


function Navbar() {

  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  return (
  
    <nav className="navbar navbar-expand-md bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Exam Ease</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        {!user &&
          <ul className="nav">
            <li><Link to="/login" className="nav-item btn btn-outline-primary">Login</Link></li>
            <li><Link to="/signup" className="nav-item btn btn-outline-primary">Signup</Link></li>
          </ul>
        }

        {user &&
          <ul className="nav">
            <li className="nav-item">
              {!isPending && <button className="btn btn-outline-success" onClick={logout}>Logout</button>}
              {isPending && <button className="btn btn-outline-success" disabled>Logging out...</button>}
            </li>
          </ul>
        }
      </div>
      </div>
    </nav>
  )
}

export default Navbar