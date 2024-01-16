import React, { useEffect, useState } from "react";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { useParams } from "react-router-dom";

const QcmQuestionnaire: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<number[]>(
    new Array(questions.length).fill(-1),
  );
  const [score, setScore] = useState<number | null>(null);

  const { id } = useParams<{ id: string }>();
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

    setScore(totalScore);
  };

  const submitQcmResult = async () => {};

  return (
    <div className="flex flex-col items-center gap-6">
      <h2>QCM Questions</h2>
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
      <Button variant="contained" onClick={calculateScore}>
        Calculate Score
      </Button>
      {score !== null && (
        <div>
          <h3>Your Score: {score}</h3>
          <Button variant="contained" onClick={submitQcmResult}>
            Submit Result
          </Button>
        </div>
      )}
    </div>
  );
};

export default QcmQuestionnaire;
