import React from 'react'
import {Grid, Card, Box, CardContent, CardHeader, Divider, Typography} from '@material-ui/core'
import { Link } from 'react-router-dom'

class MapCard extends React.Component {
    
    render() {
        console.log(this.props.name);
        const link = '/mapPage?id=' + this.props.id
        return (
        <Link to={link} style={{textDecoration: 'none'}}>
            <Box boxShadow={2}>
        <Card style={{backgroundColor:'#f2ebdd'}} >
        <CardContent> 
            <Typography variant="h5">{this.props.name}</Typography>
                <Divider/>
                <p>{this.props.description}</p>
            </CardContent>
        </Card>
        </Box>
        </Link>
        );
        
    }
}

export default MapCard 

