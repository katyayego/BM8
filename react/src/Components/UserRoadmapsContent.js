import React from 'react';
import {Grid, Box} from '@material-ui/core'
import MapCard from './MapCard';
import getUserJson from '../getJson';

const UserRoadmapsContent = () => {
    const userData = getUserJson(1);
    console.log(userData);
  return (
    <Box m={2} >
        <Grid container>
            <Grid container xs={12} spacing={2}>
                {/* <Grid item xs={4}>
                    <Card >
                    <CardContent>
                    <p>Roadmap 1</p>
                    </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card >
                    <CardContent>
                    <p>Roadmap 2</p> 
                    </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card >
                    <CardContent>
                    <p>Roadmap 3</p>
                    </CardContent>
                    </Card>
                </Grid> */}
                <MapCard id= '1' name='Roadmap 1' description = 'this is the description'/>
            </Grid>
        </Grid>
    </Box>
  );
};

export default UserRoadmapsContent;