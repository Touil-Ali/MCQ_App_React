import React from "react";
import { useAuth } from "../AuthContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const welcomeDashboard: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { authState } = useAuth();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const username = authState.username;
  const handleClick = () => {
    navigate("/teacher/qcm-creation");
  };
  return (
    <div className="ml-60">
      <h1 className="font-mono text-3xl ml-12 mt-6">
        Welcome <span className="font-bold">{username}</span>{" "}
      </h1>
      <p className="ml-16">
        The application allows the management of multiple-choice questionnaires
        (MCQs). You have the ability to create MCQs with associated questions
        and answers. Additionally, you can manage the classes to which these
        MCQs are intended. The user interface provides a user-friendly
        experience for creating, editing, and deleting MCQs, as well as managing
        classes.{" "}
      </p>
      <Button
        onClick={handleClick}
        className="translate-y-8 translate-x-80"
        variant="contained"
      >
        Create QCM
      </Button>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-14 opacity-65 animate-bounce absolute ml-96 mt-12 "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
        />
      </svg>
      <img
        className="w-96 hidden md:block opacity-65 absolute mt-20 right-48	"
        src="/img/bg.svg"
        alt="background"
      />
    </div>
  );
};

export default welcomeDashboard;
