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
  const [doneProjects, setDoneProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const docRef = query(
        collection(db, "assignedProjects", currentUid, "projects"),
        where("isDone", "==", false)
      );
      // amay xwarawa bo aw projecta naya ka tawaw bwn
      // const docRef3 = query(collection(db, "assignedProjects", currentUid, "projects"),where("isDone", "==", true));
      const docRef3 = query(
        collection(db, "assignedProjects", currentUid, "projects"),
        where("isDone", "==", true)
      );
      const docDoneSnap = await getDocs(docRef3);
      const projectsDoneArr = [];
      docDoneSnap.forEach((doc) => {
        projectsDoneArr.push(doc.data());

        // console.log(doc.data());
      });
      console.log(projectsDoneArr);
      setDoneProjects(projectsDoneArr);

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

      const taskRef = query(
        collection(db, "assignedProjects", currentUid, "tasks"),
        where("projectId", "==", documentId)
      );

      const taskSnap = await getDocs(taskRef);

      const tasksArr = taskSnap.docs.map((doc) => doc.data());
      setTasks(tasksArr);
    };
    getProjects();
  }, []);

  console.log(projects);
  console.log(tasks);

  const [dropDown, setDropDown] = useState(false);
  const [key, setKey] = useState();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="w-full min-h-full   items-center font-Main text-[#121212] dark:text-[#ffffff] flex justify-between"
    >
      <div className="flex flex-col gap-20 h-full justify-around">
        <h1 className="text-6xl">Projects in progress</h1>
        {projects.map((project) => (
          <div className=" text-[#121212] dark:text-[#ffffff] flex flex-col gap-2">
            <div className="bg-slate-200 dark:bg-[#252525] w-[35rem] items-center h-32 rounded-2xl py-2 flex justify-between  px-10">
              <div className="flex flex-col items-start justify-start gap-2">
                <h1 className="text-4xl text-[#018786]   dark:text-[#03dac6] ">
                  {project.title}
                </h1>
                <p className="text-lg  text-[#12121247] dark:text-[#ffffff70]">
                  Due date :{" "}
                  <span className="text-[#121212c5] dark:text-[#ffffffb5] ">
                    {project.dueDate}
                  </span>
                </p>
              </div>
              <div className="text-5xl">
                <button
                  onClick={() => {
                    setKey(project.title);
                    setDropDown(dropDown === false ? true : false);
                  }}
                  className="mx-5 dark:text-[#bb86fc] text-[#6200ee]"
                >
                  {dropDown && key === project.title ? (
                    <ion-icon name="chevron-up-circle-outline"></ion-icon>
                  ) : (
                    <ion-icon name="chevron-down-circle-outline"></ion-icon>
                  )}
                </button>

                <button className="text-[#018786]   dark:text-[#03dac6] ">
                  <ion-icon name="checkmark-circle-outline"></ion-icon>
                </button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className={`h-fit transition-all ${
                dropDown && key === project.title ? "" : "hidden"
              }  w-full py-2`}
            >
              <div
                className={`h-fit px-10 py-2 dark:bg-[#3700b3] bg-[#6200ee] rounded-2xl   w-full flex flex-col justify-start`}
              >
                <div className="h-fit  w-full ">
                  <p className="text-xl flex  text-[#ffffffc1]">
                    Description :{" "}
                    <span className=" text-[#ffffff] ">
                      <p>{project.description}</p>
                    </span>
                  </p>
                </div>

                <p>{project.status}</p>
              </div>

              {tasks.map((task) => (
                <div className={""}>
                  <p className="h-fit px-10 my-2 py-2 bg-slate-200 dark:bg-[#252525] rounded-2xl  text-xl text-start">
                    {task.task1}
                  </p>
                  <p className="h-fit px-10 my-2 py-2 bg-slate-200 dark:bg-[#252525] rounded-2xl  text-xl text-start">
                    {task.task2}
                  </p>
                  <p className="h-fit px-10 my-2 py-2 bg-slate-200 dark:bg-[#252525] rounded-2xl  text-xl text-start">
                    {task.task3}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-20 h-full justify-around">
        <h1 className="text-6xl">Done Projects</h1>
        {doneProjects.map((project) => (
          <div className="">
            <div className=" bg-[#0187878e]   dark:bg-[#03dac579]  w-[35rem] items-center h-32 rounded-2xl py-2 flex justify-between  px-10">
              <div className="flex flex-col items-start justify-start gap-2">
                <h1 className="text-4xl  text-[#121212]">{project.title}</h1>
                <p className="text-lg  text-[#12121247] ">
                  Due date :{" "}
                  <span className="text-[#121212c5] ">{project.dueDate}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
