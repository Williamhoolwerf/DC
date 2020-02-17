import React, { Component } from 'react';
import Search from './components/Search';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: red,
  },
});

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={darkTheme}>
        <Search />
      </ThemeProvider>
    )
  }
}

export default App;
