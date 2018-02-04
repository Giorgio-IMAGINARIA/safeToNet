let globalText = {
  color: '#ffffff'
}

let titles = {
  ...globalText,
  margin: '0'
}

let style = {
  globalText:{
    ...globalText
  },
  paperStyle: {
    textAlign: 'center',
    display: 'inline-block',
    width: 'calc(100% - 100px)',
    margin: '50px'
  },
  headerStyle: {
    width: '100%',
    height: '50px',
    display: 'flex'
  },
  headerInnerStyle: {
    padding: '25px',
    height: 'inherit',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around'
  },

  genericTitle: {
    ...titles
  },

  mainTitle: {
    ...titles,
    fontSize: '12pt'
  },

  subTitle: {
    ...titles,
    fontSize: '9pt',
    fontWeight: '100'
  },

  paperContentWrapStyle: {
    display: 'flex',
    flexDirection: 'column',
    padding: '50px 25px 25px'
  }

}

export default style
