import React, {useEffect, useState} from 'react';
import {Grid, Card, Box, CardHeader} from '@material-ui/core'
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
            <Card>
                <CardHeader title={name ? name + '\'s Roadmaps': 'My Roadmaps'}/>
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