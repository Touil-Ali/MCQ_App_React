import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

interface SubQuestion {
  content: string;
  isCorrect: boolean;
}

interface Question {
  title: string;
  subQuestions: SubQuestion[];
}
const QuesitonCreation: React.FC = () => {
  const navigate = useNavigate();
  let { qcmId } = useParams();
  console.log("qcm id", qcmId);
  const [questions, setQuestions] = useState<Question[]>([
    { title: "", subQuestions: [] },
  ]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { title: "", subQuestions: [] }]);
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleAddSubQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].subQuestions.push({
      content: "",
      isCorrect: false,
    });
    setQuestions(updatedQuestions);
  };

  const handleRemoveSubQuestion = (qIndex: number, sqIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].subQuestions.splice(sqIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (
    index: number,
    field: keyof Question,
    value: string | SubQuestion[],
  ) => {
    const updatedQuestions = [...questions];
    if (field === "title") {
      // If changing the title, assign the string value directly
      updatedQuestions[index][field] = value as string;
    } else {
      // If changing subQuestions, make sure it's an array of SubQuestion
      updatedQuestions[index][field] = value as SubQuestion[];
    }
    setQuestions(updatedQuestions);
  };

  const handleSubQuestionChange = (
    qIndex: number,
    sqIndex: number,
    value: string,
    isCorrect: boolean,
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].subQuestions[sqIndex] = {
      content: value,
      isCorrect,
    };
    setQuestions(updatedQuestions);
  };
  const handleCreationQcm = async () => {
    try {
      for (const question of questions) {
        const qcmData = {
          text: question.title,
          subQuestions: question.subQuestions.map((subQuestion) => ({
            text: subQuestion.content,
            correct: subQuestion.isCorrect,
          })),
        };

        console.log(qcmData);
        const response = await fetch(
          `http://localhost:8080/qcms/${qcmId}/questions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(qcmData),
          },
        );

        if (response.ok) {
          console.log("Question Created Successfully!");
        } else {
          console.error("Failed to create Question");
        }
      }
      navigate("/teacher");
    } catch (error) {
      console.error("Error occurred while Creating Questions", error);
    }
  };
  return (
    <div className="flex flex-col gap-6 items-center">
      <h1>Create QCM</h1>
      {questions.map((question, qIndex) => (
        <div key={qIndex}>
          <TextField
            id="outlined-basic"
            label="Title"
            type="text"
            value={question.title}
            onChange={(e) =>
              handleQuestionChange(qIndex, "title", e.target.value)
            }
          />
          {question.subQuestions.map((subQuestion, sqIndex) => (
            <div key={sqIndex}>
              <TextField
                id="outlined-basic"
                type="text"
                placeholder={`Sub-Question ${sqIndex + 1}`}
                value={subQuestion.content}
                onChange={(e) =>
                  handleSubQuestionChange(
                    qIndex,
                    sqIndex,
                    e.target.value,
                    subQuestion.isCorrect,
                  )
                }
              />
              <label>
                Correct Answer:
                <input
                  type="checkbox"
                  checked={subQuestion.isCorrect}
                  onChange={(e) =>
                    handleSubQuestionChange(
                      qIndex,
                      sqIndex,
                      subQuestion.content,
                      e.target.checked,
                    )
                  }
                />
              </label>
              {question.subQuestions.length > 1 && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemoveSubQuestion(qIndex, sqIndex)}
                >
                  Remove Sub-Question
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="contained"
            onClick={() => handleAddSubQuestion(qIndex)}
          >
            Add Sub-Question
          </Button>
          {questions.length > 1 && (
            <Button
              variant="contained"
              color="error"
              onClick={() => handleRemoveQuestion(qIndex)}
            >
              Remove Question
            </Button>
          )}
        </div>
      ))}
      <Button variant="contained" onClick={handleAddQuestion}>
        Add Question
      </Button>
      <Button variant="contained" color="success" onClick={handleCreationQcm}>
        Create QCM
      </Button>
    </div>
  );
};

export default QuesitonCreation;
