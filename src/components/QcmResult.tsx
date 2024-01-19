import React, { useState, useEffect } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";

interface QcmResult {
  _id: string;
  student: string;
  score: number;
}

const QcmResult: React.FC = () => {
  const [qcmResults, setQcmResults] = useState<QcmResult[]>([]);

  const fetchQcmResults = async () => {
    try {
      const response = await fetch("http://localhost:8080/results");
      const data: QcmResult[] = await response.json();
      console.log(data);
      setQcmResults(data);
    } catch (error) {
      console.error("Error fetching QcmResults", error);
    }
  };

  const handleDeleteQcmResult = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/results/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setQcmResults((prevQcmResults: QcmResult[]) =>
          prevQcmResults.filter((qcmResult) => qcmResult._id !== id),
        );
      } else {
        console.error("Failed to delete QcmResult");
      }
    } catch (error) {
      console.error("Error Deleting QcmResult", error);
    }
  };

  useEffect(() => {
    fetchQcmResults();
  }, []);

  return (
    <div className="ml-60">
      <Container maxWidth="md" className="mt-8">
        <Typography variant="h4">QcmResult Management</Typography>

        {/* Read */}
        <Paper elevation={3} className="p-4 mt-4">
          <Typography variant="h5">QcmResult List</Typography>
          <List>
            {qcmResults.map((qcmResult) => (
              <ListItem key={qcmResult._id}>
                <ListItemText primary={`Student ID: ${qcmResult.student}`} />
                <ListItemText primary={`Score: ${qcmResult.score}`} />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteQcmResult(qcmResult._id)}
                >
                  Delete
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </div>
  );
};

export default QcmResult;
