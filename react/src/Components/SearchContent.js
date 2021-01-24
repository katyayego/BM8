import React from 'react';
import { Grid, Card, Box, CardContent } from '@material-ui/core'
import { useLocation } from 'react-router-dom'

const SearchContent = () => {
    let location = useLocation();
    let params = new URLSearchParams(location.search);

    // Request maps with params.get('value')

    return (
        <Box m={2} >
            <Grid container>
                <Grid container xs={12} spacing={2}>
                    <Grid item xs={4}>
                        <Card >
                            <CardContent>
                                <p>Roadmap 1</p>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card >
                            <CardContent>
                                <p>Roadmap 2</p>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card >
                            <CardContent>
                                <p>Roadmap 3</p>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SearchContent;