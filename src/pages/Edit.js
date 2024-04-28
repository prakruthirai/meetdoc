
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faFile } from '@fortawesome/free-solid-svg-icons';


class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingTitle: "Meeting Title",
      meetingDescription: "Meeting Description"
    };
  }

  handleSave = () => {
    // (Optional) Implement additional logic for saving data (e.g., sending to server)
    console.log('Meeting saved:', this.state.meetingTitle, this.state.meetingDescription);
  };

  handleTitleChange = (e) => {
    this.setState({ meetingTitle: e.target.value });
  };

  handleDescriptionChange = (e) => {
    this.setState({ meetingDescription: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div>
            <a className="text-decoration-none" href="meetingcard">
              <FontAwesomeIcon icon={faBackward} />
              Back
            </a>
          </div>
        </div>

        <div className="position-relative">
          <h1 className="mt-5">{this.state.meetingTitle}</h1>
          
          <a className="position-absolute top-50 end-0 translate-middle-y text-decoration-none" onClick={this.handleSave}>
            <FontAwesomeIcon icon={faFile} />
            Save
          </a>
        </div>

        <div className="row">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Meeting Title</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Meeting Title" value={this.state.meetingTitle} onChange={this.handleTitleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Meeting Description</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="10" value={this.state.meetingDescription} onChange={this.handleDescriptionChange}>
            </textarea>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit ;
