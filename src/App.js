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
import QuestionPaper from "./pages/question_paper/QuestionPaper";


function App() {

  const { user, authIsReady } = useAuthContext()


  return (
    // <div className="app-div">
    <div className="App">
      {authIsReady &&
        <BrowserRouter>
          <Navbar />
          {/* <div style={{display : "flex", flexDirection : "row", height : "100%"}}> */}
          {/* <div style={{ height: "90%" }}> */}
          <div>
            <Switch>
              <Route exact path="/">
                {!user && <Redirect to="/login" />}
                <div style={{ display: "flex", flexDirection: "row", height: "100%",
                backgroundColor: "#b0f59d" }}>
                  {/* {user && <Sidebar />} */}
                  {user && <Dashboard />}
                </div>
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
                <div style={{ display: "flex", flexDirection: "row", height: "100%",
                backgroundColor: "#b0f59d" }}>
                  {user && <Create />}
                </div>
                {/* {user && <Create />} */}
              </Route>

              <Route path="/exam">
                {!user && <Redirect to="/login" />}
                {user && <Exam />}
              </Route>

              <Route path="/questionpaper/:id">
                {!user && <Redirect to="/login" />}
                {user && <QuestionPaper />}
              </Route>

            </Switch>
          </div>
        </BrowserRouter>
      }
    </div>
  );
}

export default App
