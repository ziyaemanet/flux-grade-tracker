import React, {Component} from 'react';
import AssignmentForm from './AssignmentForm';
import AssignmentContainer from './AssignmentContainer';

export default class Layout extends Component{



  render(){
    return(
      <div className="container">
        <h1 className="text-center">Flux Grade Tracker</h1>
        <hr/>
        <AssignmentForm/>
        <AssignmentContainer/>
      </div>
    )
  }
}
