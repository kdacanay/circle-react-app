import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { deleteGroup } from '../../actions/group';
// import { getGroups } from '../../actions/group';
// import GroupItem from './GroupItem';

const GroupPage = props => {
  return (
    <div>
      hello
      <Link to="/posts" className="btn btn-primary">
        Posts <span className='post-count'></span>
      </Link>
    </div>
  );
};

GroupPage.propTypes = {

};

export default GroupPage;
