import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Skills } from '../../imports/collections/skills';
import { Link } from 'react-router-dom';

class SkillsList extends Component {
    renderSkills() {
        var str;
        if(this.props.id == Meteor.userId()) {
            str = "View";
        }
        else {
            str = "Vote";
        }

        return this.props.skills.map(skill => {
            const url=`skills/${skill._id}`;
            return (
                    <table key={skill._id} className="table table-hover tabel">
                        <tbody>
                            <tr>
                            <td className="tdtitle">{skill.title}</td>
                            <td className="tdvote"><img src='/images/like.png'/>{skill.ups}</td>
                            <td className="tdvote"><img src='/images/dislike.png'/>{skill.downs}</td>
                            <td className="tdvote"><Link to={url}>{str}</Link></td>
                            </tr>
                        </tbody>
                    </table>
            );
        });
    }

    render() {
        return (
            <div>
                {this.renderSkills()}
            </div>
        );
    }
};

export default createContainer((props) => {
     Meteor.subscribe('skills');

     return { skills: Skills.find({ownerId: props.id}).fetch() };
}, SkillsList);