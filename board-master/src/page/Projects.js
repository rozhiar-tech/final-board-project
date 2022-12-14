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
  const [tasks, setTasks] = useState([]);
  
    
  useEffect(() => {
    async function getProjects () {
    
      const docRef = collection(db, "assignedProjects", currentUid, "projects");
      const docRef2= collection(db, "assignedProjects", currentUid, "tasks");
      const docSnap = await getDocs(docRef);
      const projects = [];
      docSnap.forEach((doc) => {
        projects.push(doc.data());
      });
      const docSnap2 = await getDocs(docRef2);
      const tasks = [];
      docSnap2.forEach((doc) => {
        tasks.push(doc.data());
      });
      setTasks(tasks);
      setProjects(projects);
    }

    getProjects();
  }, []);

  console.log(projects);
  console.log(tasks);
  console.log(currentUid);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      {projects.map((project) => (
        <div>
          {
            projects.map((project) => (
              <div>
                <h1>{project.title}</h1>
                <p>{project.description}</p>
                <p>{project.dueDate}</p>
                <p>{project.status}</p>
                <hr></hr>
              </div>

          ))
          
          }
        </div>
      ))}

    </motion.div>
  );
}

