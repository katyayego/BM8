import React , {useEffect, useState}from 'react';
import { Grid, Card, Box, CardContent } from '@material-ui/core'
import {getMap} from '../api';
import MapCard from './MapCard';

const ExploreContent = () => {

    const [map, setMaps] = useState([]);  
   
    useEffect(() => {
        const mapData = getMap(null,null,null,5);
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
                        return (<Grid item xs={6}>
                                <MapCard id={userMap.id} name = {userMap.title} description = {userMap.desc}/>
                        </Grid>);
                    }) : <p>this is null</p>} 
            </Grid>
        </Box>
    );
};

export default ExploreContent;