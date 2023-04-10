import { useContext } from "react";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/profile/Profile";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import Messenger from "./Pages/messenger/Messenger";
import NotFound from "./Pages/notFound/NotFound";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import "./app.css";

function App() {
  const {user} = useContext(AuthContext);
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Navigate replace to={"/login"}/>} />
          <Route path="/login" element={user ? <Navigate replace to={"/"} /> : <Login />} />
          <Route path="/register" element={user ? <Navigate replace to={"/"} /> : <Register />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/messages" element={user ? <Messenger/> : <Navigate replace to={"/"} /> }/>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
