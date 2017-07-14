import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'ups.inc': function(employee, number) {
        var skill = "skills." + number + ".ups";
        return Employees.update({ _id: employee._id}, { $inc: { [skill]: 1 } });  
     },
     'downs.inc': function(employee, number) {
        var skill = "skills." + number + ".downs";
        return Employees.update({_id: employee._id}, { $inc: { [skill]: 1 } });
     },
     'employee.changeNume': function(Id, nume) {
         return Employees.update({_id: Id}, { $set: { "nume": nume} });
     },
     'employee.changePrenume': function(Id, prenume) {
         return Employees.update({_id: Id}, { $set: {"prenume": prenume} });
     },
     'employee.state': function(Id, thisState) {
        return Employees.update({_id: Id}, { $set: { "anonim": thisState } });
     }
});

export const Employees = new Mongo.Collection('employees');