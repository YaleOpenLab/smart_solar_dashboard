import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import SolarContract from './SolarContract'
import web3 from './Web3';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      investor: false,
      contractor: false,
      consumer: false,
      deploymentDetails: null
    }
  }
  componentDidMount() {
    this.setState({
      investor: true
    })
    SolarContract.methods.getSolarSystemDetails('1').call({from: '0x6895e84F55C5bB5780636c77B9442AA45aD6ed4f'}, (error, result) => {
      console.log("result:", result)
      this.setState({
        deploymentDetails: result
      })
    });
    
  }

  makePayment = async() => {
    console.log("paying")
    let fromAccount = await web3.eth.getAccounts()
    SolarContract.methods.makePayment("1", "20").send({
      from: fromAccount[0],
      value: 20
    })
    .then(function(receipt){
      console.log("receipt:", receipt)
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" style= {{backgroundColor: 'red'}}>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>
        </header>
        <p className="App-intro">
          <ButtonGroup>
            <Button onClick={() => this.setState({investor: true, contractor: false, consumer: false})}>Investor</Button>
            <Button onClick={() => this.setState({investor: false, contractor: true, consumer: false})}>Contractor</Button>
            <Button onClick={() => this.setState({investor: false, contractor: false, consumer: true})}>Consumer</Button>
          </ButtonGroup>
          <h1>{this.state.investor ? "Investor selected": "Investor not selected"}</h1>
          <h1>{this.state.contractor ? "contractor selected": "contractor not selected"}</h1>
          <h1>{this.state.consumer ? "consumer selected": "consumer not selected"}</h1>
          {this.state.deploymentDetails ?
            <div>
              <h5>
                {"PanelSize: " + this.state.deploymentDetails['0']}
              </h5>
              <h5>
                {"TotalValue: $" + this.state.deploymentDetails['1']}
              </h5>
              <h5>
                {"Consumer Address: ", this.state.deploymentDetails['2']}
              </h5>
              <h5>
                {"PercentageHeld: " + this.state.deploymentDetails['3'] + "%"}
              </h5>
              <h5>
                {"Unpaid Usage: " + this.state.deploymentDetails['4']}
              </h5>
            </div>
            :
            null
          }
          <Button bsStyle="primary" onClick={this.makePayment}>Make Payment</Button>
        </p>
      </div>
    );
  }
}

export default App;
