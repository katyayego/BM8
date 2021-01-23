import React from 'react';
import {Grid, Card, Box, CardHeader, CardContent} from '@material-ui/core'


const LandingPage = () => {
  return (
    <Box m={2} >
        <Grid container spacing={2}>
        <Grid item xs="7" >
            <Card>
                <CardHeader title={'My Roadmaps'}/>
                <Box m={2}>
                <Card >
                    <CardContent>
                    <p>Roadmap 1</p>
                    </CardContent>
                </Card>
                </Box>
            </Card>
        </Grid>
        <Grid item xs="5">
            <Card>
            <CardHeader title={'Explore'}/>
            <Box m={2}>
                <Card >
                    <CardContent>
                    <p>Explore 1</p>
                    </CardContent>
                </Card>
                </Box>
            </Card>
        </Grid>
        </Grid>
    </Box>
  );
};

export default LandingPage;