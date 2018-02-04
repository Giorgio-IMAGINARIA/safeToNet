// @flow
// React
import React from 'react';
// Radium
import Radium from 'radium';
let Style = Radium.Style;
//Action Creators
import ActionCreatorSendToGithub from '../actions/ActionCreatorSendToGithub';
//Material UI
import Paper from 'material-ui/Paper';

import {List, ListItem} from 'material-ui/List';
//Stores
import StoreGithub from '../stores/StoreGithub';
// Style Modules
import GeneralStyle from '../styles/GeneralStyle';
import ResultStyle from '../styles/ResultStyle';

class ResultPanel extends React.Component {

  constructor(props) {
    super(props);
    this.onCurrentStoreGithubChange = this.onCurrentStoreGithubChange.bind(this);
    this.state = {
      issueList: []
    };
  }

  onCurrentStoreGithubChange() {
    let nextArray: Array<any> = StoreGithub.getGithubArray();
    let listToRender: Array<any> = [];
    nextArray.forEach((item, index, array) => {
      let elementToCreate: any = <ListItem onMouseDown={this.openTab.bind(this, item.html_url)} innerDivStyle={ResultStyle.listItemStyle} key={index} primaryText={item.title}/>;
      listToRender.push(elementToCreate);
    });
    this.setState({issueList: listToRender});
  }

  openTab(url : string) {
    let win = window.open(url, '_blank');
    win.focus();
  }

  componentWillMount() {
    this.onCurrentStoreGithubChange();
  }

  render() {
    return (<Paper style={ResultStyle.paperStyle} zDepth={2}>

      <div style={GeneralStyle.headerStyle}>
        <div style={GeneralStyle.headerInnerStyle}>
          <h1 style={GeneralStyle.mainTitle}>
            Result panel
          </h1>
          <h2 style={GeneralStyle.subTitle}>
            A visualisation of the Github issues filtered in the query panel
          </h2>
        </div>
      </div>

      <div style={GeneralStyle.paperContentWrapStyle}>
        <List>
          {this.state.issueList}
        </List>
      </div>
    </Paper>);
  }

  componentDidMount() {
    StoreGithub.addChangeListener(this.onCurrentStoreGithubChange);
  }

  componentWillUnmount() {
    StoreGithub.removeChangeListener(this.onCurrentStoreGithubChange);
  }

}

export default Radium(ResultPanel);
