import React, { useEffect, useState } from 'react';
import { Grid, Card, Box, CardContent } from '@material-ui/core';
import { useLocation, withRouter } from 'react-router-dom';
import { getMap } from '../api';
import MapCard from './MapCard';

const SearchContent = props => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  console.log(props.match);

  // Request maps with params.get('value')

  const [map, setMaps] = useState([]);

  useEffect(() => {
    const mapData = getMap(null, null, params.get('value'), null);
    mapData.then((maps) => {
      setMaps(maps.maps);

      console.log(maps);
    });
  }, []);
  console.log(map);
  // {map.length > 0 ? map.map((userMap) => {
  //   // console.log(userMap)
  //   return (
  //     <Grid item xs={4}>
  //       <MapCard id={userMap.id} name={userMap.title} description={userMap.desc} />
  //     </Grid>
  //   );
  // }) : <p>No results</p>}

  return (

    <Box m={2}>
      <Grid container spacing={2}>
        <p>{}</p>

      </Grid>
    </Box>
  );
};

export default withRouter(SearchContent);
