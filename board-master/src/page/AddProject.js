import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { getDocs, addDoc,collection,getFirestore} from "firebase/firestore";
import app from "../firebase/initFirebase";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth(app);

export default function AddProject() {

  const[uid,setUid]=useState([]);  

  useEffect(() => {
    
    console.log("useri isn",uid);
    const getUsers = async () => {
      const userRef = collection(db, "Users");
      const querySnapshot = await getDocs(userRef);
      const newData= querySnapshot.docs.map((doc) => {
        setUid([...uid,doc.id]);
        return { value: doc.data().userName,
        label: doc.data().userName,
        id: doc.id,}
        
      }
      );
      setData(newData);
      
    };
    getUsers();
  }, []);
 
  const [isDone, setIsDone] = useState(false);
  const [data, setData] = useState([]);
  function handleSelect(data) {
    setSelectedOptions(data);

  }

 
  const [selectedOptions, setSelectedOptions] = useState();
  
  const formik = useFormik({
    initialValues: {
      title: "",
      dueDate: "",
      description: "",
      task1: "",
      task2: "",
      task3: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      dueDate: Yup.date().required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: async(values) => {
      // in here send the values to the firebase login
    
      const docRef = await addDoc(collection(db, "projects"), {
        title: values.title,
        dueDate: values.dueDate,
        description: values.description,
        isDone: isDone,
        selectedOptions: selectedOptions,
      });
      
      const docRef2 = await addDoc(collection(db, "projects",docRef.id,"tasks"), {
        task1: values.task1,
        task2: values.task2,
        task3: values.task3,
      });
      console.log("before the docRef3");
      selectedOptions.map(async (user) => {

      const docRef3= await addDoc(collection(db,"assignedProjects",user.id,"projects"), {
        title: values.title,
        dueDate: values.dueDate,
        description: values.description,
        isDone: isDone,
      });
    });
      selectedOptions.map(async (user) => {
        console.log("after the docRef3");
      const docRef4 = await addDoc(collection(db, "assignedProjects",user.id,"tasks"), {
        task1: values.task1,
        task2: values.task2,
        task3: values.task3,
      });
    });

      console.log(
        values.title,
        values.dueDate,
        values.description,
        isDone,
        selectedOptions,
        values.task1,
        values.task2,
        values.task3
      );
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="min-h-full flex flex-col  gap-20 font-Main text-[#121212] dark:text-[#ffffff]   justify-start items-start  dark:bg-[#121212]"
    >
      <h1 className="text-6xl"> Add new project</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="flex justify-start items-start gap-20 w-full"
      >
        <div className="flex-col flex gap-10 justify-start items-start">
          <label className="flex  flex-col justify-start items-start gap-2">
            <span className="text-xl ">Title</span>
            <input
              id="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              onBlur={formik.handleBlur}
              type={"text"}
              className="w-72 bg-slate-200 dark:bg-[#252525] text-lg px-4 py-3 rounded-full "
              placeholder="Project title "
            ></input>
            <div className="flex justify-between w-full">
              {formik.touched.title && formik.errors.title && (
                <p className="dark:text-[#cf6679] text-[#b00020]">
                  {formik.errors.title}
                </p>
              )}
              <h1 className="dark:text-[#121212] text-[#ffffff]">.</h1>
            </div>
          </label>
          <label className="flex  flex-col justify-start items-start gap-2">
            <span className="text-xl ">Due date</span>
            <input
              id="dueDate"
              onChange={formik.handleChange}
              value={formik.values.dueDate}
              onBlur={formik.handleBlur}
              type={"date"}
              className="w-72 bg-slate-200 dark:bg-[#252525] text-lg px-4 py-3 rounded-full "
              placeholder="Due date of the project "
            ></input>
            <div className="flex justify-between w-full">
              {formik.touched.dueDate && formik.errors.dueDate && (
                <p className="dark:text-[#cf6679] text-[#b00020]">
                  {formik.errors.dueDate}
                </p>
              )}
              <h1 className="dark:text-[#121212] text-[#ffffff]">.</h1>
            </div>
          </label>
          <label className="flex  flex-col justify-start items-start gap-2">
            <span className="text-xl ">The project is Done ?</span>
            <div className="flex gap-1">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsDone(true);
                }}
                className={`${
                  isDone
                    ? " text-[#ffffff] scale-110 bg-[#018786] dark:text-[#121212]  dark:bg-[#03dac6] "
                    : " bg-slate-200 dark:bg-[#252525]"
                } px-8 py-4 rounded-l-full text-xl transition-all`}
              >
                Yes
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsDone(false);
                }}
                className={`${
                  isDone
                    ? " bg-slate-200  dark:bg-[#252525]"
                    : " dark:bg-[#cf6679] scale-110 text-[#fff] dark:text-[#121212] bg-[#b00020]"
                } px-8 py-4 rounded-r-full text-xl transition-all`}
              >
                No
              </button>
            </div>
          </label>
        </div>

        <div className="flex-col flex gap-6 justify-start items-start">
          <label className="flex  flex-col justify-start items-start gap-2">
            <span className="text-xl ">description</span>

            <textarea
              id="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              onBlur={formik.handleBlur}
              type={"text"}
              className="w-96 text-left  bg-slate-200 outline-none dark:bg-[#252525] h-64  text-lg px-4 py-3 rounded-3xl "
              placeholder="Descripe the project "
            ></textarea>

            <div className="flex justify-between w-full">
              {formik.touched.description && formik.errors.description && (
                <p className="dark:text-[#cf6679] text-[#b00020]">
                  {formik.errors.description}
                </p>
              )}
              <h1 className="dark:text-[#121212] text-[#ffffff]">.</h1>
            </div>
          </label>

          <div className="flex justify-between  flex-col  h-52 w-72 text-black">
            <div className="flex flex-col gap-2">
              <span className="text-xl  text-start text-[#121212] dark:text-[#ffffff]">
                Assign to
              </span>
              <Select
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 10,

                  colors: {
                    ...theme.colors,
                    primary25: "#e2d6ff",

                    primary: "black",
                  },
                })}
                isSearchable={true}
                onChange={handleSelect}
                value={selectedOptions}
                options={data}
                placeholder="Assign To"
                isMulti
              />
            </div>
          </div>
        </div>

        <div className="flex-col flex gap-10 justify-start items-start">
          <label className="flex   flex-col justify-start items-start gap-2">
            <span className="text-xl ">Add sub tasks</span>
            <input
              id="task1"
              onChange={formik.handleChange}
              value={formik.values.task1}
              onBlur={formik.handleBlur}
              type={"text"}
              className="w-72 bg-slate-200 dark:bg-[#252525] text-lg px-4 py-3 rounded-full "
              placeholder="Task one "
            ></input>

            <input
              id="task2"
              onChange={formik.handleChange}
              value={formik.values.task2}
              onBlur={formik.handleBlur}
              type={"text"}
              className="w-72 bg-slate-200 dark:bg-[#252525] text-lg px-4 py-3 rounded-full "
              placeholder="Task two "
            ></input>
            <input
              id="task3"
              onChange={formik.handleChange}
              value={formik.values.task3}
              onBlur={formik.handleBlur}
              type={"text"}
              className="w-72 bg-slate-200 dark:bg-[#252525] text-lg px-4 py-3 rounded-full "
              placeholder="Task three "
            ></input>
          </label>
          <button
            type="submit"
            className="w-72 active:scale-100 text-[#ffffff] bg-[#018786] dark:text-[#121212] text-3xl dark:bg-[#03dac6] hover:scale-110 transition-all hover:shadow-2xl active:shadow-lg px-3 py-3 rounded-full"
          >
            Sumbit
          </button>
        </div>
      </form>
    </motion.div>
  );
}
