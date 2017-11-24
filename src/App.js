import React, { Component } from 'react';
import './styles/css/index.css';
import IdeaHeader from './IdeaHeader';
import IdeaCard from './IdeaCard';

class App extends Component {
  constructor() {
    super();
    this.state = {
      ideas: [],
      searchTerm: '',
      sorting: 'newest',
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
    const { ideas, searchTerm, sorting } = this.state;
    let sortedIdeas = [];

    if (sorting === 'highestQuality') {
      sortedIdeas = ideas.sort((a, b) => a.quality < b.quality);
    }

    if (sorting === 'lowestQuality') {
      sortedIdeas = ideas.sort((a, b) => a.quality > b.quality);
    }

    if (sorting === 'newest') {
      sortedIdeas = ideas.sort((a, b) => a.id < b.id);
    }

    if (sorting === 'oldest') {
      sortedIdeas = ideas.sort((a, b) => a.id > b.id);
    }

    let visibleIdeas = sortedIdeas.filter(idea => {
      return (
        idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    return (
      <div className="App">
        <IdeaHeader addNewIdea={idea => this.addNewIdea(idea)} />
        <section className="container idea-list">
          <section className="sorting-search">
            <div className="sorting-element">
              <label htmlFor="sorting"> Sort Ideas By:</label>
              <select
                name="sorting"
                id="sorting"
                value={this.state.sorting}
                onChange={e => this.setState({ sorting: e.target.value })}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highestQuality">Highest Quality</option>
                <option value="lowestQuality">Lowest Quality</option>
              </select>
            </div>

            <input
              value={searchTerm}
              onChange={e => this.setState({ searchTerm: e.target.value })}
              name="searchTerm"
              type="text"
              placeholder="Search"
            />
          </section>

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
