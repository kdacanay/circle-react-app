import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {

  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    bio: '',
    youtube: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: ''
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills.join('.'),
      bio: loading || !profile.bio ? '' : profile.bio,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      instagram: loading || !profile.social ? '' : profile.social.instagram
    });
  }, [loading, getCurrentProfile]);

  //  destructure;
  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={e => onChange(e)}>
            <option value="0">* Status</option>
            <option value="employed">Employed</option>
            <option value="full-time">Full-Time Employee</option>
            <option value="student or ;learning">Student or Learning</option>
            <option value="part-time">Part-time Employee</option>
            <option value="intern">Intern</option>
            <option value='selfemployed'>Self-Employed</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
          >Your Employment</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={e => onChange(e)} />
          <small className="form-text"
          >Company/Business</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)} />
          <small className="form-text"
          >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
          <small className="form-text"
          >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Interests" name="skills" value={skills} onChange={e => onChange(e)} />
          <small className="form-text"
          >Tell us your interests, use commas to seperate values</small
          >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <div onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-primary" style={{ position: 'relative' }}>
            Add Social Network Links
          </div>
          <span style={{ position: 'absolute' }}>Optional</span>
        </div>

        {displaySocialInputs && <Fragment>
          <div className="form-group social-input">
            <i className="fab fa-twitter fa-2x"></i>
            <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)} />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-facebook fa-2x"></i>
            <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)} />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-youtube fa-2x"></i>
            <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e => onChange(e)} />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-linkedin fa-2x"></i>
            <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e => onChange(e)} />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-instagram fa-2x"></i>
            <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)} />
          </div>


        </Fragment>}

        <div type="submit" className="btn btn-primary" style={{ position: 'relative' }}>Submit</div>
        <Link className="btn btn-primary" style={{ position: 'relative' }} to="/dashboard">Go Back</Link>
      </form>
    </Fragment >
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
