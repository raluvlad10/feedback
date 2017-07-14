import { Meteor } from 'meteor/meteor';

import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './employees_detail';

import filter from 'lodash/filter';
import { Link } from 'react-router-dom';

class EmployeesList extends Component {
    constructor(props) {
        super(props);

        this.state = {value: '',
                employees: props.employees};

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({employees: nextProps.employees});
    }

    handleChange (event) {
      this.setState({value: event.target.value});
      var Value = event.target.value;
      var newEmployees = _.filter(this.props.employees, function (employee) {
          var fullName = employee.nume + " " + employee.prenume;
          return (fullName.indexOf(Value) > -1 );
      });
      this.setState({employees: newEmployees});
    }
           
    render() {
        return (
            <div>
                <form className="search"  >
                    <input
                        onChange={this.handleChange}
                        className="input"
                        type="text"
                        ref="textInput"
                        placeholder="Search"
                    />
                </form>

                <ul className="ulx">
                {this.state.employees.map(employee => 
                 <EmployeeDetail key={employee._id} employee={employee}/> )}
                </ul>
            </div>
        );
    };
};

export default createContainer(() => {
     Meteor.subscribe('employees');
    
     return { employees: Employees.find({}).fetch() };
}, EmployeesList);
