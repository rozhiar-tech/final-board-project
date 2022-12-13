import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import app from "../firebase/initFirebase";

import {
  getDocs,
  query,
  addDoc,
  collection,
  getFirestore,
  where,
} from "firebase/firestore";
const db = getFirestore(app);
export default function Projects({ currentUid }) {
  const [projects, setProjects] = useState([]);
  const getProjects = async () => {
    const userRef = collection(db, "projects");
    // const q = query(userRef, where("selectedOptions.id", "==", currentUid));

    const querySnapshot = await getDocs(userRef);
    setProjects([]);
    const newData = querySnapshot.docs.map((doc) => {
      setProjects((prev) => [...prev, doc.data()]);
      console.log(doc.data());
    });
  };
  useEffect(() => {
    getProjects();
  }, []);

  console.log(projects);
  console.log(currentUid);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      {projects.map((project) => (
        <div>
          {project.selectedOptions.map((assignedUserId) =>
            assignedUserId.id === currentUid ? (
              <div>
                <h1 className="text-7xl text-red-400">{project.title}</h1>
              </div>
            ) : null
          )}
        </div>
      ))}
    </motion.div>
  );
}
