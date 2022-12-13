import React from "react";
import LoginSvgLight from "../svg/LoginSvgLight";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/initFirebase";
import { Route } from "react-router";
import Home from "./Home";
import SignUpSvg from "../svg/SignUpSvg";
import LoginSvgDark from "../svg/LoginSvgDark";

export default function SignUp({ theme, setTheme, useAuth, setUserAuth }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const formik = useFormik({
    initialValues: {
      userName: "",

      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      // in here send the values to the firebase login

      console.log(values.userName, values.email, values.password, isAdmin);
    },
  });
  const [Hidepassword, setHidePassword] = useState("password");

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="min-h-full flex  font-Main text-[#121212] dark:text-[#ffffff]  justify-around items-center  dark:bg-[#121212]"
      >
        <div className="w-fit h-fit py-10 px-5 flex flex-col justify-center gap-16 items-start">
          <div className="flex  flex-col items-start justify-star gap-3">
            <h1 className="text-6xl ">Add new users</h1>
            <p>Create accounts for new users as an admin </p>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-8  "
          >
            <label className="flex  flex-col justify-start items-start gap-2">
              <span className="text-xl ">User name</span>
              <input
                id="userName"
                onChange={formik.handleChange}
                value={formik.values.userName}
                onBlur={formik.handleBlur}
                type={"text"}
                className="w-96 bg-slate-100 dark:bg-[#252525] text-lg px-3 py-3 rounded-full "
                placeholder="Type full name "
              ></input>
              <div className="flex justify-between w-full">
                {formik.touched.userName && formik.errors.userName && (
                  <p className="dark:text-[#cf6679] text-[#b00020]">
                    {formik.errors.userName}
                  </p>
                )}
                <h1 className="dark:text-[#121212] text-[#ffffff]">.</h1>
              </div>
            </label>
            <label className="flex  flex-col justify-start items-start gap-2">
              <span className="text-xl ">Choose the role?</span>
              <div className="flex gap-1">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsAdmin(true);
                  }}
                  className={`${
                    isAdmin
                      ? " text-[#ffffff] scale-110 bg-[#6200ee]   dark:bg-[#3700b3] "
                      : " bg-slate-200 dark:bg-[#252525]"
                  } px-8 py-4 rounded-l-full text-xl transition-all`}
                >
                  Admin
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsAdmin(false);
                  }}
                  className={`${
                    isAdmin
                      ? " bg-slate-200  dark:bg-[#252525]"
                      : " bg-[#018786] scale-110 text-[#fff] dark:text-[#121212] dark:bg-[#03dac6]"
                  } px-8 py-4 rounded-r-full text-xl transition-all`}
                >
                  Normal user
                </button>
              </div>
            </label>
            <label className="flex  flex-col justify-start items-start gap-2">
              <span className="text-xl ">Email</span>
              <input
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                type={"email"}
                className="w-96 bg-slate-100 dark:bg-[#252525] text-lg px-3 py-3 rounded-full "
                placeholder="Type your email "
              ></input>
              <div className="flex justify-between w-full">
                {formik.touched.email && formik.errors.email && (
                  <p className="dark:text-[#cf6679] text-[#b00020]">
                    {formik.errors.email}
                  </p>
                )}
                <h1 className="dark:text-[#121212] text-[#ffffff]">.</h1>
              </div>
            </label>
            <label className="flex flex-col items-start justify-start gap-2">
              <span className="text-xl">Password</span>
              <input
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                type={Hidepassword}
                onBlur={formik.handleBlur}
                className="w-96 bg-slate-100 dark:bg-[#252525] text-lg px-3 py-3 rounded-full"
                placeholder="Type your password "
              ></input>
              <div className="flex justify-between w-full">
                {formik.touched.password && formik.errors.password && (
                  <h1 className="dark:text-[#cf6679] text-[#b00020]">
                    {formik.errors.password}
                  </h1>
                )}
                <label className="flex gap-5 py-2 items-center justify-start ml-5">
                  <input
                    onChange={() => {
                      setHidePassword(
                        Hidepassword === "text" ? "password" : "text"
                      );
                    }}
                    type={"checkbox"}
                    className="text-4xl bg-[#018786]  scale-150 "
                  ></input>
                  <span className={`text-sm  font-light `}>Show passowrd</span>
                </label>
              </div>
            </label>
            <button className="w-96 active:scale-100 text-[#ffffff] bg-[#018786] dark:text-[#121212] text-3xl dark:bg-[#03dac6] hover:scale-110 transition-all hover:shadow-2xl active:shadow-lg px-3 py-3 rounded-full">
              Sign Up
            </button>
          </form>
        </div>

        <SignUpSvg></SignUpSvg>
      </motion.div>
    </div>
  );
}
