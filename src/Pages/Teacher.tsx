import React from "react";
import { Route, Routes } from "react-router-dom";
import QcmCreation from "../components/QcmCreation";
import QuestionCreation from "../components/QuestionCreation";
import WelcomeDashboard from "../components/welcomeDashboard";
import Layout from "../layouts/TeacherLayout/layout";
import Class from "../components/Class";
import Student from "../components/Student";
import QcmDashboard from "../components/QcmDashboard";
import QcmResult from "../components/QcmResult";
const Teacher: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<WelcomeDashboard />} />
        <Route path="/qcm-creation" element={<QcmCreation />} />
        <Route
          path="/qcm-creation/question-creation/:qcmId"
          element={<QuestionCreation />}
        />
        <Route path="/class" element={<Class />} />
        <Route path="/student" element={<Student />} />
        <Route path="/Qcms" element={<QcmDashboard />} />
        <Route path="/QcmResult" element={<QcmResult />} />
      </Routes>
    </Layout>
  );
};

export default Teacher;
