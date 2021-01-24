import React from 'react';
import { Grid, Card, Box, CardContent } from '@material-ui/core'
import {getMap} from '../api';
import MapCard from './MapCard';

const UserRoadmapsContent = () => {
    //const userMaps = getMapJson(1); // Hardcoded 1 = using id 1 as default user
    //const userMaps = JSON.stringify(userData);

    // need to figure out how to correctly get userMaps

    return (
        <Box m={2} >
            <Grid container>
                {/* <Grid container xs={12} spacing={2}> */}
                    {/* {[userMaps].map((userMap) => (
                        <Grid item xs={4}>
                            <Card >
                                <CardContent>
                                    <p>{userMap.title}</p>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))} */}
                    {/* <Grid item xs={4}>
                        <Card >
                            <CardContent>
                                <p>Roadmap 1</p>
                            </CardContent>
                        </Card>
                    </Grid> */}
                {/* </Grid> */}
                <MapCard id= '1' name='Roadmap 1' description = 'this is the description'/>
            </Grid>
        </Box>
    );
};

export default UserRoadmapsContent;