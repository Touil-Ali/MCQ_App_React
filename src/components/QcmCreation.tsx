import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Dayjs } from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const QcmCreation: React.FC = () => {
  const [qcmTitle, setQcmTitle] = useState('')
  const [qcmStartDate, setQcmStartDate] = React.useState<Dayjs | null>(null);
  const [qcmEndDate, setQcmEndDate] = React.useState<Dayjs | null>(null);
  const [classRoom, setClassRoom] = React.useState('');
  const [classList, setClassList] = React.useState<{ id: number; className: string }[]>([]);
  const handleChangeSelect = (event: SelectChangeEvent) => {
    setClassRoom(event.target.value);
  };
  useEffect(() => {
    fetch('http://localhost:8080/classes/all')
      .then((response) => response.json())
      .then((data) => setClassList(data))
      .catch((error) => console.error('Error Fetching classes', error))
  })
  const handleCeationQcm = async () => {
    const qcmData = {
      title: qcmTitle,
      startTime: qcmStartDate?.toISOString(),
      endTime: qcmEndDate?.toISOString(),
      myClass: {
        id: Number(classRoom)
      }
    };
    try {
      const response = await fetch('http://localhost:8080/qcms/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(qcmData)
      });
      if (response.ok) {
        console.log('Qcm Created successfully !')
      } else {
        console.error('Failed to create QCM', await response.text());
      }
    } catch (error) {
      console.error('Error Creating QCM ', error)
    }
  }



  return (
    <div className="flex flex-col items-center gap-4">
      <h2>Create Qcm</h2>
      <TextField id="outlined-basic" label="Title" type="text" value={qcmTitle} onChange={(e) => setQcmTitle(e.target.value)} />
      <span>Start Date</span>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker value={qcmStartDate} onChange={(newValue) => setQcmStartDate(newValue)} />
        </DemoContainer>
      </LocalizationProvider>
      <span>End Date</span>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker value={qcmEndDate} onChange={(newValue) => setQcmEndDate(newValue)} />
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
            <MenuItem key={classItem.id} value={classItem.id}>
              {classItem.className}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="success" size="medium" onClick={handleCeationQcm}>Create Qcm</Button>

    </div >
  )

}


export default QcmCreation;
