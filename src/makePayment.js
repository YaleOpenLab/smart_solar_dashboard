import sendRawTransaction from './sendRawTransaction';

const makePayment = (addressFrom, privateKey, value, _ssAddress, _amountPaid) => {
	let methodHex = 'makePayment'
	sendRawTransaction(addressFrom, '0xa9f9fa6c881ef37865a85063ffa03cf4de992b16', privateKey, value, )
}

export default makePayment