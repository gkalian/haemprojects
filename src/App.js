import React from 'react';
import Main from './components/MainPage';
import Footer from './components/Footer';
import './styles/global.css';

const App = () => {
  return (
    <div className="app">
      <Main />
      <Footer />
    </div>
  );
};

export default App;
