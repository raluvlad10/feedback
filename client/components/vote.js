import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Votes } from '../../imports/collections/votes';
import { Skills } from '../../imports/collections/skills';
import { Employees } from '../../imports/collections/employees';

import { Link } from 'react-router-dom';

class Vote extends Component {
    constructor(props) {
        super(props);

        this.state = { upsChecked: false,
                        downsChecked: false,
                        anonim: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeUps = this.handleChangeUps.bind(this);
        this.handleChangeDowns = this.handleChangeDowns.bind(this);
    }

    onsubmit() {
        
        if(Meteor.userId() != this.props.skill.ownerId) {
            var ok;
            if(this.state.upsChecked) {
                ok = 1;
                Meteor.call('skill.up', this.props.skill._id);
            }
            if(this.state.downsChecked) {
                ok = -1;
                Meteor.call('skill.down', this.props.skill._id);
            }

            const comment = this.refs.Comment.value;

            const Id = Meteor.userId();
            var fullName;
            const employee = Employees.findOne({_id: Id});

            if(this.state.anonim === true)
            {
                fullName = "anonym";
            }
            else {
                if(employee) {
                    fullName = employee.nume + ' ' + employee.prenume;
                }
                else {
                    fullName = Meteor.user().username;
                }
            }
           
            if(comment) {
                Votes.insert({
                    ownerId: this.props.skill.ownerId,
                    subscriberId: fullName,
                    skillId: this.props.skill._id,
                    comment: comment,
                    ok: ok
                });
            }
        }
        this.refs.Comment.value = '';
        this.setState({
            upsChecked: false,
            downsChecked: false,
            anonim: false
        });
    }

    handleChange() {
        this.setState({anonim: !this.state.anonim});
    }

    handleChangeUps() {
        const x = this.state.upsChecked;
        if(!x) {
            this.setState({
                downsChecked: false
            });
        }
        this.setState({
            upsChecked: !x
        });
    }

    handleChangeDowns() {
        const x = this.state.downsChecked;
        if(!x) {
            this.setState({
                upsChecked: false
        });
        }
        this.setState({
            downsChecked: !x
        });
    }

    renderSkill(employee, skill) {
        const fullName = employee.nume + ' ' + employee.prenume;
        if(employee._id == Meteor.userId()) {
            return (
                <div className="votepage">
                    <h2>{fullName}</h2>
                    <h3 className="selectedSkill">Skill you selected: {skill.title}</h3>
                </div>
            );
        }
        else {
            return (
                <div className="votepage">
                    <h2>{fullName}</h2>
                    <h3 className="selectedSkill">Skill you selected: {skill.title}</h3>
                    <div className="votepage">
                        <table>
                            <tbody className="table tabel2">
                                <tr>
                                <td><input type="checkbox" checked={this.state.upsChecked} onChange={ this.handleChangeUps } />
                                    <img src='/images/like.png'/></td>
                                <td><input type="checkbox" checked={this.state.downsChecked} onChange={ this.handleChangeDowns } />
                                    <img src='/images/dislike.png' /></td>
                                </tr>
                            </tbody>
                        </table>
                        <textarea className="form-control textbox" rows="5" ref="Comment"></textarea>

                        <div className="username"><input type="checkbox" checked={this.state.anonim} onChange={ this.handleChange } />
                                Submit as anonym</div>
                        <button className="btn btn-success btn-md votesubmit" onClick={this.onsubmit.bind(this)}>
                            Submit</button>
                    </div>
                </div>
            );
        }
    }

    renderPozComments() {
        const pozVotes = this.props.votes.filter(vote => {
            return (vote.ok == 1);
        });
        if(pozVotes.length > 0) {
            return(
            <div className="commentCategory">
                <h2 className="label label-success name">Pozitive Comments</h2>
                <ul className="ulx">
                    {pozVotes.map(vote => {
                        return (<li className="lix" key={vote._id}>
                            <div className="comment">{vote.comment}</div>
                            <div className="commentSubscriber">Subscribed by {vote.subscriberId}</div></li>);
                    })}  
                </ul>
            </div>);
        }
    }

    renderNegComments() {
        const negVotes = this.props.votes.filter(vote => {
            return (vote.ok == -1);
        });
        if(negVotes.length > 0) {
            return (
                <div className="commentCategory">
                    <h2 className="label label-danger name">Negative Comments</h2>
                    <ul className="ulx">
                        {negVotes.map(vote => {
                            return (<li className="lix" key={vote._id}>
                            <div className="comment">{vote.comment}</div>
                            <div className="commentSubscriber">Subscribed by {vote.subscriberId}</div></li>);
                        })}  
                    </ul>
                </div>
            );
        }
    }

    renderOtherComments() {
        const otherVotes = this.props.votes.filter(vote => {
            return (vote.ok != 1 && vote.ok != -1);
        });
        if(otherVotes.length > 0) {
            return(
            <div className="commentCategory">
                <h2 className="label label-warning name">Other Comments</h2>
                <ul className="ulx">
                    {otherVotes.map(vote => {
                     return (<li className="lix" key={vote._id}>
                     <div className="comment">{vote.comment}</div>
                     <div className="commentSubscriber">Subscribed by {vote.subscriberId}</div></li>);
                    })}  
                </ul>
            </div>);
        }
    }

    renderEmployee() {
        const skill = this.props.skill;

        if(!skill) {
            return (<div>Loading...</div>);
        }
        else {
            const employee = Employees.findOne({_id: skill.ownerId});

            return(
                <div>
                {this.renderSkill(employee, skill)}
                {this.renderPozComments()}
                {this.renderNegComments()}
                {this.renderOtherComments()}
                </div>
            );
        }
    }

    render() {
        if(!this.props.user) {
            window.history.back();
        }

        return(
            <div>
                {this.renderEmployee()}
            </div>
        );
    };
};

export default createContainer((props) => {
    const skillId = props.match.params.skillId;
    Meteor.subscribe('votes');
    Meteor.subscribe('skills');
    Meteor.subscribe('employees');

    return { user: Meteor.userId(),
             votes: Votes.find({skillId: skillId}).fetch(),
             skill: Skills.findOne({_id: skillId}) };
}, Vote);
