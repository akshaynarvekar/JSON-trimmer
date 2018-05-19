import React, { Component } from 'react';
import './App.css';
import JSONChecker from './components/jsonCheck';

class App extends Component {
  render() {
    return (
      <div className="App">
        <JSONChecker />
      </div>
    );
  }
}

export default App;
