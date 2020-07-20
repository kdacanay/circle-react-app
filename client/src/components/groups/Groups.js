// parent component

//use useEffect to get GET GROUP action

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGroups } from '../../actions/group';
import GroupItem from './GroupItem';
import { Link } from 'react-router-dom';
import GroupForm from './GroupForm';


const Groups = ({ getGroups, group: { groups, loading } }) => {

  useEffect(() => {
    getGroups();
  }, [getGroups]);


  return loading ? <Spinner /> : (
    <Fragment>
      <h1 className="large text-primary"><i className="fas fa-users"></i>{' '}Groups</h1>
      <p className="lead">
        Join a Group or{' '}
        <Link to='/groups/#creategroup' className='btn btn-primary'>{' '}Create Your Own</Link>
      </p>

      <div className='groups'>
        {groups.map(group => (
          <GroupItem key={group._id} group={group} />
        ))}
      </div>
      <GroupForm />
    </Fragment>
  );
};

Groups.propTypes = {
  getGroups: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  group: state.group
});

export default connect(mapStateToProps, { getGroups })(Groups);
