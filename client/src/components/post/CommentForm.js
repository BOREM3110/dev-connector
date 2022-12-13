import React, { Component } from 'react'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {addComment} from "../../actions/postActions";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

class CommentForm extends Component {
  
 
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      name: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps = nextProps => {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
      this.setState({text: ''}); 
    }
  }
  onChange = e => {
    const {value, name} = e.target;
   this.setState((state) => ({
    ...state,
    text: value
   }))    
  };
  onSubmit = e => {
    const {user} = this.props.auth;
    const {postId} = this.props
 
    e.preventDefault();
   
    const newComment = {name: user.name,
    text: this.state.text,
  avatar: user.avatar};
    this.props.addComment(postId, newComment);

  }
  render() {
   const {errors} = this.props;
    return (
      <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Make comment...</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit} >
            <div className="form-group">
               <TextAreaFieldGroup placeholder="Reply to post..." name="text" value={this.state.text} onChange={this.onChange} error={errors.text} />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    )
  }
};


CommentForm.propTypes = {
  text: PropTypes.string,
  errors: PropTypes.object,
  postId: PropTypes.string.isRequired,
  addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
})
export default connect(mapStateToProps, {addComment})(CommentForm);
