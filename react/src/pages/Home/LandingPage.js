import React, {useEffect, useState} from 'react';
import {Grid, Card, Box, CardHeader, Paper, Divider} from '@material-ui/core'
import UserRoadmapsContent from '../../Components/UserRoadmapsContent';
import ExploreContent from '../../Components/ExploreContent';
import {getUser} from '../../api';

const LandingPage = () => {
    const [name, setName] = useState(null);  
   
    useEffect(() => {
        const userData = getUser(1);
        userData.then((users) => {
            setName(users['users'][0].full_name);
            console.log(users['users'][0].full_name);
        })
    }, [])

  return (
    <Box m={2} >
        <Grid container spacing={2}>
        <Grid item xs="7" >
            <Paper  elevation={0} style={{background: "#b0c77e"}}>
                <CardHeader title={name ? name + '\'s Roadmaps': 'My Roadmaps'}/>
                    <UserRoadmapsContent/>
            </Paper>
        </Grid>
        <Divider orientation="vertical" flexItem varient = "inset"/>
        <Grid item xs="4">
            <Paper elevation={0} style={{background: "#b0c77e"}}>
            <CardHeader title={'Explore'}/>
                <ExploreContent/>
            </Paper>
        </Grid>
        </Grid>
    </Box>
  );
};

export default LandingPage;