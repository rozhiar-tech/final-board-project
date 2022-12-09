import React, { useState } from "react";

import { NavLink, useParams, useLocation } from "react-router-dom";
import ModeToggle from "../theme/ModeToggle";
import { motion } from "framer-motion";
export default function SideBar() {
  const { projects } = useParams();

  const path = useLocation();
  console.log(path);
  console.log(projects);
  const pages = [
    {
      pageName: "Home",
      path: "/",
      iconFill: "home",
      icon: "home-outline",
    },
    {
      pageName: "Projects",
      path: "/projects",
      iconFill: "hourglass",
      icon: "hourglass-outline",
    },
    {
      pageName: "Add Project",
      path: "/addproject",
      iconFill: "add",
      icon: "add-outline",
    },
    {
      pageName: "Login",
      path: "/login",
      iconFill: "log-in",
      icon: "log-in-outline",
    },
    {
      pageName: "Profile",
      path: "/profile",
      iconFill: "person",
      icon: "person-outline",
      const: useState(false),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 1, translateX: -300 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.95, ease: "easeOut" }}
      className=" h-full pl-5 rounded-r-full overflow-hidden  bg-[#6200ee] w-52  fixed  text-[#ffffff]"
    >
      <ul className="flex mx-5 flex-col h-full w-48 items-start font-Main justify-center gap-10">
        {pages.map((page) => (
          <li className="">
            <NavLink
              to={page.path}
              className={({ isActive }) =>
                isActive
                  ? `  bg-[#ffffff]  dark:bg-[#121212] text-3xl duration-150 scale-110 transition-all text-[#018786] dark:text-[#03dac6] flex gap-3 justify-start items-center py-3 w-48 px-5 rounded-l-full `
                  : `transition-all  text-3xl  flex gap-3 justify-start items-center `
              }
            >
              <span className="text-xl"> {page.pageName}</span>
              <ion-icon
                name={page.path === path.pathname ? page.iconFill : page.icon}
              ></ion-icon>
            </NavLink>
          </li>
        ))}
        <li className="">
          <ModeToggle></ModeToggle>
        </li>
      </ul>
    </motion.div>
  );
}
