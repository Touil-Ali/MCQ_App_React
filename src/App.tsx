import React from "react";
import QcmCreation from "./components/QcmCreation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import QuestionCreation from "./components/QuestionCreation";
import QcmQuestionnaire from "./components/QcmQuestionnaire";
import QcmList from "./components/QcmList";
import Teacher from "./Pages/Teacher";
import Login from "./Pages/Auth/login";
import { AuthProvider } from "./AuthContext";
import { RequireAuth } from "./components/Auth/RequireAuth";
const App: React.FC = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/teacher/*"
              element={
                <RequireAuth>
                  <Teacher />
                </RequireAuth>
              }
            />
            <Route
              path="/qcm-questionnaire/:id"
              element={<QcmQuestionnaire />}
            />
            <Route path="/qcm-questionnaire" element={<QcmList />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
