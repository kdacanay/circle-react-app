import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



const Landing = ({ isAuthenticated }) => {

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }


  return (
    <section className="landing">

      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large" style={{ position: 'relative' }}><i className="far fa-user-circle"></i>CIRCLE</h1>
          <p className="lead" style={{ position: 'relative' }}>
            The Internet's Private Social Media Site
          </p>
          <br />
          <div className="buttons">
            <Link to="/register" className="btn btn-primary" style={{ position: 'relative', margin: '10px' }} >Sign Up</Link>
            <Link to="/login" className="btn btn-light" style={{ position: 'relative' }}>Login</Link>
          </div>
        </div>
      </div>

    </section>
  );
};


Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};



const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);