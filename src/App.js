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

import { getFirestore, getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

import app from "./firebase/initFirebase";
console.log(app);

function App() {
  const [theme, setTheme] = useState("light");
  const [userAuth, setUserAuth] = useState(false);
  const [currentUid, setCurrentUid] = useState();

  const auth = getAuth();
  const db = getFirestore();
  const [user, setUser] = useState(null);

  const [data, setData] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log(user);
        const getUsers = async () => {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setData(...data, docSnap.data());
            console.log(docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        };

        getUsers();
      } else {
        setUser(null);
      }
    });
  }, [currentUid]);
  const [isAdmin, setIsAdmin] = useState();

  console.log(data.role);
  return (
    <div className="App  dark:bg-[#121212]  min-h-screen w-full flex justify-start ">
      <div>
        <div className=" min-h-full relative rounded-r-full overflow-hidden w-52">
          <SideBar
            isAdmin={data.role}
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
              userAuth && data && data.role ? (
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
                  data={data}
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
          <Route
            path="/profile"
            element={<Profile data={data}></Profile>}
          ></Route>
          <Route
            path="/signup"
            element={
              userAuth && data && data.role ? (
                <SignUp
                  userAuth={userAuth}
                  setUserAuth={setUserAuth}
                  theme={theme}
                  setTheme={setTheme}
                ></SignUp>
              ) : (
                <Navigate replace to="/"></Navigate>
              )
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
