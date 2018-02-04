// Style Modules
import GeneralStyle from './GeneralStyle';

let inputInternalRowStyle = {
  padding: '25px',
  display: 'flex'
}

let panelRowStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'center'
}

let style = {

  internalTitleStyle: {
    ...GeneralStyle.genericTitle,
    textIndent: '10px',
    fontSize: '10pt',
    fontWeight: '200'
  },

  inputInternalBoxStyle: {
    padding: '0 10px',
    display: 'flex',
    flexGrow: '1'
  },

  inputBoxStyle: {
    border: '1px solid #ffffff',
    marginBottom: '25px'
  },

  inputBoxTitleRowStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '20px',
    borderBottom: '1px solid #ffffff'
  },

  doubleRowStyle: {
    ...inputInternalRowStyle,
    display: 'flex',
    flexWrap: 'wrap'
  },

  radioIconStyle: {
    fill: '#ffffff'
  },

  submitRowStyle: {
    ...panelRowStyle,
    height: '50px',
    justifyContent: 'center'
  },

  underlineFocusStyle: {
    borderColor: '#FC4482'
  },

  radioLabelStyle: {
    color: '#ffffff'
  },

  textInputStyle: {
    color: '#ffffff'
  },

  selectLoginElement: {
    textAlign: 'left'
  },

  floatingLabelStyle: {
    color: '#ffffff'
  },

  selectIconStyle: {
    fill: '#ffffff'
  },

  selectLabelStyle: {
    color: '#ffffff'
  }

}

export default style
