import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';
import RecoilizeDebugger from 'recoilize';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './styles/styles.css';
import './styles/global.css';

const queryClient = new QueryClient();

const Root = () => (
  <React.StrictMode>
    <HelmetProvider>
      <RecoilRoot>
        {process.env.NODE_ENV === 'development' && <RecoilizeDebugger />}
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </RecoilRoot>
    </HelmetProvider>
  </React.StrictMode>
);

if (process.env.NODE_ENV === 'production') {
  ReactDOM.hydrate(<Root />, document.getElementById('root'));
} else {
  ReactDOM.render(<Root />, document.getElementById('root'));
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
