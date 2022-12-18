import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function Profile({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      <h1 className="text-xl ">Profile</h1>

      <img src={data.img} alt="" className="w-32 h-32 rounded-full" />

      <h1 className="text-lg mt-10 text-left">{data.userName}</h1>

      <p className="text-xl mt-10 text-left">{data.email}</p>
    </motion.div>
  );
}
