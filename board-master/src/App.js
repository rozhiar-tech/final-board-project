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

import app from "./firebase/initFirebase";
console.log(app);

function App() {
  const [theme, setTheme] = useState("light");
  const [userAuth, setUserAuth] = useState(false);
  return (
    <div className="App  dark:bg-[#121212]  min-h-screen w-full flex justify-start ">
      <div>
        <div className=" min-h-full relative rounded-r-full overflow-hidden w-52">
          <SideBar
            setUserAuth={setUserAuth}
            userAuth={userAuth}
            theme={theme}
            setTheme={setTheme}
          ></SideBar>
        </div>
      </div>

      <div className="min-h-full w-full mx-16  dark:bg-[#121212]">
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>

          <Route
            path="/projects"
            element={
              userAuth ? (
                <Projects></Projects>
              ) : (
                <Navigate replace to="/login"></Navigate>
              )
            }
          ></Route>
          <Route
            path="/Addproject"
            element={
              userAuth ? (
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
                  userAuth={userAuth}
                  setUserAuth={setUserAuth}
                  theme={theme}
                  setTheme={setTheme}
                ></Login>
              )
            }
          ></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
