import React from "react";
import { motion } from "framer-motion";
import HomeSvgOne from "../svg/HomeSvgOne";
// import LogoSvg from "../page/img/Minimal_Initial_Letter_Logo.svg";
// import LogoSvg from "../page/img/Minimal_Initial_Letter_Logo.svg";
import DeviceFeature from "../components/FeatureComponent/DeviceFeature";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectFeature from "../components/FeatureComponent/ProjectFeature";
import ReportFeature from "../components/FeatureComponent/PeportFeature";
import UnderLineCurve from "../svg/UnderLineCurve";
import UnderLine from "../svg/UnderLine";
import Rocket from "../svg/Rocket";
export default function Home({ userAuth }) {
  const control = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      control.start("hidden");
    } else {
      control.start("visible");
    }
  }, [control, inView]);

  const boxVariant = {
    visible: { opacity: 1, transition: { duration: 0.1 } },
    hidden: { opacity: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.85, ease: "easeOut" }}
      className="min-h-full w-full dark:bg-[#121212]"
    >
      <div className="flex justify-around items-center">
        <div className=" gap-16 flex flex-col justify-start items-start">
          <div>
            <h1 className="text-6xl  dark:text-[#fff]  text-[#121212]  font-Main">
              {" "}
              starmmon.io
              <span>
                <UnderLine></UnderLine>
              </span>
            </h1>
          </div>
          <h1 className="text-7xl  flex flex-col justify-start items-start dark:text-[#fff]  text-[#121212]   font-Main  mb-16">
            <span>Increase</span>
            <span>Your</span>
            <span className="text-[#018786]  dark:text-[#03dac6]">
              {" "}
              Productivity
              <UnderLineCurve></UnderLineCurve>
            </span>
            <span> Level</span>
          </h1>
        </div>

        <Rocket></Rocket>
      </div>

      <div className="container gap-24 font-Main flex flex-col justify-start items-center ">
        <h2 className="text-5xl text-[#018786] mr-32 dark:text-[#03dac6] font-bold font-Main  mb-16">
          Features
        </h2>

        <ProjectFeature></ProjectFeature>

        <ReportFeature></ReportFeature>
        <DeviceFeature></DeviceFeature>
      </div>

      {userAuth ? null : (
        <div className="container  flex flex-col gap-10 mx-auto px-6 text-center py-20">
          <h2 className="text-3xl dark:text-[#fff]  text-[#121212]   font-Main ">
            start using now, and orgnize your life
          </h2>
          <Link to={"/login"}>
            <button className="px-7 py-3 active:scale-100 text-[#ffffff] bg-[#018786] dark:text-[#121212] text-3xl dark:bg-[#03dac6] hover:scale-110 transition-all hover:shadow-2xl active:shadow-lg  rounded-full">
              Get started
            </button>
          </Link>
        </div>
      )}
    </motion.div>
  );
}
