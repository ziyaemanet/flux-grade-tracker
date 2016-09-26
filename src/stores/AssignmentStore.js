import AppDispatcher from '../AppDispatcher';
import {EventEmitter} from 'events';
import uuid from 'uuid';

import Storage from '../Storage';

let _assignments =  Storage.read('assignments') || [];
let _totalPossible = 0;
let _totalRecieved = 0;
let _totalGrade = 0;
let _totalLetter = '';

class AssignmentStore extends EventEmitter{
  constructor(){
    super();

    this.calcPercentage();

    AppDispatcher.register(action => {

      switch(action.type){
        case 'ASSIGNMENT_CREATE':
          let {assignment} = action.payload;
          let grade = assignment.pointsRecieved/assignment.pointsPossible;

          _assignments.push({
            title: assignment.title,
            pointsRecieved: assignment.pointsRecieved,
            pointsPossible: assignment.pointsPossible,
            grade,
            letter: this.calcLetter(grade),
            id: uuid()
          });

          this.calcPercentage();
          this.emit('CHANGE');
          break;
        case 'ASSIGNMENT_DELETE':
          _assignments = _assignments.filter(assignment => assignment.id != action.payload.assignmentID);
          this.calcPercentage();
          this.emit('CHANGE');
          break;
      }
    });

    this.on('CHANGE',() => {
      Storage.write('assignments',_assignments)
    })
  }

  calcPercentage(){
    _totalPossible = 0;
    _totalRecieved = 0;

    _assignments.forEach(assignment => {
      _totalPossible += assignment.pointsPossible;
      _totalRecieved += assignment.pointsRecieved;
    });

    if(_totalPossible){
      _totalGrade = _totalRecieved/_totalPossible;
      _totalLetter = this.calcLetter(_totalGrade);
    }else{
      _totalGrade = 0;
      _totalLetter = 'NO ASSIGNMENTS'
    }
  }

  calcLetter(score){
    let letter = '';

    if(score >= .9){
      letter = 'A';
    }else if(score >= .8){
      letter = 'B';
    }else if(score >= .7){
      letter = 'C';
    }else if(score >= .6){
      letter = 'D';
    }else{
      letter = 'F';
    }

    return letter;
  }

  startListening(callback){
    this.on('CHANGE',callback);
  }

  stopListening(callback){
    this.removeListener('CHANGE',callback);
  }

  getAssignments(){
    return _assignments;
  }

  getTotalPossible(){
    return _totalPossible;
  }

  getTotalRecieved(){
    return _totalRecieved;
  }

  getTotalGrade(){
    return _totalGrade;
  }

  getTotalLetter(){
    return _totalLetter;
  }

}

export default new AssignmentStore();
