// parent component

import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section >
      <br />
      <br />
      <h1 className='large text-primary text-center'>About{' '}<i className="far fa-user-circle"></i>circle</h1>
      <h4 className='lead text-primary text-center'>Nowadays, the internet is a scary place.  But it wasn't always like that.</h4>

      <p className='lead text-center'>Everything you do on the internet is tracked; from the searches on Google to your Twitter posts, to the photos you uploaded on Instagram or Facebook, companies are using your data to cater to your experience (and to make money). None of that happens here at <i className="far fa-user-circle"></i>circle.  You can connect with your family and friends through an email invite and create profiles, create groups to discuss topics, upload photos and make comments.  All this while not having to worry about us using your data without you knowing about it. Enjoy your privacy and enjoy using <i className="far fa-user-circle"></i>circle!</p>
      <div className='buttons'>
        <Link to='/' className='btn btn-primary text-center'>Return to Landing</Link>
      </div>
      <br />
    </section>



  );
};

export default About;
