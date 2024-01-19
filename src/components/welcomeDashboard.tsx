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
  return (
    <div className="ml-60">
      <h1 className="font-mono text-3xl ml-12 mt-6">
        Welcome <span className="font-bold text-orange-500">{username}</span>{" "}
      </h1>
      <p className="ml-16">
        The application allows the management of multiple-choice questionnaires
        (MCQs). You have the ability to create MCQs with associated questions
        and answers. Additionally, you can manage the classes to which these
        MCQs are intended. The user interface provides a user-friendly
        experience for creating, editing, and deleting MCQs, as well as managing
        classes.{" "}
      </p>
      <div className="translate-y-72 opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#A54F25"
            fill-opacity="1"
            d="M0,224L40,202.7C80,181,160,139,240,144C320,149,400,203,480,224C560,245,640,235,720,208C800,181,880,139,960,112C1040,85,1120,75,1200,74.7C1280,75,1360,85,1400,90.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default welcomeDashboard;
