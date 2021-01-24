import React,  {useEffect, useState} from 'react';
import { Grid,  Box, CardHeader, Paper, Divider } from '@material-ui/core'
import UserRoadmapsContent from '../../Components/UserRoadmapsContent';
import UserProfileContent from '../../Components/UserProfileContent';
import {getUser} from '../../api';

const ProfilePage = () => {

    const [name, setName] = useState(null);  
   
    useEffect(() => {
        const userData = getUser(1);
        userData.then((users) => {
            setName(users['users'][0].full_name);
            console.log(users['users'][0].full_name);
        })
    }, [])
    return (
        <Box m={2}>
            <Grid container spacing={2} justify="center">
                <Grid item xs="3">
                    <UserProfileContent />
                </Grid>
                <Divider orientation="vertical" flexItem varient = "inset"/>
                <Grid item xs="6" >
                    <Paper  elevation={0} style={{background: "#b0c77e"}}>
                    <CardHeader title={name ? name + '\'s Roadmaps': 'My Roadmaps'}/>
                    <UserRoadmapsContent/>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProfilePage;