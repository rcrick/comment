import React, { Component } from 'react';
import PropsType from 'prop-types';
import wraWithLoadData from './wrapWithLoadData';

class CommentInput extends Component {
  static propTypes = {
    onSubmit: PropsType.func
  };

  constructor(props) {
    super(props);
    this.state = {
      userName: props.data || '',
      content: ''
    };
  }

  componentDidMount() {
    this.textarea.focus();
  }


  handleUserNameChange(e) {
    this.setState({
      userName: e.target.value
    });
  }

  handleContentChange(e) {
    this.setState({
      content: e.target.value
    });
  }

  handleSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        userName: this.state.userName,
        content: this.state.content,
        createdTime: +new Date()
      });
    }
    this.setState({ content: '' });
  }

  handleUsernameBlur(e) {
    this.props.saveData(e.target.value);
  }

  render() {
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">用户名：</span>
          <div className="comment-field-input">
            <input
              value={this.state.userName}
              onBlur={this.handleUsernameBlur.bind(this)}
              onChange={this.handleUserNameChange.bind(this)}
            />
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论内容：</span>
          <div className="comment-field-input">
            <textarea
              ref={textarea => {
                this.textarea = textarea;
              }}
              value={this.state.content}
              onChange={this.handleContentChange.bind(this)}
            />
          </div>
        </div>
        <div className="comment-field-button">
          <button onClick={this.handleSubmit.bind(this)}>Publish</button>
        </div>
      </div>
    );
  }
}

CommentInput = wraWithLoadData(CommentInput, 'userName');

export default CommentInput;
