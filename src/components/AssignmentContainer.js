import React, {Component} from 'react';
import numeral from 'numeral';

import AssignmentList from './AssignmentList';
import AssignmentStore from '../stores/AssignmentStore';
import AssignmentActions from '../actions/AssignmentActions';

export default class AssignmentContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      assignments: AssignmentStore.getAssignments(),
      totalRecieved: AssignmentStore.getTotalRecieved(),
      totalPossible: AssignmentStore.getTotalPossible(),
      totalGrade: AssignmentStore.getTotalGrade(),
      totalLetter: AssignmentStore.getTotalLetter()
    }

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount(){
    AssignmentStore.startListening(this._onChange);
  }

  componentWillUnmount(){
    AssignmentStore.stopListening(this._onChange);
  }

  _onChange(){
    this.setState({
      assignments: AssignmentStore.getAssignments(),
      totalRecieved: AssignmentStore.getTotalRecieved(),
      totalPossible: AssignmentStore.getTotalPossible(),
      totalGrade: AssignmentStore.getTotalGrade(),
      totalLetter: AssignmentStore.getTotalLetter()
    })
  }

  render(){
    const {assignments,totalRecieved,totalPossible,totalGrade,totalLetter} = this.state;
    return(
      <div>
        <hr/>
        <div className="panel panel-primary">
          <div className="panel-heading">Overall Grade</div>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td><span style={{"fontWeight":"bold"}}>Points Recieved: </span>{totalRecieved}</td>
                <td><span style={{"fontWeight":"bold"}}>Points Possible: </span>{totalPossible}</td>
                <td><span style={{"fontWeight":"bold"}}>Letter: </span>{totalLetter}</td>
                <td><span style={{"fontWeight":"bold"}}>Grade: </span>{numeral(totalGrade).format('0.00%')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr/>
        <AssignmentList assignments={assignments} assignmentDelete={AssignmentActions.assignmentDelete}/>
      </div>
  )
  }
}
