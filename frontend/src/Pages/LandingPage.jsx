import React from "react";
import { motion } from "framer-motion";
import "./LandingPage.css";
import LoginForm from "./LoginForm";

const LandingPage = () => {
  return (
    <div className="landing-container">
      {}
      <motion.div
        className="left-panel"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="logo-title">
          <h1 className="title">SnackTrack</h1>
          <p className="punchline">
            Say goodbye to snack expense chaos – SnackTrack simplifies the way
            you track and reimburse.
          </p>
        </div>
      </motion.div>

      {}
      <motion.div
        className="right-panel"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <LoginForm /> {}
      </motion.div>
    </div>
  );
};

export default LandingPage;
