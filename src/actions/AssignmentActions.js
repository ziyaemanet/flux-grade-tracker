import AppDispatcher from '../AppDispatcher';

const AssignmentActions = {
  assignmentCreate(assignment){
    AppDispatcher.dispatch({
      type: 'ASSIGNMENT_CREATE',
      payload: {assignment}
    })
  },

  assignmentDelete(assignmentID){
    AppDispatcher.dispatch({
      type: 'ASSIGNMENT_DELETE',
      payload: {assignmentID}
    })
  }

}

export default AssignmentActions;
