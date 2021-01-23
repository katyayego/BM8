import React from 'react';
import { Grid, Card, Box, CardHeader } from '@material-ui/core'
import UserRoadmapsContent from '../../Components/UserRoadmapsContent';
import UserProfileContent from '../../Components/UserProfileContent';

const ProfilePage = () => {
    return (
        <Box m={2} border={1}>
            <Grid container spacing={2} justify="center">
                <Grid item xs="3">
                    <UserProfileContent />
                </Grid>
                <Grid item xs="7" >
                    <Card>
                        <CardHeader title={'My Roadmaps'} />
                        <UserRoadmapsContent />
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProfilePage;