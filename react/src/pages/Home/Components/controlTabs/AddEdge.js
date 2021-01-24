import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const AddEdge = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <TextField inputRef={props.toRef} id='standard-basic' label='to' />
      <TextField inputRef={props.fromRef} id='standard-basic' label='from' />
      <Button type='submit'>Add Edge</Button>
    </form>
  );
};

export default AddEdge;
