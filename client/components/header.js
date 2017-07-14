import React, { Component } from 'react';
import Accounts from './ui/accounts';
import { Link } from 'react-router-dom';

import { createContainer } from 'meteor/react-meteor-data';

class Header extends Component {
    renderButton() {
        if(this.props.users && this.props.users.length > 0) {
            const url = `/users/${Meteor.userId()}`;
            
            return(
                <Link to={url}>My profile</Link>
            );
        }
    }

    render() {
        return(
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand header-title" to="/">Lista angajati</Link>
                    </div>
                    <ul className="nav navbar-nav header-ul">
                        <li>{this.renderButton()}</li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right login">
                        <li><Accounts /></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default createContainer(() => {
    
    return { users: Meteor.users.find({}).fetch() };
}, Header);