import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const AddForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <TextField inputRef={props.titleRef} id='standard-basic' label='Title' />
      <TextField inputRef={props.groupRef} id='standard-basic' label='Group' />
      <TextField inputRef={props.resourceRef} id='standard-basic' label='Resource' />
      <Button type='submit'>Add Node</Button>
    </form>
  );
};

export default AddForm;
