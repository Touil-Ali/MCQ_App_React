import React, { useEffect, useState } from "react";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { useParams } from "react-router-dom";

import Alert, { AlertColor } from "@mui/material/Alert";

const QcmQuestionnaire: React.FC = () => {
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<number[]>(
    new Array(questions.length).fill(-1),
  );
  const [score, setScore] = useState<number | null>(null);
  const [alert, setAlert] = useState<{
    type: AlertColor | null;
    message: string | null;
  }>({ type: null, message: null });

  const { id } = useParams<{ id?: string }>();
  const studentId = new URLSearchParams(window.location.search).get(
    "studentId",
  );
  const qcmId = parseInt(id!);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/qcms/${id}/questions`,
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setQuestions(data);
        } else {
          console.error("Failed to fetch questions");
        }
      } catch (error) {
        console.error("Error occurred while fetching questions", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleCheckboxChange = (
    questionIndex: number,
    subQuestionIndex: number,
    isChecked: boolean,
  ) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = isChecked ? subQuestionIndex : -1;
    setAnswers(updatedAnswers);
  };

  const calculateScore = () => {
    let totalScore = 0;

    for (let i = 0; i < questions.length; i++) {
      const selectedSubQuestionIndex = answers[i];

      if (
        selectedSubQuestionIndex !== -1 &&
        questions[i].subQuestions[selectedSubQuestionIndex]?.correct
      ) {
        totalScore += 1;
      }
    }

    console.log(totalScore);
    setScore(totalScore);
  };

  const submitQcmResult = async () => {
    if (!isButtonClicked) {
      try {
        calculateScore();
        if (!studentId || score === null) {
          console.error("Invalide studentId or score");
          return;
        }
        const response = await fetch("http://localhost:8080/results/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            qcmId: qcmId,
            studentId,
            score,
          }),
        });
        if (response.ok) {
          setIsButtonClicked(true);
          console.log("Qcm Result Submitted successfully");
        } else {
          console.error("Failed to submit QCM  result");
        }
      } catch (error) {
        console.error("Error occured while submitting QCM result", error);
      }
    } else {
      setAlert({
        type: "error",
        message: "You Have Already Submitted",
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h2>QCM Questions</h2>
      {alert.type && <Alert severity={alert.type}>{alert.message}</Alert>}
      {questions.map((question, questionIndex) => (
        <div key={question.id}>
          <h3>{question.text}</h3>
          {question.subQuestions.map(
            (subQuestion: any, subQuestionIndex: number) => (
              <div key={subQuestion.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={answers[questionIndex] === subQuestionIndex}
                      onChange={(e) =>
                        handleCheckboxChange(
                          questionIndex,
                          subQuestionIndex,
                          e.target.checked,
                        )
                      }
                    />
                  }
                  label={subQuestion.text}
                />
              </div>
            ),
          )}
        </div>
      ))}
      <div>
        <Button variant="contained" onClick={submitQcmResult}>
          Submit Result
        </Button>
      </div>
    </div>
  );
};

export default QcmQuestionnaire;
