// @flow
// React
import React from 'react';
//Action Creators
import ActionCreatorSendText from '../actions/ActionCreatorSendText';
//Material UI
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RightArrow from 'material-ui/svg-icons/navigation/chevron-right';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import {fullWhite} from 'material-ui/styles/colors';
import Microphone from 'material-ui/svg-icons/av/mic';

// Style Modules
import GeneralStyle from '../styles/GeneralStyle';
import QueryStyle from '../styles/QueryStyle';
import AIQueryStyle from '../styles/AIQueryStyle';

interface AITextObject {
  text: string
}

class AIQueryPanel extends React.Component {

  constructor(props) {

    super(props);
    this.handleChangeTypeInputText = this.handleChangeTypeInputText.bind(this);
    this.handleInputSelectionChange = this.handleInputSelectionChange.bind(this);
    this.validateDetails = this.validateDetails.bind(this);
    this.startLocalAudio = this.startLocalAudio.bind(this);
    this.stopLocalAudio = this.stopLocalAudio.bind(this);
    this.gotLocalStream = this.gotLocalStream.bind(this);
    this.grabVoice = this.grabVoice.bind(this);

    this.state = {
      typeInputDisabled: false,
      micButtonDisabled: true,
      typeInputValue: '',
      backgroundRecordButtonColor: "#a4c639",
      validateButtonDisabled: true,
      micButtonDisabledColor: "#757575"
    };

  }

  handleInputSelectionChange(evt : any, value : string): void {
    switch (value) {
      case 'type':
        {
          this.setState({typeInputDisabled: false, micButtonDisabled: true});
        }
        break;
      case 'talk':
        {
          this.setState({typeInputDisabled: true, typeInputValue: '', micButtonDisabled: false});
        }
        break;
    };
  }
  timedButtonUndisabling() {
    setTimeout(() => {
      this.setState({micButtonDisabledColor: "#757575", micButtonDisabled: false, backgroundRecordButtonColor: "#a4c639", validateButtonDisabled: false});
      this.stopLocalAudio();
    }, 10000)
  }

  grabVoice() {
    this.startLocalAudio();
    this.setState({micButtonDisabledColor: "#B71C1C", micButtonDisabled: true, backgroundRecordButtonColor: "#B71C1C", validateButtonDisabled: true});
    this.timedButtonUndisabling();
  }

  handleChangeTypeInputText(evt, value) {
    this.setState({typeInputValue: value});
  }

  gotLocalStream(localStream) {
    console.log('localstream: ', localStream);

    // let localAudio = document.getElementById('aubrtest-localAudio');
    // localAudio.src = window.URL.createObjectURL(localStream);
    // localAudio.onloadedmetadata = (e) => {
    //   localAudio.play();
    // };
    // document.getElementById("aubrtest-localAudioVisual").style["background-color"] = "#2e7d32";
  }

  stopLocalAudio() {
    console.log('stop audio');
  }

  startLocalAudio() {
    console.log('start audio');

    // Older browsers might not implement mediaDevices at all, so we set an empty object first
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }
    // Some browsers partially implement mediaDevices. We can't just assign an object
    // with getUserMedia as it would overwrite existing properties.
    // Here, we will just add the getUserMedia property if it's missing.
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = (constraints) => {

        // First get ahold of the legacy getUserMedia, if present
        var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);

        // Some browsers just don't implement it - return a rejected promise with an error
        // to keep a consistent interface
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }

        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        return new Promise((resolve, reject) => {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      }
    }
    let constraints = {
      video: false,
      audio: true
    }
    navigator.mediaDevices.getUserMedia(constraints).then(this.gotLocalStream).catch((err) => {
      alert('Error getting audio');
      console.log(err);
    });
  }

  validateDetails() {
    this.state.typeInputDisabled
      ? ActionCreatorSendText({text: this.state.typeInputValue})
      : ActionCreatorSendText({text: this.state.typeInputValue});
  }

  render() {
    return (<Paper style={AIQueryStyle.paperStyle} zDepth={2}>

      <div style={GeneralStyle.headerStyle}>
        <div style={GeneralStyle.headerInnerStyle}>
          <h1 style={GeneralStyle.mainTitle}>
            AI query panel
          </h1>
          <h2 style={GeneralStyle.subTitle}>
            Type or say your request for the Github (atom/atom) issues search and submit your query
          </h2>
        </div>
      </div>

      <div style={GeneralStyle.paperContentWrapStyle}>

        <div style={QueryStyle.inputBoxStyle}>
          <div style={QueryStyle.inputBoxTitleRowStyle}>
            <h3 style={QueryStyle.internalTitleStyle}>
              AI filters
            </h3>
          </div>
          <div style={QueryStyle.doubleRowStyle}>

            <div style={AIQueryStyle.doubleRowInternalLeftWrapStyle}>
              <RadioButtonGroup style={AIQueryStyle.radioButtonGroupStyle} name='inputSelection' defaultSelected="type" onChange={this.handleInputSelectionChange}>
                <RadioButton labelStyle={QueryStyle.radioLabelStyle} iconStyle={QueryStyle.radioIconStyle} value="type" label="Type" style={QueryStyle.radioButtonSpacedStyle}/>
                <RadioButton labelStyle={QueryStyle.radioLabelStyle} iconStyle={QueryStyle.radioIconStyle} value="talk" label="Talk(10s)" style={QueryStyle.radioButtonSpacedStyle}/>
              </RadioButtonGroup>
            </div>

            <div style={AIQueryStyle.doubleRowInternalRightWrapStyle}>
              <TextField disabled={this.state.typeInputDisabled} inputStyle={QueryStyle.textInputStyle} value={this.state.typeInputValue} fullWidth={true} hintText="Type your request" floatingLabelText="Request" floatingLabelStyle={QueryStyle.floatingLabelStyle} underlineFocusStyle={QueryStyle.underlineFocusStyle} type="text" onChange={this.handleChangeTypeInputText}/>
              <RaisedButton disabledBackgroundColor={this.state.micButtonDisabledColor} disabled={this.state.micButtonDisabled} backgroundColor={this.state.backgroundRecordButtonColor} icon={<Microphone color = {
                  fullWhite
                } />} fullWidth={true} onMouseDown={this.grabVoice}/>
              <audio id='aubrtest-localAudio'></audio>
            </div>

          </div>
        </div>

        <div style={QueryStyle.submitRowStyle}>
          <div>
            <FloatingActionButton disabled={this.state.validateButtonDisabled} backgroundColor={'#E65100'} mini={true} onMouseDown={this.validateDetails}>
              <RightArrow/>
            </FloatingActionButton>
          </div>
        </div>

      </div>

    </Paper>);
  }
}

export default AIQueryPanel;
