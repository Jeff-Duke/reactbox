import React, { Component } from 'react';
import './App.css';
import IdeaInputs from './IdeaInputs';
import IdeaCard from './IdeaCard';

class App extends Component {
  constructor() {
    super();
    this.state = {
      ideas: [],
      searchTerm: '',
    };
  }

  componentDidMount() {
    const ideas = JSON.parse(localStorage.getItem('ideas')) || [];
    this.setState({ ideas });
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
    let ideas = this.state.ideas;
    let newIdeasArray = ideas.map(idea => {
      if (idea.id === ideaToUpdate.id) {
        return ideaToUpdate;
      } else {
        return idea;
      }
    });

    this.setState({ ideas: newIdeasArray });
    this.storeIdeas(newIdeasArray);
  }

  storeIdeas(ideas) {
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }

  render() {
    const { ideas, searchTerm } = this.state;
    let visibleIdeas = ideas.filter(idea => {
      return (
        idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    return (
      <div className="App">
        <IdeaInputs addNewIdea={idea => this.addNewIdea(idea)} />
        <section>
          <input
            value={searchTerm}
            onChange={e => this.setState({ searchTerm: e.target.value })}
            name="searchTerm"
            type="text"
          />
          {visibleIdeas.map(idea => {
            return (
              <IdeaCard
                key={idea.id}
                {...idea}
                deleteIdea={idea => this.deleteIdea(idea)}
                updateIdea={idea => this.updateIdeas(idea)}
              />
            );
          })}
        </section>
      </div>
    );
  }
}

export default App;
