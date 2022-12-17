
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import  itemTypes  from "../utils/itemTypes";
import { useDrag } from "react-dnd";


const ProjectCard = ({projects, markProjectDone, deleteProject,tasksToShow}) => {
  const utc = new Date().toJSON().slice(0,10);
  const [dropDown, setDropDown] = useState(false);
  const [key, setKey] = useState();
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: itemTypes.CARD,
      item:projects,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      })
    }),
    []
  )

    return (
            <div  ref={dragRef}   className=" text-[#121212] dark:text-[#ffffff] flex flex-col gap-2" opacity={isDragging?0.5:1} draggable={true}  >
              <div  className="bg-slate-200 dark:bg-[#252525] w-[35rem] items-center h-32 rounded-2xl py-2 flex justify-between  px-10" >
                <div  className="flex flex-col items-start justify-start gap-2" >
                  <h1 className="text-4xl text-[#018786]   dark:text-[#03dac6] ">
                    {projects.projects.title}
                  </h1>
                  <p className="text-lg  text-[#12121247] dark:text-[#ffffff70]">
                    Due date :{" "}
                    <span className="text-[#121212c5] dark:text-[#ffffffb5] ">
                      {new Date(projects.projects.dueDate).toISOString().slice(0,10)<utc?<span className="text-red-600">overdue</span>:new Date(projects.projects.dueDate).toISOString().slice(0,10)}
                    </span>
                  </p>
                </div>
                <div className="text-5xl">
                  <button
                    onClick={() => {
                      setKey(projects.id);
                      setDropDown(dropDown === false ? true : false);
                    }}
                    className="mx-5 dark:text-[#bb86fc] text-[#6200ee]"
                  >
                    {dropDown && key === projects.title ? (
                      <ion-icon name="chevron-up-circle-outline"></ion-icon>
                    ) : (
                      <ion-icon name="chevron-down-circle-outline"></ion-icon>
                    )}
                  </button>
  
                  <button className="text-[#018786]   dark:text-[#03dac6]" onClick={()=>{
                    markProjectDone(projects)
                  }}>
                    <ion-icon name="checkmark-circle-outline"></ion-icon>
                  </button>
                  <button className="text-[#018786]   dark:text-[#03dac6]" onClick={()=>{
                    deleteProject(projects)
                  }}>
                      <ion-icon name="trash"></ion-icon>
                  </button>
                </div>
              </div>
  
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
                className={`h-fit transition-all ${
                  dropDown && key === projects.projects.title ? "" : "hidden"
                }  w-full py-2`}
              >
                <div
                  className={`h-fit px-10 py-2 dark:bg-[#3700b3] bg-[#6200ee] rounded-2xl   w-full flex flex-col justify-start`}
                >
                  <div className="h-fit  w-full ">
                    <p className="text-xl flex  text-[#ffffffc1]">
                      Description :{" "}
                      <span className=" text-[#ffffff] ">
                        <p>{projects.projects.description}</p>
                      </span>
                    </p>
                  </div>
  
                  <p>{projects.projects.status}</p>
                </div>
  
                {tasksToShow}
                
              </motion.div>
            </div>
    

    )
    };

export default ProjectCard;