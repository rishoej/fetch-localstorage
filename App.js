import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  constructor() {
    super();

    let storage;
    // Check if localStorage is supported
    if(typeof Storage !== 'undefined'){
      // If supported no need to wait for fetch to finish
      storage = localStorage.getItem('loaded');
    }

    this.state = {
      name: 'React',
      loaded: storage ? storage : 'is loading'
    };

    fetch('https://jsonplaceholder.typicode.com')
      .then((response) => {
        if(this.state.loaded === 'is loading'){
          this.setState({
            loaded: 'Loaded from fetch'
          });
        }
        // Store response for next reload
        localStorage.setItem('loaded', 'Loaded from localStorage');
      }).catch((err) => {
        console.log(err)
      });
  }

  removeLocalStorageItem(){
    localStorage.removeItem('loaded');
  }

  render() {
    return (
      <div>
        <p>{this.state.loaded}</p>
        <button onClick={this.removeLocalStorageItem}>
          Delete "loaded" from localStorage
        </button>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
