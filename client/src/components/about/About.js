// parent component

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Fragment>
      <section className='container' >
        <h1 className='large text-primary text-center'>About{' '}<i className="far fa-user-circle"></i>Circle</h1>
        <h4 className='lead text-primary text-center'>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,</h4>

        <p className='lead text-center'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet</p>

      </section>
      <Link to='/' className='btn btn-primary'>Return to Landing</Link>
    </Fragment>

  );
};

export default About;
