const Web3 = require('web3');
const { abi, bytecode } = require('./AdrielToken.json');

const web3 = new Web3('https://etc.your-node-provider.com'); // Replace with your Ethereum Classic node provider

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    const initialSupply = web3.utils.toWei('1000000', 'ether'); // 1 million ADRL tokens

    const contract = new web3.eth.Contract(abi);
    const deployedContract = await contract.deploy({
        data: bytecode,
        arguments: [initialSupply]
    }).send({
        from: accounts[0],
        gas: 1500000,
        gasPrice: '3000000000' // Set gas price to a reasonable level
    });

    console.log('Contract deployed at address:', deployedContract.options.address);
};

deploy();
