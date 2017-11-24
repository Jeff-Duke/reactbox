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

  updateQuality(type) {
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
  }

  deleteIdea(id) {
    this.props.deleteIdea(id);
  }

  updateInfo(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

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

  render() {
    const { id, title, body, quality, editing } = this.state;
    const ideaQuality =
      quality === 1 ? 'swill' : quality === 2 ? 'plausible' : 'genius';

    return (
      <article className="idea-card" key={id}>
        <button
          className="card-button delete"
          onClick={() => this.deleteIdea(id)}
        />

        {editing && editing === 'title' ? (
          <input
            name="title"
            value={title}
            onChange={e => this.updateInfo(e)}
            onBlur={() => {
              this.setState({ editing: false });
              this.updateIdea();
            }}
            type="text"
            autoFocus={true}
          />
        ) : (
          <h1 onClick={() => this.setState({ editing: 'title' })}>{title}</h1>
        )}

        {editing && editing === 'body' ? (
          <input
            name="body"
            value={body}
            onChange={e => this.updateInfo(e)}
            onBlur={() => {
              this.setState({ editing: false });
              this.updateIdea();
            }}
            type="text"
            autoFocus={true}
          />
        ) : (
          <p
            className="idea-body"
            onClick={() => this.setState({ editing: 'body' })}
          >
            {body}
          </p>
        )}
        <div className="idea-quality">
          <button
            disabled={quality === 3}
            onClick={() => this.updateQuality('upvote')}
            className="card-button upvote"
          />
          <button
            disabled={quality === 1}
            onClick={() => this.updateQuality('downvote')}
            className="card-button downvote"
          />
          <p>quality: {ideaQuality}</p>
        </div>
      </article>
    );
  }
}
