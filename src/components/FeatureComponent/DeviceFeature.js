import React from "react";
import { motion } from "framer-motion";

import HomeSvgOne from "../../svg/HomeSvgOne";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
export default function DeviceFeature() {
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
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.85, ease: "easeOut" },
    },
    hidden: { opacity: 0, scale: 0.3 },
  };
  return (
    <div>
      <motion.div
        ref={ref}
        variants={boxVariant}
        initial="hidden"
        animate={control}
        className="flex items-center flex-wrap"
      >
        <motion.div class="w-full md:w-1/2">
          <h4 className="text-3xl dark:text-[#fff]  text-[#121212]   font-bold mb-3">
            Device flexablity
          </h4>
          <p className="dark:text-slate-300   font-Main  text-[#252525] ">
            you can use the board master everywhere on any device
          </p>
        </motion.div>

        <div className="w-full md:w-1/2">
          <HomeSvgOne></HomeSvgOne>
        </div>
      </motion.div>
    </div>
  );
}
