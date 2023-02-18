import { NavLink } from "react-router-dom"
import Avatar from "./Avatar"
import { useAuthContext } from "../hooks/useAuthContext"

// styles & images
import "./Sidebar1.css"
import DashboardIcon from "../assets/dashboard_icon.svg"
import AddIcon from "../assets/add_icon.svg"

function Sidebar() {

    const { user } = useAuthContext();

    return (
        <div className="sidebar">
            <div className="sidebar-content">
                <div className="user">
                    <Avatar src={user.photoURL} />
                    <p>Hey {user.displayName}</p>
                </div>
                <nav className="links">
                    <ul>
                        <li>
                            <NavLink exact to="/">
                                <img src={DashboardIcon} alt="dashboard icon" />
                                <span>Your Question Papers</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/create">
                                <img src={AddIcon} alt="add question paper icon" />
                                <span>New Question Paper</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/exam">
                                <img src={AddIcon} alt="give exam" />
                                <span>Give Exam</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar