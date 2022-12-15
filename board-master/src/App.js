import "./App.css";

import { Routes, Route } from "react-router";
import Home from "./page/Home";
import AddProject from "./page/AddProject";
import Projects from "./page/Projects";
import SideBar from "./components/Navigation/SideBar";
import Login from "./page/Login";
import Profile from "./page/Profile";
import { useState } from "react";
import { Navigate } from "react-router";
import { motion } from "framer-motion";
import SignUp from "./page/SignUp";

import app from "./firebase/initFirebase";
console.log(app);

function App() {
  const [theme, setTheme] = useState("light");
  const [userAuth, setUserAuth] = useState(false);
  const [currentUid, setCurrentUid] = useState();
  const [isAdmin, setIsAdmin] = useState();
  return (
    <div className="App  dark:bg-[#121212]  min-h-screen w-full flex justify-start ">
      <div>
        <div className=" min-h-full relative rounded-r-full overflow-hidden w-52">
          <SideBar
            isAdmin={isAdmin}
            setUserAuth={setUserAuth}
            userAuth={userAuth}
            theme={theme}
            setTheme={setTheme}
          ></SideBar>
        </div>
      </div>

      <div className="min-h-full w-full mx-20 py-24 dark:bg-[#121212]">
        <Routes>
          <Route path="/" element={<Home theme={theme}></Home>}></Route>

          <Route
            path="/projects"
            element={
              userAuth ? (
                <Projects currentUid={currentUid}></Projects>
              ) : (
                <Navigate replace to="/login"></Navigate>
              )
            }
          ></Route>
          <Route
            path="/Addproject"
            element={
              userAuth && userAuth ? (
                <AddProject></AddProject>
              ) : (
                <Navigate replace to="/login"></Navigate>
              )
            }
          ></Route>
          <Route
            path="/login"
            element={
              userAuth ? (
                <Navigate replace to="/"></Navigate>
              ) : (
                <Login
                  setIsAdmin={setIsAdmin}
                  setCurrentUid={setCurrentUid}
                  userAuth={userAuth}
                  setUserAuth={setUserAuth}
                  theme={theme}
                  setTheme={setTheme}
                ></Login>
              )
            }
          ></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route
            path="/signup"
            element={
              <SignUp
                userAuth={userAuth}
                setUserAuth={setUserAuth}
                theme={theme}
                setTheme={setTheme}
              ></SignUp>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
