import React, {Component} from "react";
import {Project} from "./Project";

export class Projects extends Component {
    render() {
        const {title, projects} = this.props;

        return (
            <div className="projects">
                <h2>{title}</h2>
                {projects.map(project => (
                <Project project={project} key={project.id} />
                ))}
            </div>
        );
    }
}