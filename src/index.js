import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/globals.scss';
import { BrowserRouter } from 'react-router-dom';

const Render = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}

ReactDOM.render(
  <Render/>,
  document.getElementById('root')
);



