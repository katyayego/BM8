import React from 'react';
import TextField from '@material-ui/core/TextField';

const AddTab = (props) => {
  return (
    <form>
      <TextField inputRef={props.titleRef} id='standard-basic' label='Title' />
      <TextField inputRef={props.groupRef} id='standard-basic' label='Group' />
      <TextField inputRef={props.resourceRef} id='standard-basic' label='Resource' />
    </form>
  );
};

export default AddTab;
