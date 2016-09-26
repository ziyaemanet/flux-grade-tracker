import React, {Component} from 'react';
import numeral from 'numeral';

const AssignmentList = props => {
  const {assignments,assignmentDelete} = props;

  return(
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Points Recieved</th>
          <th>Points Possible</th>
          <th>Letter</th>
          <th>Grade</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {assignments.map(assignment => (
          <tr key={assignment.id}>
            <td>{assignment.title}</td>
            <td>{assignment.pointsRecieved}</td>
            <td>{assignment.pointsPossible}</td>
            <td>{assignment.letter}</td>
            <td>{numeral(assignment.grade).format('0.00%')}</td>
            <td><button onClick={() => assignmentDelete(assignment.id)} className="btn btn-sm btn-danger">X</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AssignmentList;
