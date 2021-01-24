import './Home.css';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

import { Grid, Box, Card, CardHeader, Button, CardContent, Divider, Typography } from '@material-ui/core';
import Graph from 'react-graph-vis';
import AddTab from './Components/controlTabs/AddTab';
import AddForm from './Components/controlTabs/AddForm';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import { getMap, postNode, postNodeDelete, postNodeEdit, postEdge } from '../../api';

import { withRouter } from 'react-router';
import AddEdge from './Components/controlTabs/AddEdge';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const Home = (props) => {
  const classes = useStyles();

  const { id } = props.match.params;
  const [network, setNetwork] = useState();
  const [graph, setGraph] = useState({
    id: id,
    title: 'no title',
    desc: 'no desc',
    nodes: [],
    edges: []
  });

  const [selectedNode, setSelectedNode] = useState();

  const addTitleRef = useRef();
  const addResourceRef = useRef();
  const addGroupRef = useRef();

  const addToRef = useRef();
  const addFromRef = useRef();

  useEffect(() => {
    getMap(id, null, null, null).then((res) => {
      const mapObj = res.maps[0];
      const newGraph = {
        id: mapObj.id,
        title: mapObj.title,
        desc: mapObj.desc,
        nodes: JSON.parse(JSON.stringify(mapObj.map.nodes)),
        edges: JSON.parse(JSON.stringify(mapObj.map.edges))
      };
      setGraph(newGraph);
    });
  }, []);

  useEffect(() => { console.log('graph', graph); }, [graph]);
  useEffect(() => { console.log('network', network); }, [network]);
  const events = {
    doubleClick: function (event) {
      const { nodes, edges } = event;
      if (!nodes.length) return;

      const nodeId = nodes[0];
      network.focus(nodeId,
        {
          locked: true,
          animation: {
            duration: 1000,
            easingFunction: 'easeInOutQuad'
          }
        });
      const newSelectedNode = graph.nodes.filter((node) => (node.id === nodeId));
      console.log(newSelectedNode[0]);
      setSelectedNode(newSelectedNode[0]);
    }
  };

  const handleTopicClick = (nodeId) => {
    network.focus(nodeId,
      {
        locked: true,
        animation: {
          locked: false,
          duration: 1000,
          easingFunction: 'easeInOutQuad'
        }
      });
  };

  const handleAddNode = useCallback((nodeData, callback) => {
    if (!addTitleRef.current || !addGroupRef.current || !addResourceRef.current) {
      callback();
    }
    const title = addTitleRef.current.value;
    const group = addGroupRef.current.value;
    const resource = addResourceRef.current.value;

    const newNode = { ...nodeData, label: title, group: group, resource: resource };
  });

  const handleEditNode = (nodeData, callback) => {
    if (!addTitleRef.current || !addGroupRef.current || !addResourceRef.current) {
      callback();
    }
    const title = addTitleRef.current.value;
    const group = addGroupRef.current.value;
    const resource = addResourceRef.current.value;

    const newNode = { ...nodeData, label: title, group: group, resource: resource };
    callback(newNode);
    console.log(newNode.id);
    postNodeEdit(graph.id, 2, newNode.id, title, resource, null)
      .then(() => { alert('SUCCESS'); })
      .catch(() => { alert('ERRIR'); });
  };

  // manipulation: {
  //   enabled: false,
  //   addNode: handleAddNode,
  //   deleteNode: (nodeData, callback) => {
  //     console.log(nodeData.nodes);
  //     callback(nodeData);
  //     postNodeDelete(graph.id, 2, nodeData.nodes[0]);
  //   },
  //   editNode: handleEditNode,
  //   deleteEdge: (edgeData, callback) => {
  //     callback(edgeData);
  //   }
  // },

  const options = {
    layout: {
      hierarchical: true
    },
    edges: {
      color: '#000000'
    },
    nodes: {
      shape: 'dot'
    },
    autoResize: true,
    height: '450px'
  };

  return (
    <Box m={2}>
      <CardHeader title={graph ? graph.title : 'Loading...'} titleTypographyProps={{ variant: 'h4' }} />
      <hr style={{ height: '15px', backgroundColor: '#b0c77e', border: 'none' }} />
      <Grid container spacing={2} justify='center' alignItems='stretch' direction='row'>
        <Grid item xs='4'>
          <Box mb={1} boxShadow={4}>
            <Card style={{ backgroundColor: '#f2ebdd' }}>
              <CardContent>
                <Typography variant='h5'>Add Node</Typography>
                <Divider />
                {/* <AddTab
                  titleRef={addTitleRef}
                  resourceRef={addResourceRef}
                  groupRef={addGroupRef}
                /> */}
                <AddForm
                  titleRef={addTitleRef}
                  resourceRef={addResourceRef}
                  groupRef={addGroupRef}
                  handleSubmit={(e) => {
                    e.preventDefault();
                    postNode(graph.id, 2, null, addTitleRef.current.value, addResourceRef.current.value, addGroupRef.current.value);
                    window.location.reload();
                  }}
                />
              </CardContent>
            </Card>
            <Card style={{ backgroundColor: '#f2ebdd' }}>
              <CardContent>
                <Typography variant='h5'>Add Edge</Typography>
                <Divider />
                <AddEdge
                  toRef={addToRef}
                  fromRef={addFromRef}
                  handleSubmit={(e) => {
                    e.preventDefault();
                    const toLabel = addToRef.current.value;
                    const fromLabel = addFromRef.current.value;
                    const toId = graph.nodes.filter(node => node.label === toLabel)[0];
                    const fromId = graph.nodes.filter(node => node.label === fromLabel)[0];
                    console.log(toId.id, toId.id);
                    postEdge(graph.id, 2, fromId.id, toId.id);
                    window.location.reload();
                  }}
                />
              </CardContent>
            </Card>
          </Box>
          <Box my={1} boxShadow={4}>
            <Card style={{ backgroundColor: '#e5d3b3' }}>
              <CardContent>
                <Typography variant='h5'>Topics</Typography>
                <Divider />
                {graph
                  ? graph.nodes.map((node) => (
                    <p key={node.id} style={{ cursor: 'pointer' }} onClick={() => handleTopicClick(node.id)}>{node.label}</p>
                    ))
                  : <p>Loading...</p>}
              </CardContent>
            </Card>
          </Box>
          {selectedNode
            ? (
              <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                className={classes.modal}
                open={selectedNode}
                onClose={() => { setSelectedNode(null); }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500
                }}
              >
                <Fade in={selectedNode}>
                  <div className={classes.paper}>
                    <h2 id='transition-modal-title'>Resources for: {selectedNode.label}</h2>
                    <p id='transition-modal-description'>{selectedNode.res}</p>
                  </div>
                </Fade>
              </Modal>
              )
            : null}

        </Grid>
        <Grid item xs='8'>
          <Box boxShadow={4}>
            <Card style={{ paddingBottom: '40px', backgroundColor: '#f2ebdd' }}>
              <CardContent><Typography variant='h5'>Map</Typography>
                <Divider />
                {graph
                  ? <Graph
                      graph={graph}
                      options={options}
                      events={events}
                      getNetwork={(net) => { setNetwork(net); }}
                    />
                  : <p>Loading...</p>}
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withRouter(Home);
