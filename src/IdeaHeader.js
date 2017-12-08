import React, { Component } from 'react';

export default class IdeaHeader extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      body: '',
    };
  }

  createNewIdea = event => {
    event.preventDefault();
    const { title, body } = this.state;
    const idea = {
      title,
      body,
      quality: 1,
      id: Date.now(),
    };

    this.props.addNewIdea(idea);
    this.clearInputs();
  };

  updateIdeaInfo = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  clearInputs = () => {
    this.setState({ title: '', body: '' });
  };

  render() {
    const { title, body } = this.state;
    return (
      <section className="idea-header">
        <h1>
          idea<span>Box</span>
        </h1>
        <form onSubmit={this.createNewIdea}>
          <input
            value={title}
            onChange={this.updateIdeaInfo}
            name="title"
            id="title"
            type="text"
            autoFocus={true}
            placeholder="Title"
            aria-label="New idea title form field"
          />
          <textarea
            value={body}
            onChange={this.updateIdeaInfo}
            name="body"
            id="body"
            type="text"
            placeholder="Body"
            aria-label="New idea body form field"
          />
          <button
            type="submit"
            disabled={!this.state.title}
            aria-label="New idea submit button"
          >
            Add Idea
          </button>
        </form>
      </section>
    );
  }
}
