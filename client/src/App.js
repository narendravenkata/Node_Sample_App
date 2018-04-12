import React, { Component } from 'react';
import './App.css';


import Quotes from './Quotes';

class App extends Component {
  render() {
    return (
      <div>
      <h4 className="title">Welcome to the Quote Saving Application</h4>
      <p className="description">This Application I made use of react-bootstrap table and trying to do get,post,put and delete operations using a Node server built
       with express and database used is Mongo DB </p>
        <Quotes/>
      </div>
    );
  }
}

export default App;
