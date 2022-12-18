import React from "react";
import { motion } from "framer-motion";

import Reporting from "./assets/report.svg";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
export default function ReportFeature() {
  const control = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);
  const boxVariant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0, scale: 0.3 },
  };
  return (
    <div>
      <motion.div
        ref={ref}
        variants={boxVariant}
        initial="hidden"
        animate={control}
        className="flex items-center flex-wrap "
      >
        <div className="w-full md:w-1/2">
          <img src={Reporting} alt="Monitoring" />
        </div>

        <motion.div className="w-full md:w-1/2">
          <h4 className="text-3xl dark:text-[#fff]  text-[#121212]   font-bold ">
            Reporting
          </h4>
          <p className="dark:text-slate-300   font-Main  text-[#252525] ">
            you can generate a comprehensive report on your projects and tasks
            depending on your settings either daily, weekly, monthly
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
