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
import React, { useState, useEffect } from "react";

interface Student {
  _id: string;
  username: string;
  password: string;
  classId: string;
}

const Student: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState({
    username: "",
    password: "",
    classId: "",
  });

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:8080/students/all");
      const data: Student[] = await response.json();
      console.log(data);
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleCreateStudent = async () => {
    try {
      await fetch("http://localhost:8080/students/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });
      fetchStudents(); // Refresh the list after creating a new student
      setNewStudent({ username: "", password: "", classId: "" });
    } catch (error) {
      console.error("Error creating student", error);
    }
  };

  const handelDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/students/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setStudents((prevStudents: Student[]) =>
          prevStudents.filter((student) => student._id !== id),
        );
      } else {
        console.error("Failed to delete Student");
      }
    } catch (error) {
      console.error("Error Deleting student", error);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="ml-64">
      <Container maxWidth="md" className="mt-8">
        <Typography variant="h4">Students</Typography>

        {/* Create */}
        <Paper elevation={3} className="p-4 mt-4">
          <Typography variant="h5">Create Student</Typography>
          <TextField
            label="Username"
            type="text"
            name="username"
            value={newStudent.username}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={newStudent.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Class ID"
            type="text"
            name="classId"
            value={newStudent.classId}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateStudent}
          >
            Create Student
          </Button>
        </Paper>

        {/* Read */}
        <Paper elevation={3} className="p-4 mt-4">
          <Typography variant="h5">Student List</Typography>
          <List>
            {students.map((student) => (
              <ListItem key={student._id}>
                <ListItemText primary={student._id} />
                <ListItemText primary={student.username} />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handelDelete(student._id)}
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

export default Student;
