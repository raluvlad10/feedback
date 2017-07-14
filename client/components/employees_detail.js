import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import SkillsList from './skills_list';

import { Skills } from '../../imports/collections/skills';

class EmployeeDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {open: false};

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({open: !this.state.open});
    }

    renderBestSkill(bestSkill) {
        if(bestSkill) {
            return ("Best at " + bestSkill);
        }
    }

    render() {
        var skills = this.props.skills;
        var score, maxScore = 0, bestSkill = '';

        skills = skills.map(skill => {
            score = skill.ups - skill.downs;
            if(score > maxScore) {
                maxScore = score;
                bestSkill = skill.title;
            }
            return skill;
        });

        const fullName = this.props.employee.nume + " " + this.props.employee.prenume;
        var thisClass, source;
        if(this.state.open) {
            thisClass = "collapse in";
            source = "/images/arrow_down.png";
        }
        else {
            thisClass = "collapse";
            source = "/images/arrow_right.png"
        }

        return (
            <li className="lix">
                <img src={source} className="imgArrow" onClick={this.handleClick}/>
                <button className="btn btn-info name" onClick={this.handleClick}>
                    {fullName}
                </button>
                <span className="bestSkill">{this.renderBestSkill(bestSkill)}</span>

                <div className={thisClass}>
                    <SkillsList id={this.props.employee._id} />
                </div>
            </li>   
        );
    };
};

export default createContainer((props) => {
    Meteor.subscribe('skills');

    return { skills: Skills.find({ownerId: props.employee._id}).fetch() };
}, EmployeeDetail);
