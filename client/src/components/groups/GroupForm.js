import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addGroup } from '../../actions/group';

const GroupForm = ({ addGroup }) => {

  const [title, setText] = useState('');

  return (
    <div className='group-form' id='creategroup'>
      <div className='bg-primary p'>
        <h3>Create A Group</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addGroup({ title });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='1'
          placeholder='Create a Group'
          value={title}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

GroupForm.propTypes = {
  addGroup: PropTypes.func.isRequired,
};

export default connect(null, { addGroup })(GroupForm);
