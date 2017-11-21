import React, { Component } from 'react';

export default class IdeaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: null,
      title: '',
      body: '',
      quality: null,
    };
  }

  componentDidMount() {
    const { title, body, quality, id } = this.props;
    this.setState ({
      id,
      title,
      body,
      quality
    });
  }

  upvote() {
    const currentQuality = this.state.quality;
    if (this.state.quality < 3) {
      this.setState({ quality: currentQuality + 1 });
    }
    this.updateIdea();
  }

  downvote(ideaId) {
    const currentQuality = this.state.quality;
    if (this.state.quality > 1) {
      this.setState({ quality: currentQuality - 1 });
    }
  }

  deleteIdea(id) {
    this.props.deleteIdea(id);
  }

  updateInfo(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  updateIdea() {
    const { title, body, quality } = this.state;
    const idea = {
      id: this.props.id,
      title,
      body,
      quality,
    }
    this.props.updateIdea(idea);
  }

  render() {
    const { id, title, body, quality } = this.state;
    const ideaQuality =
      this.state.quality === 1
        ? 'swill'
        : quality === 2 ? 'plausible' : 'genius';

    return (
      <div key={id}>
        {this.state.editing ? (
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={e => {
              this.updateInfo(e);
            }}
            onBlur={() => this.setState({ editing: null })}
          />
        ) : (
          <h1 onClick={() => this.setState({ editing: 'title' })}>{title}</h1>
        )}
        <h2>{body}</h2>
        <p>quality: {ideaQuality}</p>
        <button onClick={() => this.deleteIdea(id)}>Delete</button>
        <button disabled={quality === 3} onClick={() => this.upvote(id)}>
          +
        </button>
        <button disabled={quality === 1} onClick={() => this.downvote(id)}>
          -
        </button>
      </div>
    );
  }
}
