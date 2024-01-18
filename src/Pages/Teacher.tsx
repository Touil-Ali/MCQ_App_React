import React from "react";
import { Route, Routes } from "react-router-dom";
import QcmCreation from "../components/QcmCreation";
import QuestionCreation from "../components/QuestionCreation";
import Layout from "../layouts/TeacherLayout/layout";
import Class from "../components/Class";
const Teacher: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/qcm-creation" element={<QcmCreation />} />
        <Route
          path="/qcm-creation/question-creation/:qcmId"
          element={<QuestionCreation />}
        />
        <Route path="/class" element={<Class />} />
      </Routes>
    </Layout>
  );
};

export default Teacher;
