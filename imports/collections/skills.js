import { Mongo } from 'meteor/mongo';

Meteor.methods({
     'skill.up': function(Id) {
        return Skills.update({_id: Id}, { $inc: { "ups": 1 } });
     },
     'skill.down': function(Id) {
        return Skills.update({_id: Id}, { $inc: { "downs": 1 } });
     }
});

export const Skills = new Mongo.Collection('skills');