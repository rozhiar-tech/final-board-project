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
  doc,
  getDoc,
} from "firebase/firestore";
const db = getFirestore(app);
export default function Projects({ currentUid }) {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  

  useEffect(() => {
    const getProjects = async () => {
    const docRef = query(collection(db, "assignedProjects", currentUid, "projects"),where("isDone", "==", false));
    // amay xwarawa bo aw projecta naya ka tawaw bwn
    // const docRef3 = query(collection(db, "assignedProjects", currentUid, "projects"),where("isDone", "==", true));
    const docSnap = await getDocs(docRef);
    const projectsArr = [];
    let documentId;
    docSnap.forEach((doc) => {
      projectsArr.push(doc.data());
      documentId = doc.id;  
      // console.log(doc.data()); 
    });
    console.log(documentId);
    setProjects(projectsArr);

    const taskRef = query(collection(db, "assignedProjects", currentUid,"tasks"),where("projectId", "==", documentId));

    const taskSnap = await getDocs(taskRef);
    
    const tasksArr=taskSnap.docs.map((doc) => doc.data());
    setTasks(tasksArr);
    console.log(tasksArr);
  };
  getProjects();
}, []);


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
