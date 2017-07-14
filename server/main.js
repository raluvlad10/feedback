import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';
import { Skills } from '../imports/collections/skills';
import { Votes } from '../imports/collections/votes';

Meteor.startup(() => {
  Meteor.publish('employees', function() {
        return Employees.find( {} );
  });

  Meteor.publish('skills', function() {
        return Skills.find( {} );
  });

  Meteor.publish('votes', function() {
        return Votes.find( {} );
  });
});
