import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[800]
    },
    secondary: {
      main: green[900]
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
