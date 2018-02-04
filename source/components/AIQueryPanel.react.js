// @flow
// React
import React from 'react';
//Action Creators
import ActionCreatorSendToGithub from '../actions/ActionCreatorSendToGithub';
//Material UI
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RightArrow from 'material-ui/svg-icons/navigation/chevron-right';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';

// Style Modules
import GeneralStyle from '../styles/GeneralStyle';
import QueryStyle from '../styles/QueryStyle';
import AIQueryStyle from '../styles/AIQueryStyle';

interface ManualFilterObject {
  state: string,
  sort: string,
  direction: string
}

class AIQueryPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleChangeStateInputSelect = this.handleChangeStateInputSelect.bind(this);
    this.handleChangeSortInputSelect = this.handleChangeSortInputSelect.bind(this);
    this.handleChangeDirectionInputSelect = this.handleChangeDirectionInputSelect.bind(this);
    this.handleChangeMilestoneText = this.handleChangeMilestoneText.bind(this);
    this.handleMilestoneChange = this.handleMilestoneChange.bind(this);
    this.validateDetails = this.validateDetails.bind(this);

    this.state = {
      milestoneInputDisabled: true,
      milestoneIntegerValue: '',

      stateInputValue: 3,

      sortInputValue: 1,
      directionInputValue: 2
    };

    this.milestoneStringValue = '*';
    this.stateInput = 'all';
    this.sortInput = 'created';
    this.directionInput = 'desc';
  }

  handleMilestoneChange(evt : any, value : string): void {
    if (value === 'number') {
      this.setState({milestoneInputDisabled: false});
      this.milestoneStringValue = null;
    } else {
      this.setState({milestoneInputDisabled: true, milestoneIntegerValue: ''});

      switch (value) {
        case 'all':
          {
            this.milestoneStringValue = '*'
          }
          break;
        case 'none':
          {
            this.milestoneStringValue = value
          }
          break;
      };
    };
  }

  handleChangeStateInputSelect(event, index, value) {
    this.setState({stateInputValue: value});
    switch (value) {
      case 1:
        {
          this.stateInput = 'open';
        }
        break;
      case 2:
        {
          this.stateInput = 'closed';
        }
        break;
      case 3:
        {
          this.stateInput = 'all';
        }
        break;
    };
  }

  handleChangeSortInputSelect(event, index, value) {
    this.setState({sortInputValue: value});
    switch (value) {
      case 1:
        {
          this.sortInput = 'created';
        }
        break;
      case 2:
        {
          this.sortInput = 'updated';
        }
        break;
      case 3:
        {
          this.sortInput = 'comments';
        }
        break;
    };
  }

  handleChangeDirectionInputSelect(event, index, value) {
    this.setState({directionInputValue: value});
    switch (value) {
      case 1:
        {
          this.directionInput = 'asc';
        }
        break;
      case 2:
        {
          this.directionInput = 'desc';
        }
        break;
    };
  }

  returnAbsIntValue(value : string): number {
    return Math.abs(parseInt(value));
  }

  handleChangeMilestoneText(evt, value) {
    this.returnAbsIntValue(value)
      ? this.setState({milestoneIntegerValue: this.returnAbsIntValue(value)})
      : this.setState({milestoneIntegerValue: ''});
  }

  validateDetails() {
    let milestoneDisabled: boolean = this.state.milestoneInputDisabled;
    let milestoneValueToSend: any;
    if (milestoneDisabled) {
      milestoneValueToSend = this.milestoneStringValue;
    } else {
      this.state.milestoneIntegerValue
        ? milestoneValueToSend = this.state.milestoneIntegerValue
        : milestoneValueToSend = '*';
    };

    let sortValueToSend: string = this.sortInput;
    let directionValueToSend: string = this.directionInput;

    let objectToSend: ManualFilterObject = {
      state: this.stateInput,
      sort: sortValueToSend,
      direction: directionValueToSend
    }
    ActionCreatorSendToGithub(objectToSend);
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
            <div style={QueryStyle.doubleRowInternalLeftWrapStyle}>
              <RadioButtonGroup name='milestoneSelection' defaultSelected="all" onChange={this.handleMilestoneChange}>
                <RadioButton labelStyle={QueryStyle.radioLabelStyle} iconStyle={QueryStyle.radioIconStyle} value="all" label="All" style={QueryStyle.radioButtonSpacedStyle}/>
                <RadioButton labelStyle={QueryStyle.radioLabelStyle} iconStyle={QueryStyle.radioIconStyle} value="number" label="Number" style={QueryStyle.radioButtonSpacedStyle}/>
                <RadioButton labelStyle={QueryStyle.radioLabelStyle} iconStyle={QueryStyle.radioIconStyle} value="none" label="None"/>
              </RadioButtonGroup>
            </div>
            <div style={QueryStyle.doubleRowInternalRightWrapStyle}>
              <TextField disabled={this.state.milestoneInputDisabled} inputStyle={QueryStyle.textInputStyle} value={this.state.milestoneIntegerValue} fullWidth={true} hintText="Type the milestone number" floatingLabelText="Milestone nr." floatingLabelStyle={QueryStyle.floatingLabelStyle} underlineFocusStyle={QueryStyle.underlineFocusStyle} type="number" onChange={this.handleChangeMilestoneText}/>
            </div>
          </div>
        </div>

        <div style={QueryStyle.inputBoxStyle}>
          <div style={QueryStyle.inputBoxTitleRowStyle}>
            <h3 style={QueryStyle.internalTitleStyle}>
              Manual filters
            </h3>
          </div>
          <div style={QueryStyle.doubleRowStyle}>
            <div style={QueryStyle.inputInternalBoxStyle}>
              <SelectField labelStyle={QueryStyle.selectLabelStyle} fullWidth={true} style={QueryStyle.selectLoginElement} value={this.state.stateInputValue} onChange={this.handleChangeStateInputSelect} floatingLabelText="State" floatingLabelStyle={QueryStyle.floatingLabelStyle} iconStyle={QueryStyle.selectIconStyle}>
                <MenuItem value={1} primaryText="Open"/>
                <MenuItem value={2} primaryText="Closed"/>
                <MenuItem value={3} primaryText="All"/>
              </SelectField>
            </div>
            <div style={QueryStyle.inputInternalBoxStyle}>
              <SelectField labelStyle={QueryStyle.selectLabelStyle} fullWidth={true} style={QueryStyle.selectLoginElement} value={this.state.sortInputValue} onChange={this.handleChangeSortInputSelect} floatingLabelText="Sort by" floatingLabelStyle={QueryStyle.floatingLabelStyle} iconStyle={QueryStyle.selectIconStyle}>
                <MenuItem value={1} primaryText="Created"/>
                <MenuItem value={2} primaryText="Updated"/>
                <MenuItem value={3} primaryText="Comments"/>
              </SelectField>
            </div>
            <div style={QueryStyle.inputInternalBoxStyle}>
              <SelectField labelStyle={QueryStyle.selectLabelStyle} fullWidth={true} style={QueryStyle.selectLoginElement} value={this.state.directionInputValue} onChange={this.handleChangeDirectionInputSelect} floatingLabelText="Direction" floatingLabelStyle={QueryStyle.floatingLabelStyle} iconStyle={QueryStyle.selectIconStyle}>
                <MenuItem value={1} primaryText="Ascending"/>
                <MenuItem value={2} primaryText="Descending"/>
              </SelectField>
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
