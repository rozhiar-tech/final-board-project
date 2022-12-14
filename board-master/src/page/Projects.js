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
  const getProjects = async () => {
    const docRef = collection(db, "assignedProjects", currentUid, "projects");
    const docRef2 = collection(db, "assignedProjects", currentUid, "tasks");
    const docSnap = await getDocs(docRef);
    const projectsArr = [];
    console.log(docSnap);
    docSnap.forEach((doc) => {
      projectsArr.push(doc.data());
    });
    const docSnap2 = await getDocs(docRef2);
    const tasksArr = [];
    docSnap2.forEach((doc) => {
      tasksArr.push(doc.data());
    });
    setTasks(tasksArr);
    console.log(tasksArr);
    console.log(projectsArr);
    setProjects(projectsArr);
  };

  useEffect(() => {
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
        <div className="text-5xl text-red-400">
          <h1>{project.title}</h1>

          <p>{project.description}</p>
          <p>{project.dueDate}</p>
          <p>{project.status}</p>
          {tasks.map((task) => (
            <div>
              <div>
                <h1>Tasks</h1>
                <p>{task.task1}</p>
                <p>{task.task2}</p>
                <p>{task.task3}</p>
              </div>
            </div>
          ))}

          <hr></hr>
        </div>
      ))}
    </motion.div>
  );
}
