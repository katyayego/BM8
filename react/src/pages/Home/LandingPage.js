import React from 'react';
import {Grid, Card, Box, CardHeader} from '@material-ui/core'
import UserRoadmapsContent from '../../Components/UserRoadmapsContent';
import ExploreContent from '../../Components/ExploreContent';


const LandingPage = () => {
  return (
    <Box m={2} >
        <Grid container spacing={2}>
        <Grid item xs="7" >
            <Card>
                <CardHeader title={'My Roadmaps'}/>
                    <UserRoadmapsContent/>
            </Card>
        </Grid>
        <Grid item xs="5">
            <Card>
            <CardHeader title={'Explore'}/>
                <ExploreContent/>
            </Card>
        </Grid>
        </Grid>
    </Box>
  );
};

export default LandingPage;