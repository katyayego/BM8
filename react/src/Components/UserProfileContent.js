import React, {useEffect, useState} from 'react';
import { Grid, Card, CardHeader, Avatar } from '@material-ui/core'
import remy from "../images/hamster.png";
import getUserJson from '../getJson';

const UserProfileContent = () => {
    const [name, setName] = useState(null);
    const [status, setStatus] = useState(null);  
   
    useEffect(() => {
        const userData = getUserJson(1);
        userData.then((users) => {
            setName(users['users'][0].full_name);
            setStatus(users['users'][0].status);
        })
    }, [])

    return (
        <Grid container direction="column" alignItems="stretch" spacing={2}>
            {/* replace hamster pic w base64 image once its added to JSON */}
            <Avatar alt={name ? name : "Loading Name"} src={remy} style={{ height: '150px', width: '150px' }} />
            <Grid item>
                <Card>
                    <CardHeader title={name ? name : "Loading Name"} />
                    <p>{status ? status : "Loading Status"}</p>
                </Card>
            </Grid>
        </Grid>
    );
};

export default UserProfileContent;