import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from '../../utils/WithNavigate';
import PropTypes from 'prop-types';
import moment from 'moment';
import Moment from "react-moment";
import {deleteExperience} from '../../actions/profileActions';
import {deleteEducation} from '../../actions/profileActions';


class Education extends Component {
  onDeleteClick = (id) => {
   
    this.props.deleteEducation(id)
  }
  render() {
   
  
    const education = this.props.education.map(educ => (
      <tr key={educ._id} >
        <td>{educ.school}</td>
        <td>{educ.degree}</td>
        <td>
        <Moment format="YYYY/MM/DD" >{educ.from}</Moment> - {' '} 
        {educ.to === null ? "Now" : (<Moment format="YYYY/MM/DD" >{educ.to}</Moment> )}
          </td>
        <td> <button type="button" className="btn btn-danger" onClick={this.onDeleteClick.bind(this, educ._id)}  >Delete</button> </td>
      </tr>
    ));
     
    return (
      <div >
        <h4 className="mb-4" >Education Credentials </h4>
        <table className="table" >
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th></th>

            </tr>
            
              {education}
           
          </thead>
        </table>
      </div>
    )
  }
};

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};
export default connect(null, {deleteEducation})(Education);
