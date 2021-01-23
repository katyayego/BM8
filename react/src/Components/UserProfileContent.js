import React from 'react';
import { Grid, Card, CardHeader, Avatar } from '@material-ui/core'
import remy from "../images/hamster.png";
import getUserJson from '../getJson';

const UserProfileContent = () => {
    
    const userData = getUserJson(1);
    console.log(userData);
    return (
        <Grid container direction="column" alignItems="stretch" spacing={2}>
            <Avatar alt="Ham" src={remy} style={{ height: '150px', width: '150px' }} />
            <Grid item>
                <Card>
                    <CardHeader title={'Rick Lastname'} />
                    <p>Add a bio here!</p>
                    
                </Card>
            </Grid>
        </Grid>
    );
};

export default UserProfileContent;