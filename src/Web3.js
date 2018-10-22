import Web3 from 'web3';

const isMetaMaskEnabled = () => !!window.web3;
const web3 = new Web3();

if (!isMetaMaskEnabled()) {
  	console.log('MetaMask is not enabled.');
  	web3.setProvider(new Web3.providers.HttpProvider('https://ropsten.infura.io/gnNuNKvHFmjf9xkJ0StE'))
} else {
	console.log('MetaMask is enabled.');
	web3.setProvider(window.web3.currentProvider);
}

export default web3;