import React, { Component } from 'react';
import UrlShortener from './containers/UrlShortener'

class App extends Component {
  render() {
    return (
      <div className="App">
         <UrlShortener/>
      </div>
    );
  }
}

export default App;
