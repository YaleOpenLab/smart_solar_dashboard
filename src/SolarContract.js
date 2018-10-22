import web3 from './Web3';
//Your contract address
const address = '0xa9f9fa6c881ef37865a85063ffa03cf4de992b16';
//Your contract ABI
const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_ssAddress",
        "type": "uint256"
      }
    ],
    "name": "collectPayout",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_ssAddress",
        "type": "uint256"
      }
    ],
    "name": "confirmDeployment",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_ssAddress",
        "type": "uint256"
      },
      {
        "name": "_energyConsumed",
        "type": "uint256"
      }
    ],
    "name": "energyConsumed",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_ssAddress",
        "type": "uint256"
      },
      {
        "name": "_amountPaid",
        "type": "uint256"
      }
    ],
    "name": "makePayment",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_ssAddress",
        "type": "uint256"
      },
      {
        "name": "_payout",
        "type": "uint256"
      },
      {
        "name": "_panelSize",
        "type": "uint256"
      },
      {
        "name": "_totalValue",
        "type": "uint256"
      },
      {
        "name": "_contractor",
        "type": "address"
      },
      {
        "name": "_consumer",
        "type": "address"
      }
    ],
    "name": "proposeDeployment",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "part",
        "type": "uint256"
      },
      {
        "name": "whole",
        "type": "uint256"
      }
    ],
    "name": "getPercent",
    "outputs": [
      {
        "name": "percent",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_ssAddress",
        "type": "uint256"
      }
    ],
    "name": "getProposedDeploymentDetails",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_ssAddress",
        "type": "uint256"
      }
    ],
    "name": "getSolarSystemDetails",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "proposedDeployments",
    "outputs": [
      {
        "name": "panelSize",
        "type": "uint256"
      },
      {
        "name": "totalValue",
        "type": "uint256"
      },
      {
        "name": "contractorPayout",
        "type": "uint256"
      },
      {
        "name": "contractor",
        "type": "address"
      },
      {
        "name": "consumer",
        "type": "address"
      },
      {
        "name": "investor",
        "type": "address"
      },
      {
        "name": "isConfirmedByContractor",
        "type": "bool"
      },
      {
        "name": "isConfirmedByConsumer",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "solarSystems",
    "outputs": [
      {
        "name": "panelSize",
        "type": "uint256"
      },
      {
        "name": "totalValue",
        "type": "uint256"
      },
      {
        "name": "consumer",
        "type": "address"
      },
      {
        "name": "percentageHeld",
        "type": "uint256"
      },
      {
        "name": "lastPaymentTimestamp",
        "type": "uint256"
      },
      {
        "name": "unpaidUsage",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]

export default new web3.eth.Contract(abi, address);