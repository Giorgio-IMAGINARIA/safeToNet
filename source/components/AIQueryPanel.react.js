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

    this.state = {
      typeInputDisabled: false,
      micButtonDisabled: true,
      typeInputValue: ''
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

  grabVoice() {
    console.log('grab Voice');
  }

  handleChangeTypeInputText(evt, value) {
    this.setState({typeInputValue: value});
  }

  validateDetails() {


    this.state.typeInputDisabled?
    ActionCreatorSendText({text: this.state.typeInputValue}):
    ActionCreatorSendText({text: this.state.typeInputValue});

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
                <RadioButton labelStyle={QueryStyle.radioLabelStyle} iconStyle={QueryStyle.radioIconStyle} value="talk" label="Talk" style={QueryStyle.radioButtonSpacedStyle}/>
              </RadioButtonGroup>
            </div>

            <div style={AIQueryStyle.doubleRowInternalRightWrapStyle}>
              <TextField disabled={this.state.typeInputDisabled} inputStyle={QueryStyle.textInputStyle} value={this.state.typeInputValue} fullWidth={true} hintText="Type your request" floatingLabelText="Request" floatingLabelStyle={QueryStyle.floatingLabelStyle} underlineFocusStyle={QueryStyle.underlineFocusStyle} type="text" onChange={this.handleChangeTypeInputText}/>
              <RaisedButton disabled={this.state.micButtonDisabled} backgroundColor="#a4c639" icon={<Microphone color = {
                  fullWhite
                } />} fullWidth={true} onMouseDown={this.grabVoice}/>
            </div>

          </div>
        </div>

        <div style={QueryStyle.submitRowStyle}>
          <div>
            <FloatingActionButton backgroundColor={'#E65100'} mini={true} onMouseDown={this.validateDetails}>
              <RightArrow/>
            </FloatingActionButton>
          </div>
        </div>

      </div>

    </Paper>);
  }
}

export default AIQueryPanel;
