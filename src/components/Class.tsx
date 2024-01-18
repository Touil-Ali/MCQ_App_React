import React, { useState, useEffect } from "react";
import Alert, { AlertColor } from "@mui/material/Alert";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";
const Class: React.FC = () => {
  const [myClasses, setMyClasses] = useState<any[]>([]);
  const [newClassName, setNewClassName] = useState<string>("");
  const [alert, setAlert] = useState<{
    type: AlertColor | null;
    message: string | null;
  }>({ type: null, message: null });

  useEffect(() => {
    fetchAllMyClasses();
  }, []);

  const fetchAllMyClasses = async () => {
    try {
      const response = await fetch("http://localhost:8080/classes/all"); // replace with your actual API endpoint
      const data = await response.json();
      setMyClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const createMyClass = async () => {
    try {
      if (!newClassName) {
        setAlert({
          type: "error",
          message: "Please Enter You're Class Name",
        });

        return;
      }
      const response = await fetch("http://localhost:8080/classes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ className: newClassName }),
      });

      if (response.ok) {
        const createdClass = await response.json();
        setMyClasses([...myClasses, createdClass]);
        setNewClassName("");
      } else {
        console.error("Error creating class:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  const deleteMyClass = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/classes/${id}`, {
        method: "DELETE",
      });

      setMyClasses(myClasses.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };
  return (
    <div className="ml-60">
      <h2>Class Management</h2>
      {alert.type && <Alert severity={alert.type}>{alert.message}</Alert>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Class ID</TableCell>
              <TableCell>Class Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myClasses.map((myClass) => (
              <TableRow key={myClass._id}>
                <TableCell>{myClass._id}</TableCell>
                <TableCell>{myClass.className}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteMyClass(myClass.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        <TextField
          label="New Class Name"
          variant="outlined"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={createMyClass}>
          Add Class
        </Button>
      </div>
    </div>
  );
};

export default Class;
