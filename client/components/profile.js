import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import User from './user';
import { Employees } from '../../imports/collections/employees';

class Profile extends Component {
    render () {
        if(!Meteor.userId()) {
            window.history.back();
        }
        if(!this.props.user ) { return <div>Loading...</div>; }

        return (
            <div>
                <User user={this.props.user} />
            </div>
        );
    }
}

export default createContainer((props) => {
    const { userId } = props.match.params;

    return { user: Meteor.users.findOne(userId) };
}, Profile);