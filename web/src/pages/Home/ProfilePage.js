import React,  {useEffect, useState} from 'react';
import { Grid,  Box, CardHeader, Paper, Divider } from '@material-ui/core'
import UserRoadmapsContent from '../../Components/UserRoadmapsContent';
import UserProfileContent from '../../Components/UserProfileContent';
import AddMapForm from '../../Components/AddMapForm';
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
                    <AddMapForm/>
                </Grid>
                <Divider orientation="vertical" flexItem varient = "inset"/>
                <Grid item xs="6" >
                    <Paper  elevation={0} style={{background: '#f2ebdd'}}>
                    <CardHeader title={name ? name + '\'s Maps': 'Loading Maps'} titleTypographyProps={{variant:'h4' }}/>
                    <hr style={{height:"15px", backgroundColor:"#b0c77e", border:'none', borderRadius:'7px'}}/>
                    <UserRoadmapsContent/>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProfilePage;