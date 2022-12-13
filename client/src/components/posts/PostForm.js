import React, { Component } from 'react'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {addPost} from "../../actions/postActions";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

class PostForm extends Component {
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
    e.preventDefault();
    console.log(user)
    const post = {name: user.name,
    text: this.state.text,
  avatar: user.avatar};
    this.props.addPost(post);

  }
  render() {
    const {errors} = this.state;
    return (
      <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Say Somthing...</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit} >
            <div className="form-group">
               <TextAreaFieldGroup placeholder="Note what you like..." name="text" value={this.state.text} onChange={this.onChange} error={errors.text} />
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


PostForm.propTypes = {
  text: PropTypes.string,
  errors: PropTypes.object,
  addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
})
export default connect(mapStateToProps, {addPost})(PostForm);
