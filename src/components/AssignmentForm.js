import React, {Component} from 'react';
import AssignmentActions from '../actions/AssignmentActions';

export default class AssignmentForm extends Component{
  constructor(props){
    super(props);
    this._submitForm = this._submitForm.bind(this);
  }

  _submitForm(e){
    e.preventDefault();
    const {title,pointsRecieved,pointsPossible} = this.refs;

    let assignment = {
      title: title.value,
      pointsRecieved: parseInt(pointsRecieved.value),
      pointsPossible: parseInt(pointsPossible.value)
    }

    title.value = '';
    pointsRecieved.value = '';
    pointsPossible.value = '';

    AssignmentActions.assignmentCreate(assignment);
  }

  render(){
    return(
      <form onSubmit={this._submitForm} className="form-inline text-center">
        <div className="form-group">
          <label>Title:&nbsp;</label>
          <input ref="title" type="text" className="form-control" required/>
        </div>
        <div className="form-group">
          <label>&nbsp;&nbsp;&nbsp;Points Recieved:&nbsp;</label>
          <input ref="pointsRecieved" type="number" className="form-control" min="1" step="1" required/>
        </div>
        <div className="form-group">
          <label>&nbsp;&nbsp;&nbsp;Points Possible:&nbsp;</label>
          <input ref="pointsPossible" type="number" className="form-control"  min="1" step="1" required/>
        </div>
        <br/><br/>
        <button className="btn btn-primary">Add Assignment</button>
      </form>
    )
  }
}
