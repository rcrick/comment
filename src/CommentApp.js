import React, { Component } from 'react';
import CommonInput from './CommentInput';
import CommentList from './CommentList';
import wraWithLoadData from './wrapWithLoadData';

class CommentApp extends Component {
  constructor(props) {
    super(props);
    this.state = { comments: props.data || []};
  }

  // componentWillMount() {
  //   this._loadComments();
  // }

  // _loadComments() {
  //   let comments = localStorage.getItem('comments');
  //   if (comments) {
  //     comments = JSON.parse(comments);
  //     this.setState({ comments });
  //   }
  // }

  // _saveComments(comments) {
  //   localStorage.setItem('comments', JSON.stringify(comments));
  // }

  handleSubmitComment(comment) {
    if (!comment) return;
    if (!comment.userName) return alert('请输入用户名');
    if (!comment.content) return alert('请输入评论内容');

    const comments = this.state.comments;
    comments.push(comment);
    this.setState({
      comments: comments
    });
    this.props.saveData(comments);
  }

  handleDeleteComment(index) {
    const comments = this.state.comments;
    comments.splice(index, 1);
    this.setState(comments);
    this.props.saveData(comments);
  }

  render() {
    return (
      <div className="wrapper">
        <CommonInput onSubmit={this.handleSubmitComment.bind(this)} />
        <CommentList
          comments={this.state.comments}
          onDeleteComment={this.handleDeleteComment.bind(this)}
        />
      </div>
    );
  }
}
CommentApp = wraWithLoadData(CommentApp, 'commonts');

export default CommentApp;
