import React, {useEffect, useState} from 'react';
import { Grid, Box, CardHeader, Avatar, CardContent, Paper, Divider, Typography } from '@material-ui/core'
import remy from "../images/hamster.png";
import {getUser} from '../api';

const UserProfileContent = () => {
    const [name, setName] = useState(null);
    const [status, setStatus] = useState(null);  
   
    useEffect(() => {
        const userData = getUser(1);
        userData.then((users) => {
            setName(users['users'][0].full_name);
            setStatus(users['users'][0].status);
        })
    }, [])

    return (
        <Grid container direction="column" alignItems="stretch" spacing={2}>
            {/* replace hamster pic w base64 image once its added to JSON */}
            
            <Grid item>
                <Paper elevation = {0} style={{background:'#f2ebdd'}}>
                    
                    <Grid container>
                    <Grid item xs={3}/>
                    <Grid item xs={6}>
                    <Box mt={3}>
                        <Avatar alt={name ? name : "Loading Name"} src={remy} style={{ height: '150px', width: '150px' }} />
                        </Box>
                        </Grid>
                        <Grid item xs={3}/>
                    </Grid>
                    
                    <CardContent>
                    <Typography variant="h5">{name ? name : "Loading Name"}</Typography>
                <Divider/>
                    <p>{status ? status : "Loading Status"}</p>
                    </CardContent>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default UserProfileContent;