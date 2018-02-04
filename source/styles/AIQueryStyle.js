// Style Modules
import GeneralStyle from './GeneralStyle';

let doubleRowInternalWrapStyle = {
  display: 'flex',
  alignItems: 'space-between',
  flexGrow: '1'
}

let style = {
  paperStyle: {
    ...GeneralStyle.paperStyle,
    backgroundColor: '#7986CB'
  },

  doubleRowInternalLeftWrapStyle: {
    ...doubleRowInternalWrapStyle,
    justifyContent: 'space-between'
  },

  doubleRowInternalRightWrapStyle: {
    ...doubleRowInternalWrapStyle,
    flexDirection: 'column',
    justifyContent: 'center'
  },

  radioButtonGroupStyle:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
}

export default style
