import React from 'react'
import {Grid, Card, Box, CardContent, CardHeader} from '@material-ui/core'
import { Link } from 'react-router-dom'

class MapCard extends React.Component {
    
    render() {
        console.log(this.props.name);
        const link = '/mapPage?id=' + this.props.id
        return (
        <Link to={link} style={{textDecoration: 'none'}}>
        <Card style={{backgroundColor:'#f2ebdd'}}> 
            <CardHeader title = {this.props.name}/>
            <CardContent>
                <p>{this.props.description}</p>
            </CardContent>
        </Card>
        </Link>
        );
        
    }
}

export default MapCard 

