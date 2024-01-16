import React from "react";
import { Route, Routes } from "react-router-dom";
import QcmCreation from "../components/QcmCreation";
import QuestionCreation from "../components/QuestionCreation";
import Layout from "../layouts/TeacherLayout/layout";
const Teacher: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/qcm-creation" element={<QcmCreation />} />
        <Route
          path="/question-creation/:qcmId"
          element={<QuestionCreation />}
        />
      </Routes>
    </Layout>
  );
};

export default Teacher;
