
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { store } from './app/store'
import { Provider } from 'react-redux'
import { green, orange,blue,yellow,purple } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  	esES } from '@mui/material/locale';



const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: '#f44336',
    }
  },
  esES


});


ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
  <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
