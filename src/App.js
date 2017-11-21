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

  componentDidMount() {
    const ideas = JSON.parse(localStorage.getItem('ideas')) || [];
    this.setState ({ ideas });
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
    this.setState({ ideas });
    this.storeIdeas();
  }

  deleteIdea(ideaId) {
    let { ideas } = this.state;
    ideas = ideas.filter(idea => {
      return idea.id !== ideaId;
    });
    this.setState({ ideas });
  }

  upvote(ideaId) {
    let { ideas } = this.state;
    ideas.find(idea => idea.id === ideaId && idea.quality ++ );
    this.setState({ ideas });
    this.storeIdeas();
  }

  downvote(ideaId) {
    let { ideas } = this.state;
    ideas.find(idea => idea.id === ideaId && idea.quality -- );
    this.setState({ ideas });
    this.storeIdeas();
  }

  storeIdeas() {
    localStorage.setItem('ideas', JSON.stringify(this.state.ideas));
  }

  render() {
    const { ideas } = this.state;

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
                <button onClick={() => this.deleteIdea(idea.id)}>Delete</button>
                <button onClick={() => this.upvote(idea.id)}>+</button>
                <button onClick={() => this.downvote(idea.id)}>-</button>
              </div>
            );
          })}
        </section>
      </div>
    );
  }
}

export default App;
