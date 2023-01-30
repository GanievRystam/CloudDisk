import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Registration from "./registration/Registration.jsx";
import Auth from "./authorization/Login.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "../action/user";
import Disk from "./disk/Disk";
import Profile from "./profile/Profile";

function App() {
  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(auth());
  },[] );
  return (
    <BrowserRouter>
      <div className="app my-5">
        <Navbar />
        {!isAuth ?
          <Routes>
            <Route path = "/registration" element = {<Registration/>}></Route>
            <Route path = "/login" element = {<Auth/>}></Route>
        </Routes>
        :
        <Routes>
            <Route exact path = "/" element = {<Disk/>}></Route>
            <Route exact path = "/profile" element = {<Profile/>}></Route>
        </Routes>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
