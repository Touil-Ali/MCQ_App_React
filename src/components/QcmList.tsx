import React, { useEffect, useState } from 'react';
import { Link, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button, Grid, List, ListItem, Typography } from '@mui/material';



const QcmList: React.FC = () => {
  const [qcms, setQcms] = useState<any[]>([]);
  useEffect(() => {
    const fetchQcms = async () => {
      try {
        const response = await fetch(`http://localhost:8080/qcms/active`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setQcms(data);
        }
      } catch (error) {
        console.error('Error occurred while fetching qcms', error);
      }
    }
    fetchQcms();
  }, []);
  return (
    <Grid container spacing={2}>
      {qcms.map((qcm) => (
        <Grid item key={qcm.id} xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                QCM Title
              </Typography>
              <Typography variant="h5" component="div">
                {qcm.title}
              </Typography>
              <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                QCM Start Date
              </Typography>
              <Typography variant="h6" component="div">
                {qcm.startTime}
              </Typography>
              <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                QCM End Date
              </Typography>
              <Typography variant="h6" component="div">
                {qcm.endTime}
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={RouterLink} to={`/qcm-questionnaire/${qcm.id}`} size="small">
                Start
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

};



export default QcmList;
