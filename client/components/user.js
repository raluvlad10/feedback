import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import { Skills } from '../../imports/collections/skills';
import { Link } from 'react-router-dom';

class User extends Component {
    onsubmit() {
        const nume=this.refs.lastName.value;
        const prenume=this.refs.firstName.value;
        const skill = this.refs.skill.value;

        var da = false;
        var exists = this.props.employees.map(employee => {
            if(employee._id == this.props.user._id)
                 {
                     da = true;
                     return true;
                 }
        });

        if(!da)
        {
            if(skill) {
                Employees.insert({
                    _id: this.props.user._id,
                    nume: nume,
                    prenume: prenume
                });
                Skills.insert({
                    ownerId: this.props.user._id,
                    title: skill,
                    ups: 0,
                    downs: 0
                });
            }
            else {
                Employees.insert({
                    _id: this.props.user._id,
                    nume: nume,
                    prenume: prenume
                });
            }
        }

        else {
            if(skill) {
                Skills.insert({
                        ownerId: this.props.user._id,
                        title: skill,
                        ups: 0,
                        downs: 0
                });
            }
            if(nume) {
                Meteor.call('employee.changeNume',this.props.user._id, nume);
            }
            if(prenume) {
                Meteor.call('employee.changePrenume', this.props.user._id, prenume);
            }
        }

    }

    render() {
        return(
            <div>
                <ul className="ulx">
                    <li className="row textuser textli">
                        <div className="col-sm-2">First Name: </div>
                        <input className="col-sm-2" ref="firstName" />
                    </li>
                    <li className="row textuser textli">
                        <div className="col-sm-2">Last Name: </div>
                        <input className="col-sm-2" ref="lastName" />
                    </li>
                    <li className="row textuser textli">
                        <div className="col-sm-2">Add Skill: </div>
                        <input className="col-sm-2" ref="skill" />
                    </li>
                </ul>
                <Link to="/" ><div className="col-sm-4">
                    <button className="btn btn-success btn-md button-x" onClick={this.onsubmit.bind(this)}>
                    Submit</button></div></Link>
            </div>
        );
    }
}

export default createContainer(() => {
     Meteor.subscribe('employees');
     Meteor.subscribe('skills');

     return { employees: Employees.find({}).fetch() };
}, User);
