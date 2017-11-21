import React, { Component } from 'react';

export default class IdeaInputs extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      body: '',
    };
  }

  createNewIdea() {
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
        <label htmlFor="title">Title</label>
        <input
          value={ title }
          onChange={e => this.updateIdeaInfo(e)}
          name="title"
          id="title"
          type="text"
        />
        <label htmlFor="body">Body</label>
        <input
          value={ body }
          onChange={e => this.updateIdeaInfo(e)}
          name="body"
          id="body"
          type="text"
        />
        <button onClick={() => this.createNewIdea()}>Add Idea</button>
      </section>
    );
  }
}
