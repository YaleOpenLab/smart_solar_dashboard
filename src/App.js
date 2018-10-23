import React, { Component } from 'react';
import { Button, ButtonGroup, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
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
      deploymentDetails: null,
      solarSystemId: '',
      payout: '',
      panelSize: '',
      totalValue: '',
      contractorAddress: '',
      consumerAddress: '',
      solarSystemIdConsumer: '',
      payment: '',
      contractorSS: ''
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

  proposeDeployment = async() => {
    let {solarSystemId, payout, panelSize, totalValue, contractorAddress, consumerAddress} = this.state;
    let fromAccount = await web3.eth.getAccounts()
    SolarContract.methods.proposeDeployment(solarSystemId, payout, panelSize, totalValue, contractorAddress, consumerAddress).send({
      from: fromAccount[0]
    })
    .then(function(receipt){
      console.log("receipt:", receipt)
    });
  }

  confirmDeployment = async(id) => {
    let fromAccount = await web3.eth.getAccounts()
    SolarContract.methods.confirmDeployment(id).send({
      from: fromAccount[0]
    })
    .then(function(receipt){
      console.log("receipt:", receipt)
    });
  }


  renderActions = () => {
    if(this.state.consumer) {
      return (
        <Form horizontal className='form'>

          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              System to Confirm
            </Col>
            <Col sm={10}>
              <FormControl 
                type="text"
                value={this.state.confirmConsumer}
                placeholder="Enter text"
                onChange={event => this.setState({confirmConsumer:event.target.value})}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button onClick={() => this.confirmDeployment(this.state.confirmConsumer)}>Confirm Deployment</Button>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Solar System Id
            </Col>
            <Col sm={10}>
              <FormControl 
                type="text"
                value={this.state.solarSystemIdConsumer}
                placeholder="Enter text"
                onChange={event => this.setState({solarSystemIdConsumer:event.target.value})}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Payment Amount
            </Col>
            <Col sm={10}>
              <FormControl 
                type="text"
                value={this.state.payment}
                placeholder="Enter text"
                onChange={event => this.setState({payment:event.target.value})}
              />
            </Col>
          </FormGroup>

          <Button onClick={this.makePayment}>Make Payment</Button>

        </Form>
      )
    } else if (this.state.investor) {
      return (
        <Form horizontal className='form'>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Solar System Id
            </Col>
            <Col sm={10}>
              <FormControl 
                type="text"
                value={this.state.solarSystemId}
                placeholder="Enter text"
                onChange={event => this.setState({solarSystemId:event.target.value})}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Payout
            </Col>
            <Col sm={10}>
              <FormControl 
                type="text"
                value={this.state.payout}
                placeholder="Enter text"
                onChange={(event) => {this.setState({payout:event.target.value})}} 
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              PanelSize
            </Col>
            <Col sm={10}>
              <FormControl 
                type="text"
                value={this.state.panelSize}
                placeholder="Enter text"
                onChange={(event) => {this.setState({panelSize:event.target.value})}} 
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              TotalValue
            </Col>
            <Col sm={10}>
              <FormControl 
                type="text"
                value={this.state.totalValue}
                placeholder="Enter text"
                onChange={(event) => {this.setState({totalValue:event.target.value})}} 
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Contractor
            </Col>
            <Col sm={10}>
              <FormControl 
                type="text"
                value={this.state.contractorAddress}
                placeholder="Enter text"
                onChange={(event) => {this.setState({contractorAddress:event.target.value})}} 
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Consumer
            </Col>
            <Col sm={10}>
              <FormControl 
                type="text"
                value={this.state.consumerAddress}
                placeholder="Enter text"
                onChange={(event) => {this.setState({consumerAddress:event.target.value})}} 
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button onClick={this.proposeDeployment}>Propose Deployment</Button>
            </Col>
          </FormGroup>
        </Form>
      )
    } else if (this.state.contractor) {
      return (
        <Form horizontal className='form'>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Solar System Id
            </Col>
            <Col sm={10}>
              <FormControl 
                type="text"
                value={this.state.contractorSS}
                placeholder="Enter text"
                onChange={event => this.setState({contractorSS:event.target.value})}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button onClick={() => this.confirmDeployment(this.state.contractorSS)}>Deployed System</Button>
            </Col>
          </FormGroup>
        </Form>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" style= {{backgroundColor: 'red'}}>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>
        </header>
        <p className="App-intro">
          <ButtonGroup>
            <Button bsStyle={this.state.investor ? "success": null} onClick={() => this.setState({investor: true, contractor: false, consumer: false})}>Investor</Button>
            <Button bsStyle={this.state.contractor ? "success": null} onClick={() => this.setState({investor: false, contractor: true, consumer: false})}>Contractor</Button>
            <Button bsStyle={this.state.consumer ? "success": null} onClick={() => this.setState({investor: false, contractor: false, consumer: true})}>Consumer</Button>
          </ButtonGroup>
          <h3>
            PANEL DETAILS
          </h3>
          {this.state.deploymentDetails ?
            <div className='info'>
              <h5>
                {"PanelSize: " + this.state.deploymentDetails['0']}
              </h5>
              <h5>
                {"TotalValue: $" + this.state.deploymentDetails['1']}
              </h5>
              <h5>
                {"Consumer Address: " + this.state.deploymentDetails['2']}
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
          {this.renderActions()}
        </p>
      </div>
    );
  }
}

export default App;
