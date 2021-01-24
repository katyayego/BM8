import React, {useEffect, useState} from 'react';
import {Grid, Card, Box, CardHeader, Paper, Divider} from '@material-ui/core'
import UserRoadmapsContent from '../../Components/UserRoadmapsContent';
import ExploreContent from '../../Components/ExploreContent';
import {getUser} from '../../api';

const LandingPage = () => {
    const [name, setName] = useState(null);  
   
    useEffect(() => {
        const userData = getUser(2);
        userData.then((users) => {
            if(users['users'].length > 0) {
            setName(users['users'][0].full_name);
            console.log(users['users'][0].full_name);
            }
        })
    }, [])

  return (
    <Box m={2} >
        <Grid container spacing={2}>
        <Grid item xs="7" >
            <Paper  elevation={0} style={{background: '#f2ebdd'}}>
                <CardHeader title={name ? name + '\'s Maps': 'Loading Maps'} titleTypographyProps={{variant:'h4' }}/>
                <hr style={{height:"15px", backgroundColor:"#b0c77e", border:'none'}}/>
                    {name ? <UserRoadmapsContent/> : <p> Please sign in or create an account</p>}
            </Paper>
        </Grid>
        <Divider orientation="vertical" flexItem varient = "inset"/>
        <Grid item xs="4">
            <Paper elevation={0} style={{background: '#f2ebdd'}}>
            <CardHeader title={'Explore'} titleTypographyProps={{variant:'h4' }}/>
            <hr style={{height:"15px", backgroundColor:"#b0c77e", border:'none'}}/>
                <ExploreContent/>
            </Paper>
        </Grid>
        </Grid>
    </Box>
  );
};

export default LandingPage;