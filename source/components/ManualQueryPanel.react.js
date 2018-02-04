// @flow
// React
import React from 'react';
//Action Creators
import ActionCreatorSendToGithub from '../actions/ActionCreatorSendToGithub';
//Material UI
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RightArrow from 'material-ui/svg-icons/navigation/chevron-right';

// Style Modules
import GeneralStyle from '../styles/GeneralStyle';
import QueryStyle from '../styles/QueryStyle';
import ManualQueryStyle from '../styles/ManualQueryStyle';

interface ManualFilterObject {
  state: string,
  sort: string,
  direction: string
}

class ManualQueryPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleChangeStateInputSelect = this.handleChangeStateInputSelect.bind(this);
    this.handleChangeSortInputSelect = this.handleChangeSortInputSelect.bind(this);
    this.handleChangeDirectionInputSelect = this.handleChangeDirectionInputSelect.bind(this);
    this.validateDetails = this.validateDetails.bind(this);

    this.state = {
      stateInputValue: 3,
      sortInputValue: 1,
      directionInputValue: 2
    };

    this.stateInput = 'all';
    this.sortInput = 'created';
    this.directionInput = 'desc';
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

  validateDetails() {

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
    return (<Paper style={ManualQueryStyle.paperStyle} zDepth={2}>

      <div style={GeneralStyle.headerStyle}>
        <div style={GeneralStyle.headerInnerStyle}>
          <h1 style={GeneralStyle.mainTitle}>
            Manual query panel
          </h1>
          <h2 style={GeneralStyle.subTitle}>
            Select the kind of manual filters for the Github (atom/atom) issues search and submit your query
          </h2>
        </div>
      </div>

      <div style={GeneralStyle.paperContentWrapStyle}>

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
            <FloatingActionButton backgroundColor={'#7986CB'} mini={true} onMouseDown={this.validateDetails}>
              <RightArrow/>
            </FloatingActionButton>
          </div>
        </div>

      </div>

    </Paper>);
  }
}

export default ManualQueryPanel;
