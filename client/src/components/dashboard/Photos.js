import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Card from 'react-bootstrap/Card';
// import PhotoDisplay from './PhotoDisplay';


class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      selectedFiles: null
    };
  }
  singleFileChangedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      imageUrl: ''
    });
  };

  singleFileUploadHandler = () => {
    const data = new FormData();
    // If file selected
    if (this.state.selectedFile) {
      data.append('profileImage', this.state.selectedFile, this.state.selectedFile.name);
      axios.post('/api/profile/profile-img-upload', data, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
      })
        .then((response, imageUrl) => {
          if (200 === response.status) {
            // If file size is larger than expected.
            if (response.data.error) {
              if ('LIMIT_FILE_SIZE' === response.data.error.code) {
                this.ocShowAlert('Max size: 2MB', 'red');
              } else {
                console.log(response.data);
                // If not the given file type
                this.ocShowAlert(response.data.error, 'red');
              }
            } else {
              // Success
              let fileName = response.data;

              const imageUrl = response.data.location;

              console.log(imageUrl);
              console.log('fileName', fileName);
              this.ocShowAlert('File Uploaded', '#3089cf');
              this.setState.imageUrl = response.data.location;
            }
          }
        }).catch((error) => {
          // If another error
          this.ocShowAlert(error, 'red');
        });
    } else {
      // if file not selected throw error
      this.ocShowAlert('Please upload file', 'red');
    }
  };

  ocShowAlert = (message, background = '#3089cf') => {
    let alertContainer = document.querySelector('#oc-alert-container'),
      alertEl = document.createElement('div'),
      textNode = document.createTextNode(message);
    alertEl.setAttribute('class', 'oc-alert-pop-up');
    $(alertEl).css('background', background);
    alertEl.appendChild(textNode);
    alertContainer.appendChild(alertEl);
    setTimeout(function () {
      $(alertEl).fadeOut('slow');
      $(alertEl).remove();
    }, 3000);
  };
  render() {
    return (
      <div>
        <h1 className='large text-primary' style={{ marginBottom: '0' }}>Photo Album</h1>
        {/* For Alert box*/}
        <div id="oc-alert-container"></div>
        <div className="container">
          {/* Single File Upload*/}
          <Card className="card  border-light mb-3 mt-5 text-center" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}>
            <div className="card-header text-center">
              <h3 style={{ color: '#b4d263', marginLeft: '12px' }}>Photo Upload</h3>
            </div>
            <div className="card-body">
              <p className="card-text">Upload an Image</p>
              <input style={{ marginRight: '0', display: 'inline-block', position: 'relative' }} className='btn btn-primary' type="file" onChange={this.singleFileChangedHandler} />
              <div className="mt-5">
                <br />
                <button style={{ position: 'relative' }} className="btn btn-info btn-primary" onClick={this.singleFileUploadHandler}>Upload!</button>
              </div>
            </div>
          </Card>
        </div>
        <div className='container' id='image-table'>
          <table>
            <tr>
              <td><img style={{ width: '225px', height: '200px', margin: '3px' }} className='responsive-img' alt='new' src='https://circlereactapp.s3.us-east-2.amazonaws.com/IMG_0015-1595643813379.jpg' />
              </td>
              <td>
                <img style={{ width: '225px', height: '200px', margin: '3px' }} alt='new' src='https://circlereactapp.s3.us-east-2.amazonaws.com/IMG_0047%281%29-1595689980850.JPG' />
              </td>
            </tr>
          </table>
        </div>
      </div >

    );
  }
}
export default Photos;
