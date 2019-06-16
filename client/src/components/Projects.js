import React, {Component} from "react";
import {Project} from "./Project";

export class Projects extends Component {
    render() {
        const {title, projects, greyed, buttonHandler, startJob, cdetail} = this.props;

        return (
            <div className={`projects ${greyed ? 'greyed' : ''}`}>
                <h2>{title}</h2>
                {projects.map(project => (
                <Project project={project} key={project.id} buttonHandler={buttonHandler} startJob={startJob} cdetail={cdetail} />
                ))}
            </div>
        );
    }
}