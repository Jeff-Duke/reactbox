import React, { Component } from 'react';
import './App.css';
import IdeaInputs from './IdeaInputs';
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

  addNewIdea(newIdea) {
    const updatedIdeas = this.state.ideas;
    updatedIdeas.unshift(newIdea);
    this.setState({ ideas: updatedIdeas });
    this.storeIdeas(updatedIdeas);
  }

  deleteIdea(idToDelete) {
    let { ideas } = this.state;
    ideas = ideas.filter(idea => {
      return idea.id !== idToDelete;
    });

    this.setState({ ideas });
    this.storeIdeas(ideas);
  }

  updateIdeas(ideaToUpdate) {
    let { ideas } = this.state;
    ideas.forEach(idea => {
      if(idea.id === ideaToUpdate.id) {
        idea = ideaToUpdate;
      }
    });
    this.setState({ ideas });
    this.storeIdeas(ideas);
  }

  storeIdeas(ideas) {
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }

  render() {
    const { ideas } = this.state;

    return (
      <div className="App">
        <IdeaInputs
          addNewIdea={(idea) => this.addNewIdea(idea)}
        />
        <section>
          {ideas.map(idea => {
            return (
              <IdeaCard
                key={idea.id}
                deleteIdea={(idea) => this.deleteIdea(idea)}
                { ...idea }
                updateIdea={(idea) => this.updateIdeas(idea)}/>
            );
          })}
        </section>
      </div>
    );
  }
}

export default App;
