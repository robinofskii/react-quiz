import React from 'react';
import ReactDOM from 'react-dom/client';

import QuizProvider from './contexts/QuizContext.tsx';
import App from './App.tsx';

import './styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>
);
