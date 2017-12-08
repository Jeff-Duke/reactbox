import React, { Component } from 'react';

export default class IdeaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: null,
      title: props.title,
      body: props.body,
      quality: props.quality,
      id: props.id,
    };
  }

  updateQuality = event => {
    const type = event.target.name;
    this.setState(
      prevState => {
        if (type === 'upvote' && prevState.quality < 3) {
          return { quality: prevState.quality + 1 };
        }
        if (type === 'downvote' && prevState.quality > 1) {
          return { quality: prevState.quality - 1 };
        }
        return null;
      },
      () => {
        this.updateIdea();
      }
    );
  };

  deleteIdea = () => {
    this.props.deleteIdea(this.props.id);
  };

  updateInfo = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  updateIdea() {
    const { id, title, body, quality } = this.state;

    const idea = {
      title,
      body,
      quality,
      id,
    };
    this.props.updateIdea(idea);
  }

  startEditing = e => {
    const element = e.target.getAttribute('name');
    this.setState({ editing: element });
  };

  stopEditing = e => {
    this.updateIdea();
    this.setState({ editing: false });
  };

  render() {
    const { id, title, body, quality, editing } = this.state;
    const ideaQuality =
      quality === 1 ? 'swill' : quality === 2 ? 'plausible' : 'genius';

    let editableTitle;
    if (editing && editing === 'title') {
      editableTitle = (
        <input
          name="title"
          value={title}
          onChange={this.updateInfo}
          onBlur={this.stopEditing}
          type="text"
          autoFocus={true}
        />
      );
    } else {
      editableTitle = (
        <h1 name="title" onClick={this.startEditing}>
          {title}
        </h1>
      );
    }

    let editableBody;

    if (editing && editing === 'body') {
      editableBody = (
        <input
          name="body"
          value={body}
          onChange={this.updateInfo}
          onBlur={this.stopEditing}
          type="text"
          autoFocus={true}
        />
      );
    } else {
      editableBody = (
        <p name="body" onClick={this.startEditing}>
          {body}
        </p>
      );
    }

    return (
      <article className="idea-card" key={id}>
        <button
          className="card-button delete"
          onClick={this.deleteIdea}
          aria-label="Delete idea button"
        />

        {editableTitle}

        {editableBody}

        <div className="idea-quality">
          <button
            name="upvote"
            disabled={quality === 3}
            onClick={this.updateQuality}
            className="card-button upvote"
            aria-label="Idea quality downvote button"
          />
          <button
            name="downvote"
            disabled={quality === 1}
            onClick={this.updateQuality}
            className="card-button downvote"
            aria-label="Idea quality downvote button"
          />
          <p>quality: {ideaQuality}</p>
        </div>
      </article>
    );
  }
}
