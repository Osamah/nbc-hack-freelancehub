import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import FreelanceHubContract from "./contracts/FreelanceHub.json";
import getWeb3 from "./utils/getWeb3";
import {Projects} from "./components/Projects";
import Blockies from 'react-blockies';

import "./App.css";

const projects = [
  {
    "id": 1,
    "description": "Pepsi microsite homepage redesign",
    "fullDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vehicula turpis non enim maximus luctus. Maecenas maximus accumsan ultricies. Vestibulum eu mattis massa. Aliquam rhoncus pharetra ex a viverra. Duis fermentum est ante, sit amet ultrices dolor tincidunt vel. Nulla iaculis sapien vel leo commodo, posuere consequat velit tincidunt. Donec felis quam, accumsan vitae lorem ut, imperdiet vulputate turpis.",
    "techStack": "React, html, css, Adobe Photoshop",
    "time": "20 minutes ago",
    "fee": "5 ETH",
    "img": "https://brandmark.io/logo-rank/random/pepsi.png"
  },
  {
    "id": 2,
    "description": "McDonalds rework online menu",
    "fullDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vehicula turpis non enim maximus luctus. Maecenas maximus accumsan ultricies. Vestibulum eu mattis massa. Aliquam rhoncus pharetra ex a viverra. Duis fermentum est ante, sit amet ultrices dolor tincidunt vel. Nulla iaculis sapien vel leo commodo, posuere consequat velit tincidunt. Donec felis quam, accumsan vitae lorem ut, imperdiet vulputate turpis.",
    "techStack": "React, html, css, Adobe Photoshop",
    "time": "1 hour ago",
    "fee": "10 ETH",
    "img": "https://brandmark.io/logo-rank/random/mcdonalds.png"
  },
  {
    "id": 3,
    "description": "Update API for real-time tracking",
    "fullDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vehicula turpis non enim maximus luctus. Maecenas maximus accumsan ultricies. Vestibulum eu mattis massa. Aliquam rhoncus pharetra ex a viverra. Duis fermentum est ante, sit amet ultrices dolor tincidunt vel. Nulla iaculis sapien vel leo commodo, posuere consequat velit tincidunt. Donec felis quam, accumsan vitae lorem ut, imperdiet vulputate turpis.",
    "techStack": "React, html, css, Adobe Photoshop",
    "time": "3 hours ago",
    "fee": "1.5 ETH",
    "img": "https://brandmark.io/logo-rank/random/ups.png"
  },
  {
    "id": 4,
    "description": "Contact us form rebrand",
    "fullDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vehicula turpis non enim maximus luctus. Maecenas maximus accumsan ultricies. Vestibulum eu mattis massa. Aliquam rhoncus pharetra ex a viverra. Duis fermentum est ante, sit amet ultrices dolor tincidunt vel. Nulla iaculis sapien vel leo commodo, posuere consequat velit tincidunt. Donec felis quam, accumsan vitae lorem ut, imperdiet vulputate turpis.",
    "techStack": "React, html, css, Adobe Photoshop",
    "time": "One week ago",
    "fee": "0.75 ETH",
    "img": "https://brandmark.io/logo-rank/random/ups.png"
  },
  {
    "id": 5,
    "description": "Translate iMac product page",
    "fullDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vehicula turpis non enim maximus luctus. Maecenas maximus accumsan ultricies. Vestibulum eu mattis massa. Aliquam rhoncus pharetra ex a viverra. Duis fermentum est ante, sit amet ultrices dolor tincidunt vel. Nulla iaculis sapien vel leo commodo, posuere consequat velit tincidunt. Donec felis quam, accumsan vitae lorem ut, imperdiet vulputate turpis.",
    "techStack": "React, html, css, Adobe Photoshop",
    "time": "Two weeks ago",
    "fee": "1 ETH",
    "img": "https://brandmark.io/logo-rank/random/apple.png"
  }
]

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FreelanceHubContract.networks[networkId];
      const instance = new web3.eth.Contract(
        FreelanceHubContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.setState({ web3, accounts, contract: instance }, this.runExample);
      this.setState({ web3, accounts, contract: instance }, () => {
        console.log('componentDidMount', this.state);
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    console.log('runExample', this.state);

    // Stores a given value, 5 by default.
    contract.methods.set(50).send({ from: accounts[0] })
    .on('confirmation', async (confirmationNumber, receipt) => {
      console.log('contract.methods.set.send');

      // Get the value from the contract to prove it worked.
      const response = await contract.methods.get().call();

      console.log('contract.methods.get', response, parseInt(response._hex));

      // Update state with the result.
      this.setState({ storageValue: parseInt(response._hex) });
    })
    .catch(data => {
      console.log('set error', data);
    });
  };

  createJob = async () => {
    const { accounts, contract } = this.state;

    contract.methods.createJob(100).send({ from: accounts[0] })
    .on('confirmation', async (confirmationNumber, receipt) => {
      console.log(confirmationNumber, receipt);

      // this.setState({ storageValue: parseInt(response._hex) });
    })
    .catch(data => {
      console.log('set error', data);
    });
  }

  render() {
    if (!this.state.web3) {
      return <div className="fallback">Please enable MetaMask to use Freelance Hub</div>;
    }

    return (
      <div>
        <header>
          <h1>Freelance Hub</h1>
          <section className="user-info">
            <span>{this.state.accounts[0].substr(0, 6)}...{this.state.accounts[0].substr(-5)}</span>
            <Blockies seed={this.state.accounts[0]} size={10} scale={4} />
          </section>
        </header>
        <div className="container">

          {this.renderContent()}

          {/* <div>
            <div>The stored value is: {this.state.storageValue}</div>
          </div> */}
        </div>
      </div>
    );
  }

  renderContent() {
    // return this.renderFreelancer();
    return this.renderCompany();
  }

  renderFreelancer() {
    return <Projects title="Available projects" projects={projects} />;
  }

  renderCompany() {
    return (
      <div>
        <section className="create-project">
          <h2>Create a new project</h2>
            <label>
              Project title:
              <input type="text" value={this.state.projectTitle} onChange={this.handleChange} />
            </label>
            <label>
              Fee (ETH):
              <input type="text" value={this.state.projectFee} onChange={this.handleChange} />
            </label>
            <button onClick={this.createJob} className="button">Create project</button>
        </section>

        <Projects title="Past projects" projects={[projects[1]]} />
      </div>
    );
  }
}

export default App;
