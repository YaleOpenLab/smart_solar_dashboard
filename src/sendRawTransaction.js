import web3 from './Web3';
import Tx from 'ethereumjs-tx';


const sendRawTransaction = async(addressFrom, addressTo, privateKey, value, data, cb) => {

	try {

		let txCount = await web3.eth.getTransactionCount(addressFrom)
		const privateKey = Buffer.from(privateKey, 'hex')
		const txParams = {
		  nonce: web3.utils.toHex(txCount),
		  gasPrice: '0x09184e72a000', 
		  gasLimit: '0x2710',
		  to: addressTo, 
		  value: value, 
		  data: data,
		  chainId: 3 //ropsten
		}
		const tx = new Tx(txParams)
		tx.sign(privateKey)
		const serializedTx = tx.serialize()
		web3.eth.sendSignedTransaction('0x' + serializedTx, cb)

	}catch(err) {

		console.log("Err:", err)

	}
}

export default sendSignedTransaction;
