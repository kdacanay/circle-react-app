import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';
import { Link } from 'react-router-dom';



const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? <Spinner /> : <Fragment>
        <h1 className='large text-primary'>Friends/Profiles</h1>
        <p className='lead'>
          Browse and Connect
        </p>
        <Link to='/groups/#inviteemail' className='btn btn-primary' style={{ position: 'relative' }}>{' '}
        Invite Your Friends or Family to{' '}
          <i className="far fa-user-circle"></i>CIRCLE
        </Link>
        <br />
        <div className='profiles'>
          <br />
          {profiles.length > 0 ? (
            profiles.map(profile => (
              <ProfileItem key={profile._id} profile={profile} />
            ))
          ) : <h4>No Profiles Found</h4>}
        </div>
      </Fragment>}
    </Fragment >
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile
});


export default connect(mapStateToProps, { getProfiles })(Profiles);
