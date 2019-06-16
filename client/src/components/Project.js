import React, {Component} from "react";
import Blockies from 'react-blockies';

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
        this.props.startJob(() => {
            this.setState({
                inprogress: true
            });
        });
    }

    render() {
        const {project, cdetail} = this.props;
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


                    {
                        (!this.state.inprogress && !cdetail) && (
                            <div className="project-actions">
                                <button className="button" onClick={this.takeJob} href="#">Take the job</button>
                            </div>
                        )
                    }

                    {
                        (this.state.inprogress && !cdetail) && (
                            <div className="project-in-progress">
                                <h3>You can get started by cloning the repository here:</h3>
                                <code>git clone https://github.com/Osamah/nbc-hack-client.git</code>
                                <p>All your commits will be shown here, be sure to adhere to the job's technical requirements and coding standards to increase your chance of getting approved</p>
                            </div>
                        )
                    }

                    {
                        cdetail && (
                            <div>
                                <h3>Freelancers that are working on the job:</h3>
                                <section className="project-freelancer">
                                    <div>
                                        <Blockies seed={'Ser Davos'} size={6} scale={4} />
                                        <h4>Ser Davos</h4>
                                    </div>
                                    <code>74 of 78 tests passed · No linting errors · 78% test coverage</code>
                                    <div>
                                        <button className="button">Live demo</button>
                                        <button className="button">Approve</button>
                                    </div>
                                </section>
                            </div>
                        )
                    }
                </div>
            </div>
            );
    }
}