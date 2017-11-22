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
      <section>
        <form onSubmit={e => this.createNewIdea(e)}>
          <label htmlFor="title">Title</label>
          <input
            value={ title }
            onChange={e => this.updateIdeaInfo(e)}
            name="title"
            id="title"
            type="text"
            autoFocus={true}
          />
          <label htmlFor="body">Body</label>
          <input
            value={ body }
            onChange={e => this.updateIdeaInfo(e)}
            name="body"
            id="body"
            type="text"
          />
          <button type="submit">Add Idea</button>
        </form>
      </section>
    );
  }
}
