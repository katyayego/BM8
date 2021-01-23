import React from 'react';
import { Grid, Card, Box, CardContent } from '@material-ui/core'


const ExploreContent = () => {

    return (
        <Box m={2} >
            <Grid container>
                <Grid container xs={12} spacing={2}>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <p>Explore 1</p>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card >
                            <CardContent>
                                <p>Explore 2</p>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ExploreContent;