import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { user } from 'pg/lib/defaults';
import { deletePost, addLike, removeLike } from '../../actions/postActions';

 class PostItem extends Component {
  onDeleteClick(id, commentId) {
 
    this.props.deletePost(id, commentId)
  }
  onLikeClick( id) {
   
     this.props.addLike(id)
   }

   onUnlikeClick( id) {
 
    this.props.removeLike(id)
  };
  findUserLike = (likes) => {
    const {user} = this.props.auth;
    console.log(user)
    if(likes.filter(like => like.user === user.id).length > 0) {
      return true
    } else {
      return false;
    }

  }
  render() {
    const {post, auth} = this.props;
    return (
      <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="/profile">
            <img
              className="rounded-circle d-none d-md-block"
              src={post.avatar}
              alt={post.name}
            />
          </a>
          <br />
          <p className="text-center">{post.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{post.text}</p>
          <button type="button" onClick={this.onLikeClick.bind(this, post._id)} className="btn btn-light mr-1" >
            <i className={classnames("fas fa-thumbs-up", {"text-info": this.findUserLike(post.likes)})} />
            <span className="badge badge-light" >{post.likes.length}</span>
          </button>
          <button type="button"  onClick={this.onUnlikeClick.bind(this, post._id)} className="btn btn-light mr-1" >
          <i className="text-secondary fas fa-thumbs-down" />

          </button>
            <Link to={`/post/${post._id}`} className='btn btn-info mr-1' >
              comments
            </Link>
            {post.user === auth.user.id ? (
            <button type="button" onClick={this.onDeleteClick.bind(this)}  className="btn btn-danger mr-1" >
               <i className="fas fa-times" />
            </button>
            ): null}
             
          
              
        </div>
      </div>
    </div>
    )
  }
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired


};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {deletePost, addLike, removeLike})(PostItem);