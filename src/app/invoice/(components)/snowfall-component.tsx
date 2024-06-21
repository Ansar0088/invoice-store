"use client";
import Snowfall from "react-snowfall";
import { useEffect, useState } from "react";

const SnowfallComponent = () => {
  const [showSnow, setShowSnow] = useState(false);

  // useEffect(() => {
  //   const isFirstVisit = localStorage.getItem('isFirstVisit') === null;

  //   if (isFirstVisit) {
  //     setShowSnow(true);
  //     localStorage.setItem('isFirstVisit', 'false');
  //   }
  // }, []);
  // useEffect(() => {
  //   if (showSnow) {
  //     const timer = setTimeout(() => {
  //       setShowSnow(false);
  //     }, 5000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [showSnow]);

  // if (!showSnow) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: 1000,
      }}
    >
      <Snowfall snowflakeCount={100} />
    </div>
  );
};

export default SnowfallComponent;
