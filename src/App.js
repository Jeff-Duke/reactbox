import React, { Component } from 'react';
import './App.css';
import IdeaCard from './IdeaCard';

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
    this.storeIdeas();
  }

  updateIdeas(ideaToUpdate) {
    let { ideas } = this.state;
    ideas.forEach(idea => {
      if(idea.id === ideaToUpdate.id) {
        idea = ideaToUpdate;
      }
    });
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
              <IdeaCard
                key={idea.id}
                deleteIdea={(ideaId) => this.deleteIdea(ideaId)}
                idea={idea}
                updateIdea={(idea) => this.updateIdeas(idea)}/>
            );
          })}
        </section>
      </div>
    );
  }
}

export default App;
