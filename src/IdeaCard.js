import React, { Component } from 'react';

export default class IdeaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: null,
      title: '',
      body: '',
      quality: null,
      id: null,
    };
  }

  componentDidMount() {
    const { title, body, quality, id } = this.props;
    this.setState({
      title,
      body,
      quality,
      id,
    });
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
      <div key={id}>
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
          />
        ) : (
          <h2 onClick={() => this.setState({ editing: 'body' })}>{body}</h2>
        )}
        <p>quality: {ideaQuality}</p>
        <button onClick={() => this.deleteIdea(id)}>Delete</button>
        <button
          disabled={quality === 3}
          onClick={() => this.updateQuality('upvote')}
        >
          +
        </button>
        <button
          disabled={quality === 1}
          onClick={() => this.updateQuality('downvote')}
        >
          -
        </button>
      </div>
    );
  }
}
