import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Dayjs } from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Alert, { AlertColor } from "@mui/material/Alert";

const QcmCreation: React.FC = () => {
  const getToken = (): string | null => {
    return localStorage.getItem("authToken");
  };
  const navigate = useNavigate();
  const [qcmId, setQcmId] = useState("");
  const [qcmTitle, setQcmTitle] = useState("");
  const [qcmStartDate, setQcmStartDate] = React.useState<Dayjs | null>(null);
  const [qcmEndDate, setQcmEndDate] = React.useState<Dayjs | null>(null);
  const [classRoom, setClassRoom] = React.useState("");
  const [classList, setClassList] = React.useState<
    { _id: number; className: string }[]
  >([]);

  const [alert, setAlert] = useState<{
    type: AlertColor | null;
    message: string | null;
  }>({ type: null, message: null });

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setClassRoom(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();

        const response = await fetch("http://localhost:8080/classes/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Process the retrieved data
          setClassList(data);
        } else {
          // Handle error
          console.error("Failed to fetch classes");
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchData();
  });
  const handleCeationQcm = async () => {
    if (!qcmId || !qcmTitle || !qcmStartDate || !qcmEndDate || !classRoom) {
      setAlert({ type: "error", message: "All fields are required." });
      return;
    }

    const qcmData = {
      _id: qcmId,
      title: qcmTitle,
      startTime: qcmStartDate?.toISOString(),
      endTime: qcmEndDate?.toISOString(),
      myClassId: classRoom,
    };
    try {
      console.log("qcmData", qcmData);

      const response = await fetch("http://localhost:8080/qcms/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(qcmData),
      });
      if (response.ok) {
        console.log(response);
        console.log("Qcm Created successfully !");
        navigate(`question-creation/${qcmId}`);
      } else {
        console.error("Failed to create QCM", await response.text());
      }
    } catch (error) {
      console.error("Error Creating QCM ", error);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ type: "success", message: null });
  };

  return (
    <div className="flex mt-6 flex-col items-center gap-4">
      <h2>Create Qcm</h2>
      {alert.type && (
        <Alert severity={alert.type} onClose={handleCloseAlert}>
          {alert.message}
        </Alert>
      )}
      <TextField
        id="outlined-basic"
        label="Qcm Id"
        type="text"
        value={qcmId}
        onChange={(e) => setQcmId(e.target.value)}
      />

      <TextField
        id="outlined-basic"
        label="Title"
        type="text"
        value={qcmTitle}
        onChange={(e) => setQcmTitle(e.target.value)}
      />
      <span>Start Date</span>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            value={qcmStartDate}
            onChange={(newValue) => setQcmStartDate(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
      <span>End Date</span>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            value={qcmEndDate}
            onChange={(newValue) => setQcmEndDate(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Class</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={classRoom}
          onChange={handleChangeSelect}
          label="Class"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {classList.map((classItem) => (
            <MenuItem key={classItem._id} value={classItem._id}>
              {classItem.className}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="success"
        size="medium"
        onClick={handleCeationQcm}
      >
        Create Qcm
      </Button>
    </div>
  );
};

export default QcmCreation;
