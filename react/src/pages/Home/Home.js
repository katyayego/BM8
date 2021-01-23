import './Home.css';
import React, { useState, useEffect, useRef } from 'react';

import { Grid, Box, Card, CardHeader, Button } from '@material-ui/core';
import Graph from 'react-graph-vis';
import AddTab from './Components/controlTabs/AddTab';

const Home = () => {
  const [network, setNetwork] = useState();
  const [graph, setGraph] = useState(null);

  const [selectedNode, setSelectedNode] = useState();

  const addTitleRef = useRef();
  const addResourceRef = useRef();
  const addGroupRef = useRef();

  useEffect(() => {
    setGraph({
      nodes: [
        { id: 1, label: 'Node 1', title: 'node 1 tootip text', group: 0 },
        { id: 2, label: 'Node 2', title: 'node 2 tootip text', group: 0 },
        { id: 3, label: 'Node 3', title: 'node 3 tootip text', group: 0 },
        { id: 4, label: 'Node 4', title: 'node 4 tootip text', group: 0 },
        { id: 5, label: 'Node 5', title: 'node 5 tootip text', group: 0 }
      ],
      edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 }
      ]
    });
  }, []);

  const events = {
    click: function (event) {
      const { nodes, edges } = event;
      if (!nodes.length) return;

      const nodeId = nodes[0];
      const selectedNode = graph.nodes.filter((node) => node.id === nodeId)[0];
      // setSelectedNode(selectedNode);
      network.focus(nodeId,
        {
          locked: true,
          animation: { // -------------------> can be a boolean too!
            duration: 1000,
            easingFunction: 'easeInOutQuad'
          }
        });
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
    // setSelectedNode(null);
  };

  const handleAddNode = (nodeData, callback) => {
    console.log(addTitleRef.current.value);
    nodeData.label = addTitleRef.current.value;
    callback(nodeData);
  };

  const options = {
    layout: {
      hierarchical: true
    },
    manipulation: {
      enabled: true,
      addNode: handleAddNode,
      deleteNode: (nodeData, callback) => { console.log(nodeData); },
      editNode: (nodeData, callback) => { console.log(nodeData); }
    },
    edges: {
      color: '#000000'
    },
    nodes: {
      shape: 'dot'
    },
    height: '500px'
  };

  return (
    <Box m={2}>
      <Grid container spacing={3} direction='column' alignItems='stretch'>
        <Grid item md='12'>
          <Card>
            <CardHeader title='Purdue University MA 162' />
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} justify='center' alignItems='stretch' direction='row'>
        <Grid item md='3'>
          <Card>
            <CardHeader title='Topics' />
            {graph
              ? graph.nodes.map((node) => (
                <p key={node.id} style={{ cursor: 'pointer' }} onClick={() => handleTopicClick(node.id)}>{node.label}</p>
                ))
              : <p>Loading...</p>}
          </Card>

          <Card>
            <CardHeader title='Controls' />
            {/* <p>{`id: ${selectedNode.id}, label: ${selectedNode.label}, title: ${selectedNode.title}`}</p> */}
            <div>
              <AddTab
                titleRef={addTitleRef}
                resourceRef={addResourceRef}
                groupRef={addGroupRef}
              />
              <Button>Add</Button>
            </div>
          </Card>

        </Grid>
        <Grid item md='8'>
          <Card style={{ paddingBottom: '50px' }}>
            <CardHeader title='Roadmap' />
            {graph
              ? <Graph
                  graph={graph}
                  options={options}
                  events={events}
                  getNetwork={(net) => { setNetwork(net); }}
                />
              : <p>Loading...</p>}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
