import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// use to link to single group page
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
// actions needed use connect
import { connect } from 'react-redux';
import { deleteGroup, addMember } from '../../actions/group';



const GroupItem = ({
  auth,
  user,
  groupId,
  addMember,
  deleteGroup,
  group: { _id, title, name, members, date },
  showActions
}) => (

    <div>
      <div className="group bg-white p-1 my-1">
        <div>
          {/* // link to GroupPage */}
          <Fragment>
            <h2 className='text-primary'>{title}</h2>
            <h4 className='text-primary'>Group Members</h4>
            {members.map((member => (
              <p key={member._id}>{member.name}</p>
            )))}
          </Fragment>
        </div>

        {showActions && (
          <Fragment>
            <p className="my-1">
              {members.user}
            </p>
            <p className="group-date">
              Group Created on {' '}
              <Moment format='YYYY/MM/DD'>{date}</Moment>{' '}by {name}
            </p>

            <button
              onClick={() => addMember(groupId)}
              type="button"
              className="btn btn-primary"
            > Join This Group{' '}
              <i className="fas fa-user-plus"></i>
            </button>
            <Link
              to='/posts'
              type="button"
              className="btn btn-primary"
            > Discussion{' '}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => deleteGroup(_id)}
                type='button'
                className='btn btn-danger'
              >
                <i className='fas fa-times' />
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );

GroupItem.defaultProps = {
  showActions: true
};

GroupItem.propTypes = {
  groupId: PropTypes.string.isRequired,
  group: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  addMember: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  { deleteGroup, addMember })(GroupItem);
