import React from 'react';
import { Grid, Card, Box, CardHeader, CardContent, Paper } from '@material-ui/core'
import SearchContent from '../../Components/SearchContent';

const SearchPage = () => {
    return (
        <Box m={2}>
            <Grid container spacing={2} justify="center">
                <Grid item xs="7" >
                    <Paper elevation={0} style={{backgroundColor:"#f2ebdd"}}>
                        <CardHeader title={'Results'} />
                        <CardContent>
                        <SearchContent />
                        </CardContent>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SearchPage;