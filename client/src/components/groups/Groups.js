// parent component

//use useEffect to get GET GROUP action

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGroups } from '../../actions/group';
import GroupItem from './GroupItem';
import { HashLink as Link } from 'react-router-hash-link';
import GroupForm from './GroupForm';
import Form from '../email/Form';



const Groups = ({ getGroups, groupId, group: { groups, loading } }) => {

  useEffect(() => {
    getGroups();
  }, [getGroups]);


  return loading ? <Spinner /> : (
    <Fragment>
      <h1 className="large text-primary"><i className="fas fa-users"></i>{' '}Groups</h1>
      <p className="lead">
        Join a Group or{' '}
        <Link to='/groups/#creategroup' className='btn btn-primary' style={{ position: 'relative' }}>{' '}Create Your Own</Link>
     or{' '}
        <Link to='/groups/#inviteemail' className='btn btn-primary' style={{ position: 'relative' }}>{' '}
        Invite Your Friends or Family!
      </Link>
      </p>
      <div className='groups'>
        {groups.map(group => (
          <GroupItem key={group._id} group={group}
            groupId={group._id} />
        ))}
      </div>
      <GroupForm />
      <Form />
    </Fragment>
  );
};

Groups.propTypes = {
  getGroups: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  // isAuthenticated: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth
});

export default connect(mapStateToProps, { getGroups })(Groups);
