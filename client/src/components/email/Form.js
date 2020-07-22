import React from 'react';
import emailjs from 'emailjs-com';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
      name: '',
      email: '',
      from: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleFrom = this.handleFrom.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }



  sendFeedback(templateId, userId, variables) {
    // event.preventDefault();
    emailjs.send(
      'gmail',
      templateId,
      userId,
      variables
    ).then(res => {
      console.log('Email successfully sent!');
    })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => console.error('Error', err));
  }

  render() {
    return (
      <form className="test-mailing form my-1" id='inviteemail'>
        <div className='bg-primary p'>
          <h3>Invite to
            <i className="far fa-user-circle"></i>CIRCLE</h3>
        </div>
        <br />
        <div>
          <textarea
            name='text' cols='30' rows='1'
            onChange={this.handleFrom}
            value={this.state.from}
            placeholder='Your Name' required
          ></textarea>
        </div>
        <br />
        <div>
          <textarea
            name='text' cols='30' rows='1'
            onChange={this.handleName}
            value={this.state.name}
            placeholder='Their Name' required
          ></textarea>
        </div>
        <br />
        <div>
          <textarea
            type='text' cols='30' rows='1'
            onChange={this.handleEmail}
            value={this.state.email}
            placeholder='Their Email' required
          ></textarea>
        </div>
        <br />
        <div>
          <textarea
            id="test-mailing" name="test-mailing"
            onChange={this.handleChange}
            placeholder="Write a message"
            required
            value={this.state.feedback}
            style={{ width: '100%', height: '150px' }}
          />
        </div>
        <input
          type="submit" value="Submit"
          className="btn btn-primary"
          onClick={this.handleSubmit}
        />
        <input
          type='reset'
          defaultValue='Reset'
          className='btn btn-primary'
          onClick={this.handleReset}
        />
      </form>
    );
  }

  handleReset(event) {
    this.setState({
      feedback: '',
      name: '',
      email: '',
      from: ''
    });
  }

  handleChange(event) {
    this.setState({
      feedback: event.target.value
    });
  }
  handleName(event) {
    this.setState({
      name: event.target.value
    });
  }
  handleEmail(event) {
    this.setState({
      email: event.target.value
    });
  }
  handleFrom(event) {
    this.setState({
      from: event.target.value
    });
  }


  handleSubmit(event) {
    event.preventDefault();
    const templateId = 'template_iXBNFeJl';
    const userId = 'user_l49OeOE3dlqzK3YERAjQp';

    this.sendFeedback(
      templateId,
      {
        message_html: this.state.feedback,
        from_name: this.state.from,
        to_name: this.state.name,
        to_email: this.state.email
      },
      userId);

  }

}

// emailjs.send("gmail", "template_iXBNFeJl", { "to_email": "kpreyesd@yahoo.com", "from_name": "ken", "to_name": "buddy", "message_html": "helloooooooo" });