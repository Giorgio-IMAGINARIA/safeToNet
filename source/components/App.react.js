// @flow
//React
import React from 'react';
import {StyleRoot} from 'radium';
//Material UI Modules
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//React Modules
import MainBarUI from '../components/MainBarUI.react';
import AIQueryPanel from './AIQueryPanel.react';
import ManualQueryPanel from './ManualQueryPanel.react';
import ResultPanel from './ResultPanel.react';
// Style Modules
import AppRootStyle from '../styles/AppRootStyle';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<StyleRoot style={AppRootStyle.mainWrap}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={AppRootStyle.appWrap}>
          <MainBarUI/>
          <div style={AppRootStyle.topSpaceStyle}/>
            <AIQueryPanel/>
            <ManualQueryPanel/>
            <ResultPanel/>
        </div>
      </MuiThemeProvider>
    </StyleRoot>);
  }
}
export default App;
