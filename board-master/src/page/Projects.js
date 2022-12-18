import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import app from "../firebase/initFirebase";
import { Progress } from "@material-tailwind/react";
import {
  getDocs,
  query,
  collection,
  getFirestore,
  where,
  doc,
  updateDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";


import ProjectCard from "../components/projectCard";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import itemTypes from "../utils/itemTypes";

const db = getFirestore(app);
export default function Projects({ currentUid }) {

  const [projects, setProjects] = useState([]);
  const [doneProjects, setDoneProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [documentId, setDocumentId] = useState();
  const [progressPercentage, setProgressPercentage] = useState(0);


  const [{isOver}, dropRef] =useDrop(
    {
      accept:itemTypes.CARD,
      drop:(item, monitor)=>markProjectDone(item),
      collect:(monitor)=>({
        isOver:!!monitor.isOver(),
      })
    }
  )
  
 

  useEffect(() => {
    // amay xwarawa bo aw projecta naya ka tawaw bwn
    // const docRef3 = query(collection(db, "assignedProjects", currentUid, "projects"),where("isDone", "==", true));
    const getProjects = async () => {
      const docRef3 = query(
        collection(db, "assignedProjects", currentUid, "projects"),
        where("isDone", "==", true)
        );
        const docDoneSnap = await getDocs(docRef3);
        
     onSnapshot(docRef3, (docDoneSnap) => {
      const projectsDoneArr = [];
      docDoneSnap.forEach((doc) => {
        projectsDoneArr.push(doc.data());
        
       
      });
      
      setDoneProjects(projectsDoneArr);
    });
        
        const docRef = query(
          collection(db, "assignedProjects", currentUid, "projects"),
          where("isDone", "==", false)
        );
      // const docSnap = await getDocs(docRef);
      // const projectsArr = [];
      // docSnap.forEach((doc) => {
      //   projectsArr.push(
      //     {
      //       projects:doc.data(),
      //       projectId:doc.id
      //     }
      //     );
      //     documentId = doc.id;
          
      //     // console.log(doc.data());
      //   });
        
        
        onSnapshot(docRef, (docSnap) => {
          const projectsArr = [];
        docSnap.forEach((doc) => {
          projectsArr.push(
            {
              projects:doc.data(),
              projectId:doc.id
            }
          );
          setDocumentId(...doc.id);

          // console.log(doc.data());
        });
        setProjects(projectsArr);
      });
      
      
    
      console.log(documentId)
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

  
  console.log(tasks)
  useEffect(() => {
    const getProgressPercentage = () => {
      if (projects.length === 0) {
        setProgressPercentage(100);
        return;
        
      }
      const totalProjects = projects.length;
      const totalDoneProjects = doneProjects.length;
      const totalTasks = tasks.length;
      const totalDoneTasks = tasks.filter((task) => task.isDone === true)
        .length;
      const totalProgress = totalDoneProjects + totalDoneTasks;
      const total = totalProjects + totalTasks;
      const percentage = Math.round((totalProgress / total) * 100);
      setProgressPercentage(percentage);
    };
    getProgressPercentage();
  }, [projects, doneProjects, tasks]);

  
  function markProjectDone(project) {
    const projectRef = collection(
      db,
      "assignedProjects",
      currentUid,
      "projects"
    );
    
    const docRef = doc(projectRef, project.projectId);
    updateDoc(docRef, {
      isDone: true,
    });
  }

  function deleteProject(project) {
    const projectRef = collection(
      db,
      "assignedProjects",
      currentUid,
      "projects"
    );
    const docRef = doc(projectRef, project.projectId);
    deleteDoc(docRef);
  }

  const tasksToShow=tasks.map((task) => (
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
  ))


  return (
    <motion.div
      
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="w-full min-h-full   items-center font-Main text-[#121212] dark:text-[#ffffff] flex justify-between"
    >
      <div className="flex flex-col gap-20 h-full justify-around">
         {/* <Progress value={50} label="Completed" className="bg-cyan-500" /> */}
         
         {isNaN(progressPercentage)?"Loading ...":<div className='h-5 w-full bg-gray-300'>
            <div
                style={{ width: `${progressPercentage}%`}}
                className={`h-full ${
                    progressPercentage < 70 ? 'bg-red-600' : 'bg-green-600'}`}>
                    {progressPercentage}%
            </div>
        </div>}
        <h1 className="text-6xl">Projects in progress</h1>

        {projects.map((project) => (
          <ProjectCard projects={project} markProjectDone={markProjectDone} deleteProject={deleteProject} tasksToShow={tasksToShow} />
        ))
          }
      </div>
      <div ref={dropRef} className="flex flex-col gap-20 h-full justify-around">
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
