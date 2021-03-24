import React, { Component } from 'react';
import firebase from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import CircularProgress from '@material-ui/core/CircularProgress';

class Fileuploader extends Component {
  state = {
    name: '',
    isUploading: false,
    fileURL: ''
  };

  static getDerivedStateFromProps(props, state) {
    if(props.defaultImg) {
      return state = {
        name: props.defaultImgName,
        fileURL: props.defaultImg
      };
    }
    return null;
  }

  handleUploadStart = () => {
    this.setState({
      isUploading: true
    });
  };

  handleUploadError = () => {
    this.setState({
      isUploading: false
    });
  };

  handleUploadSuccess = (filename) => {
    this.setState({
      name: filename,
      isUploading: false
    });

    firebase.storage().ref(this.props.dir)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({
          fileURL: url
        });
      });

    this.props.filename(filename);
  };

  uploadAgain = () => {
    firebase.storage().ref(this.props.dir)
      .child(this.state.name)
      .delete()
      .then(() => {
        console.warn('delete success');
      })
      .catch((error) => {
        console.warn(error);
      });

    this.setState({
      name: '',
      isUploading: false,
      fileURL: ''
    });

    this.props.resetImage();
  };

  render() {
    return (
      <div className='file_uploader_wrapper form-group field_section'>
        { !this.state.fileURL ?
          <div className='uploader_form'>
            <h4 className="label label_inputs">
              {this.props.tag}
            </h4>
            <FileUploader
              accept="image/*"
              name="image"
              randomizeFilename
              storageRef={firebase.storage().ref(this.props.dir)}
              onUploadStart={ this.handleUploadStart }
              onUploadError={ this.handleUploadError }
              onUploadSuccess={ this.handleUploadSuccess }
            />
          </div>
          : null
        }
        { this.state.isUploading ?
          <div className="progress progress_circle">
            <CircularProgress className='circle' thickness={7}/>
          </div>
          : null
        }
        { this.state.fileURL ?
          <div className="image_upload_container">
            <img style={{width: '100%'}} src={this.state.fileURL} alt={this.state.name}/>
            <div className="remove" onClick={() => this.uploadAgain()}>
              Sterge
            </div>
          </div>
          :null
        }
      </div>
    );
  }
}

export default Fileuploader;
