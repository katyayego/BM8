import React, { useRef } from 'react';

const AddTab = (props) => {
  return (
    <form>
      <p>Add Child</p>

      <div>
        <label>Title</label>
        <input type='text' ref={props.titleRef} />
      </div>
      <div>
        <label>group</label>
        <input type='text' ref={props.groupRef} />
      </div>
      <div>
        <label>resource</label>
        <input type='text' ref={props.resourceRef} />
      </div>
    </form>
  );
};

export default AddTab;
