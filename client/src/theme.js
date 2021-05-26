import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[300]
    },
    secondary: {
      main: deepPurple[100]
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#f8f8ff'
    }
  }
});

export default theme;
