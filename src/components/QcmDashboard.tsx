import React, { useState, useEffect } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";

interface Qcm {
  _id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  myClass: string;
}

const QcmDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [qcms, setQcms] = useState<Qcm[]>([]);
  const [newQcm, setNewQcm] = useState({
    title: "",
    startTime: "",
    endTime: "",
    myClassId: "",
  });

  const fetchQcms = async () => {
    try {
      const response = await fetch("http://localhost:8080/qcms");
      const data: Qcm[] = await response.json();
      setQcms(data);
    } catch (error) {
      console.error("Error fetching QCMs", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewQcm((prevQcm) => ({
      ...prevQcm,
      [name]: value,
    }));
  };

  const handleCreateQcm = async () => {
    try {
      await fetch("http://localhost:8080/qcms/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQcm),
      });
      fetchQcms(); // Refresh the list after creating a new QCM
      setNewQcm({ title: "", startTime: "", endTime: "", myClassId: "" });
    } catch (error) {
      console.error("Error creating QCM", error);
    }
  };

  const handleDeleteQcm = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/qcms/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setQcms((prevQcms: Qcm[]) => prevQcms.filter((qcm) => qcm._id !== id));
      } else {
        console.error("Failed to delete QCM");
      }
    } catch (error) {
      console.error("Error Deleting QCM", error);
    }
  };
  const handleClick = () => {
    navigate("/teacher/qcm-creation");
  };

  useEffect(() => {
    fetchQcms();
  }, []);

  return (
    <div className="ml-60">
      <Container maxWidth="md" className="mt-8">
        <Typography variant="h4">QCM Management</Typography>
        <Button
          onClick={handleClick}
          className="translate-y-8 translate-x-80"
          variant="contained"
        >
          Create QCM
        </Button>
        {/* Read */}
        <Paper elevation={3} className="p-4 mt-4">
          <Typography variant="h5">QCM List</Typography>
          <List>
            {qcms.map((qcm) => (
              <ListItem key={qcm._id}>
                <ListItemText primary={qcm.title} />
                <ListItemText primary={qcm.startTime.toLocaleString()} />
                <ListItemText primary={qcm.endTime.toLocaleString()} />
                <ListItemText primary={qcm.myClass} />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteQcm(qcm._id)}
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

export default QcmDashboard;
