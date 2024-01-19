import React, { useEffect, useState } from "react";
import { Link, Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Alert, { AlertColor } from "@mui/material/Alert";
import {
  Button,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";

const QcmList: React.FC = () => {
  const [qcms, setQcms] = useState<any[]>([]);
  const [studentId, setStudentId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [alert, setAlert] = useState<{
    type: AlertColor | null;
    message: string | null;
  }>({ type: null, message: null });

  const handleStudentIdChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStudentId(event.target.value);
  };
  const fetchQcmsByStudentId = async () => {
    try {
      setIsLoading(true);
      if (!studentId) {
        setAlert({
          type: "error",
          message: " Please Enter Youre Student ID",
        });
      }
      const response = await fetch(
        `http://localhost:8080/qcms/student/${studentId}`,
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setQcms(data);
      }
    } catch (error) {
      console.error("Error occured while fetching qcms", error);
    } finally {
      if (studentId) {
        setIsStarted(true);
      }
      setIsLoading(false);
    }
  };
  const handleStartButtonClick = () => {
    fetchQcmsByStudentId();
  };
  return (
    <Box>
      {!isStarted && (
        <div className="absolute space-x-4 transform -translate-x-1/2 -translate-y-1/2 border top-1/2 left-1/2">
          {alert.type && <Alert severity={alert.type}>{alert.message}</Alert>}
          <TextField
            label="Enter Your Student ID"
            variant="outlined"
            value={studentId}
            onChange={handleStudentIdChange}
          />
          <Button
            variant="contained"
            className="top-3 "
            onClick={handleStartButtonClick}
          >
            Start
          </Button>
        </div>
      )}
      <Grid container spacing={2}>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : qcms.length === 0 ? (
          <Typography>No Qcms Available .</Typography>
        ) : (
          qcms.map((qcm) => (
            <Grid item key={qcm._id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    QCM Title
                  </Typography>
                  <Typography variant="h5" component="div">
                    {qcm.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    QCM Start Date
                  </Typography>
                  <Typography variant="h6" component="div">
                    {qcm.startTime}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    QCM End Date
                  </Typography>
                  <Typography variant="h6" component="div">
                    {qcm.endTime}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={RouterLink}
                    to={`/qcm-questionnaire/${qcm._id}?studentId=${studentId}`}
                    size="small"
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default QcmList;
