import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// styles
import "./App.css"

import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Create from "./pages/create/Create";
import Exam from "./pages/exam/Exam";


function App() {

  const { user, authIsReady } = useAuthContext()


  return (
    <div className="App">
      {authIsReady &&
        <BrowserRouter>
            <Navbar />
          <div>
            <Switch>
              <Route exact path="/">
                {!user && <Redirect to="/login" />}
                {/* {user && <Sidebar />} */}
                {user && <Dashboard />}
              </Route>


              <Route path="/login">
                {user && <Redirect to="/" />}
                {!user && <Login />}
              </Route>

              <Route path="/signup">
                {user && <Redirect to="/" />}
                {!user && <Signup />}
              </Route>

              <Route path="/create">
                {!user && <Redirect to="/login" />}
                {user && <Create />}
              </Route>

              <Route path="/exam">
                {!user && <Redirect to="/login" />}
                {user && <Exam />}
              </Route>

            </Switch>
          </div>
        </BrowserRouter>
      }
    </div>
  );
}

export default App
