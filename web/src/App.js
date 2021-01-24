import './App.css';
import React from 'react';
import AppRouter from './Router';
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2b3b38"
    },
    secondary: {
      main: "#f2ebdd"
    },
    background: {
      default:'#f2ebdd'
    }
  }
});

function App () {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <AppRouter />
    </ThemeProvider>
  );
}

export default App;
