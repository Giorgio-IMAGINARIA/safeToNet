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

interface GithubObject {
  milestone: any,
  state: string,
  assignee: string,
  creator?: string,
  mentioned?: string,
  labels?: string,
  sort: string,
  since?: string
}

class QueryPanel extends React.Component {

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
    // this.paperStyle = {
    //   textAlign: 'center',
    //   display: 'inline-block',
    //   width: 'calc(100% - 100px)',
    //   margin: '50px',
    //   backgroundColor: '#7986CB'
    // };
    // this.headerStyle = {
    //   width: '100%',
    //   height: '50px',
    //   display: 'flex',
    //   flexDirection: 'column',
    //   alignItems: 'flex-start',
    //   justifyContent: 'space-around'
    //
    // };
    this.globaltext = {
      color: '#ffffff'
    }
    this.titles = {
      ...this.globaltext,
      margin: '0',
      textIndent: '25px'
    };
    this.mainTitle = {
      ...this.titles,
      fontSize: '12pt'
    };
    // this.subTitle = {
    //   ...this.titles,
    //   fontSize: '9pt',
    //   fontWeight: '100'
    // };
    // this.internalTitleStyle = {
    //   ...this.titles,
    //   fontSize: '10pt',
    //   fontWeight: '200'
    // };

    // this.paperContentWrapStyle = {
    //   display: 'flex',
    //   flexDirection: 'column',
    //   padding: '50px 25px 25px'
    // };

    // this.inputBoxStyle = {
    //   border: '1px solid #ffffff',
    //   marginBottom: '25px'
    // };

    // this.inputBoxTitleRowStyle = {
    //   display: 'flex',
    //   alignItems: 'center',
    //   justifyContent: 'flex-start',
    //   height: '20px',
    //   borderBottom: '1px solid #ffffff'
    // };

    this.inputInternalRowStyle = {
      padding: '25px'
    };

    this.doubleRowStyle = {
      ...this.inputInternalRowStyle,
      display: 'flex'
    };

    this.doubleRowInternalWrapStyle = {
      display: 'flex',
      alignItems: 'space-between',
      width: '50%'
    };
    this.doubleRowInternalLeftWrapStyle = {
      ...this.doubleRowInternalWrapStyle,
      justifyContent: 'space-between'
    };
    this.doubleRowInternalRightWrapStyle = {
      ...this.doubleRowInternalWrapStyle,
      justifyContent: 'center'
    };

    this.doubleRowInternalRightTimeWrapStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      width: '50%'
    }

    this.doubleRowChipWrapStyle = {
      width: '50%',
      display: 'flex',
      alignItems: 'center',
      overflowX: 'auto',
      border: '1px dashed #ffffff'
    }

    this.radioButtonSpacedStyle = {
      marginBottom: '16px'
    };

    this.radioLabelStyle = {
      color: '#ffffff'
    }

    this.radioIconStyle = {
      fill: '#ffffff'
    }

    this.textInputStyle = {
      color: '#ffffff'
    }

    this.checkBoxWrapStyle = {
      display: 'flex',
      alignItems: 'center'
    };

    this.checkBoxStyle = {
      display: 'flex'
    }
    this.checkBoxIconStyle = {
      fill: '#ffffff'
    }
    this.checkBoxLabelStyle = {
      color: '#ffffff'
    }

    this.panelRowStyle = {
      width: '100%',
      display: 'flex',
      alignItems: 'center'
    };

    this.submitRowStyle = {
      ...this.panelRowStyle,
      height: '50px',
      justifyContent: 'center'
    };
    this.selectLoginElement = {
      textAlign: 'left'
    };

    this.floatingLabelStyle = {
      color: '#ffffff'
    };
    this.underlineFocusStyle = {
      borderColor: '#FC4482'
    };

    this.selectIconStyle = {
      fill: '#ffffff'
    };

    this.selectLabelStyle = {
      color: '#ffffff'
    };

    this.innerDoubleRowStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '50%'
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

    let objectToSend: GithubObject = {
      milestone: milestoneValueToSend,
      state: this.stateInput,
      sort: sortValueToSend,
      direction: directionValueToSend
    }
    ActionCreatorSendToGithub(objectToSend);
  }

  render() {
    return (<Paper style={QueryStyle.paperStyle} zDepth={2}>

      <div style={GeneralStyle.headerStyle}>
        <h1 style={GeneralStyle.mainTitle}>
          Query panel
        </h1>
        <h2 style={GeneralStyle.subTitle}>
          Select the kind of filters to apply to the Github (atom/atom) issues search and submit your query
        </h2>
      </div>

      <div style={GeneralStyle.paperContentWrapStyle}>

        <div style={QueryStyle.inputBoxStyle}>
          <div style={QueryStyle.inputBoxTitleRowStyle}>
            <h3 style={QueryStyle.internalTitleStyle}>
              Milestone filter
            </h3>
          </div>
          <div style={this.doubleRowStyle}>
            <div style={this.doubleRowInternalLeftWrapStyle}>
              <RadioButtonGroup name='milestoneSelection' defaultSelected="all" onChange={this.handleMilestoneChange}>
                <RadioButton labelStyle={this.radioLabelStyle} iconStyle={this.radioIconStyle} value="all" label="All" style={this.radioButtonSpacedStyle}/>
                <RadioButton labelStyle={this.radioLabelStyle} iconStyle={this.radioIconStyle} value="number" label="Number" style={this.radioButtonSpacedStyle}/>
                <RadioButton labelStyle={this.radioLabelStyle} iconStyle={this.radioIconStyle} value="none" label="None"/>
              </RadioButtonGroup>
            </div>
            <div style={this.doubleRowInternalRightWrapStyle}>
              <TextField disabled={this.state.milestoneInputDisabled} inputStyle={this.textInputStyle} value={this.state.milestoneIntegerValue} fullWidth={true} hintText="Type the milestone number" floatingLabelText="Milestone nr." floatingLabelStyle={this.floatingLabelStyle} underlineFocusStyle={this.underlineFocusStyle} type="number" onChange={this.handleChangeMilestoneText}/>
            </div>
          </div>
        </div>

        <div style={QueryStyle.inputBoxStyle}>
          <div style={QueryStyle.inputBoxTitleRowStyle}>
            <h3 style={QueryStyle.internalTitleStyle}>
              State filter
            </h3>
          </div>
          <div style={this.inputInternalRowStyle}>
            <SelectField labelStyle={this.selectLabelStyle} fullWidth={true} style={this.selectLoginElement} value={this.state.stateInputValue} onChange={this.handleChangeStateInputSelect} floatingLabelText="Selected issue state" floatingLabelStyle={this.floatingLabelStyle} iconStyle={this.selectIconStyle}>
              <MenuItem value={1} primaryText="Open"/>
              <MenuItem value={2} primaryText="Closed"/>
              <MenuItem value={3} primaryText="All"/>
            </SelectField>
          </div>
        </div>

        <div style={QueryStyle.inputBoxStyle}>
          <div style={QueryStyle.inputBoxTitleRowStyle}>
            <h3 style={QueryStyle.internalTitleStyle}>
              Sort filter
            </h3>
          </div>
          <div style={this.inputInternalRowStyle}>
            <SelectField labelStyle={this.selectLabelStyle} fullWidth={true} style={this.selectLoginElement} value={this.state.sortInputValue} onChange={this.handleChangeSortInputSelect} floatingLabelText="Sort by" floatingLabelStyle={this.floatingLabelStyle} iconStyle={this.selectIconStyle}>
              <MenuItem value={1} primaryText="Created"/>
              <MenuItem value={2} primaryText="Updated"/>
              <MenuItem value={3} primaryText="Comments"/>
            </SelectField>
          </div>
        </div>

        <div style={QueryStyle.inputBoxStyle}>
          <div style={QueryStyle.inputBoxTitleRowStyle}>
            <h3 style={QueryStyle.internalTitleStyle}>
              Direction filter
            </h3>
          </div>
          <div style={this.inputInternalRowStyle}>
            <SelectField labelStyle={this.selectLabelStyle} fullWidth={true} style={this.selectLoginElement} value={this.state.directionInputValue} onChange={this.handleChangeDirectionInputSelect} floatingLabelText="Sort direction" floatingLabelStyle={this.floatingLabelStyle} iconStyle={this.selectIconStyle}>
              <MenuItem value={1} primaryText="Ascending"/>
              <MenuItem value={2} primaryText="Descending"/>
            </SelectField>
          </div>
        </div>

        <div style={this.submitRowStyle}>
          <div>
            <FloatingActionButton mini={true} secondary={true} onMouseDown={this.validateDetails}>
              <RightArrow/>
            </FloatingActionButton>
          </div>
        </div>

      </div>

    </Paper>);
  }
}

export default QueryPanel;
