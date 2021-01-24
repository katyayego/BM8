import React, {useEffect, useState} from 'react';
import { Grid, Card, Box, CardContent } from '@material-ui/core'
import {getMap} from '../api';
import MapCard from './MapCard';

const UserRoadmapsContent = () => {
    //const userMaps = getMapJson(1); // Hardcoded 1 = using id 1 as default user
    //const userMaps = JSON.stringify(userData);

    // need to figure out how to correctly get userMaps

    const [map, setMaps] = useState([]);  
   
    useEffect(() => {
        const mapData = getMap(null,1);
        mapData.then((maps) => {
            setMaps(maps['maps']);
            
            console.log(maps)
        })
    }, [])
    console.log(map)
    return (
        
        <Box m={2} >
            <Grid container spacing={2}>
                    {map ? map.map((userMap) => {
                        // console.log(userMap)
                        return (<Grid item xs={4}>
                                <MapCard id={userMap.id} name = {userMap.title} description = {userMap.desc}/>
                        </Grid>);
                    }) : <p>this is null</p>} 
            </Grid>
        </Box>
    );
};

export default UserRoadmapsContent;