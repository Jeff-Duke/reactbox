import React, { Component } from 'react';

export default class IdeaHeader extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      body: '',
    };
  }

  createNewIdea(e) {
    e.preventDefault();
    const { title, body } = this.state;
    const idea = {
      title,
      body,
      quality: 1,
      id: Date.now(),
    };

    this.props.addNewIdea(idea);
    this.clearInputs();
  }

  updateIdeaInfo(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  clearInputs() {
    this.setState({ title: '', body: '' })
  }

  render() {
    const { title, body } = this.state;
    return (
      <section className="idea-header">
        <h1>idea<span>Box</span></h1>
        <form onSubmit={e => this.createNewIdea(e)}>
          <input
            value={ title }
            onChange={e => this.updateIdeaInfo(e)}
            name="title"
            id="title"
            type="text"
            autoFocus={true}
            placeholder="Title"
          />
          <textarea
            value={ body }
            onChange={e => this.updateIdeaInfo(e)}
            name="body"
            id="body"
            type="text"
            placeholder="Body"
          />
          <button type="submit" disabled={!this.state.title}>Add Idea</button>
        </form>
      </section>
    );
  }
}
