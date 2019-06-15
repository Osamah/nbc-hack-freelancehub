import React, {Component} from "react";

export class Project extends Component {
    state = {
        open: false
    };

    toggleDetails = () => {
        this.setState({
            open: !this.state.open
        });
    }

    takeJob = () => {

    }

    render() {
        const {project} = this.props;
        const {open} = this.state;

        return (
            <div className={`project ${open ? 'open' : ''}`}>
                <div className="project-strip" onClick={this.toggleDetails}>
                    <div className="project-info">
                        <img className="project-img" src={project.img} alt="" />
                        <div className="project-details">
                            <span className="project-desc">{project.description}</span>
                            <span className="project-meta">{project.time}</span>
                        </div>
                    </div>
                    <div className="project-payment">
                        <span className="project-desc">{project.fee}</span>
                    </div>
                </div>

                <div className="project-extra">
                    <h3>Description</h3>
                    <p>{project.fullDescription}</p>
                    <div className="project-actions">
                        <button className="button" onClick={this.takeJob} href="#">Take the job</button>
                    </div>
                </div>
            </div>
            );
    }
}