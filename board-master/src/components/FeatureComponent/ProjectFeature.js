import React from "react";
import { motion } from "framer-motion";
import HomeSvgProject from "../../svg/HomeSvgProject";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
export default function ProjectFeature() {
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
        className="flex items-center  justify-start gap-10 "
      >
        <motion.div
          ref={ref}
          variants={boxVariant}
          initial="hidden"
          animate={control}
          className="w-full md:w-1/2"
        >
          <h4 className="text-3xl dark:text-[#fff]  text-[#121212]   font-bold">
            project management
          </h4>
          <p className="dark:text-slate-300   font-Main  text-[#252525]">
            with this board master you can monitor your tasks and organize them.
            you can create projects and subordinate tasks for each projects and
            assign team members to it.
          </p>
        </motion.div>
        <div className="w-full md:w-1/2">
          <HomeSvgProject></HomeSvgProject>
        </div>
      </motion.div>
    </div>
  );
}
