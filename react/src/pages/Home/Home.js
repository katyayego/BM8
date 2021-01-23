import React from 'react';
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';

class Home extends React.Component {
  id = this.props.match.params;
  render() {
  return (
    <Box m={2}>
      <Grid container spacing={3} direction="column" alignItems="stretch">
        <Grid item md="12" >
          <Card>
            <CardHeader title={'Purdue University MA 162'} />
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} justify="center" alignItems="stretch" direction="row">
        <Grid item md="3" >
          <Card>
            <CardHeader title={'Topics'} />
            <p>Load in topics belonging to this subject here</p>
          </Card>
        </Grid>
        <Grid item md="8">
          <Card>
            <CardHeader title={'Roadmap'} />
            <p>insert digraph here</p>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
  }
}

export default Home;
