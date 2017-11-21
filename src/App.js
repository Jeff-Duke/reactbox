import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      body: '',
      ideas: [],
    };
  }

  updateIdeaInfo(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="App">
        <label htmlFor="title">Title</label>
        <input
          onChange={e => this.updateIdeaInfo(e)}
          name="title"
          id="title"
          type="text"
        />
        <label htmlFor="body" />
        <input
          onChange={e => this.updateIdeaInfo(e)}
          name="body"
          id="body"
          type="text"
        />
        <button>Add Idea</button>
      </div>
    );
  }
}

export default App;
