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

  addNewIdea() {
    const { title, body, ideas } = this.state;
    const idea = {
      title,
      body,
      quality: 1,
      id: Date.now(),
    };

    ideas.unshift(idea);
    this.setState({ ideas: ideas });
  }

  render() {
    const { ideas } = this.state;
    console.log(ideas);
    return (
      <div className="App">
        <section>
          <label htmlFor="title">Title</label>
          <input
            onChange={e => this.updateIdeaInfo(e)}
            name="title"
            id="title"
            type="text"
          />
          <label htmlFor="body">Body</label>
          <input
            onChange={e => this.updateIdeaInfo(e)}
            name="body"
            id="body"
            type="text"
          />
          <button onClick={() => this.addNewIdea()}>Add Idea</button>
        </section>
        <section>
          {ideas.map(idea => {
            return (
              <div key={idea.id}>
                <h1>{idea.title}</h1>
                <h2>{idea.body}</h2>
                <p>
                  quality:{' '}
                  {idea.quality === 1
                    ? 'swill'
                    : idea.quality === 2 ? 'plausible' : 'genius'}
                </p>
              </div>
            );
          })}
        </section>
      </div>
    );
  }
}

export default App;
