const express = require('express');
const Web3 = require('web3');
const { abi } = require('./AdrielToken.json');

const app = express();
app.use(express.json());

const web3 = new Web3('http://localhost:8545'); // Local network URL
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your deployed contract address
const contract = new web3.eth.Contract(abi, contractAddress);
const ownerAddress = 'YOUR_OWNER_ADDRESS'; // Replace with the owner's address from Ganache
const privateKey = 'YOUR_PRIVATE_KEY'; // Replace with the owner's private key from Ganache

app.post('/submit_poc', async (req, res) => {
    const { miner, amount } = req.body;

    // Validate proof of contribution (implement your logic)
    if (validateContribution(miner)) {
        const tx = contract.methods.minePoC(miner, amount);
        await sendTransaction(tx, res);
    } else {
        res.status(400).json({ success: false, error: 'Invalid contribution' });
    }
});

app.post('/submit_pohw', async (req, res) => {
    const { miner, amount } = req.body;

    // Validate proof of human work (implement your logic)
    if (validateHumanWork(miner)) {
        const tx = contract.methods.minePoHW(miner, amount);
        await sendTransaction(tx, res);
    } else {
        res.status(400).json({ success: false, error: 'Invalid human work' });
    }
});

app.post('/submit_pouw', async (req, res) => {
    const { miner, taskResult, amount } = req.body;

    // Validate proof of useful work
    const isValid = validateUsefulWork(miner, taskResult);
    if (isValid) {
        const tx = contract.methods.minePoUW(miner, amount);
        await sendTransaction(tx, res);
    } else {
        res.status(400).json({ success: false, error: 'Invalid useful work' });
    }
});

const sendTransaction = async (tx, res) => {
    try {
        const gas = await tx.estimateGas({ from: ownerAddress });
        const gasPrice = await web3.eth.getGasPrice();
        const data = tx.encodeABI();
        const nonceVal = await web3.eth.getTransactionCount(ownerAddress);

        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: contract.options.address,
                data,
                gas,
                gasPrice,
                nonce: nonceVal,
                chainId: 61 // Ethereum Classic chain ID
            },
            privateKey
        );

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        res.json({ success: true, receipt });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const validateContribution = (miner) => {
    // Implement your contribution validation logic
    return true;
};

const validateHumanWork = (miner) => {
    // Implement your human work validation logic
    return true;
};

const validateUsefulWork = (miner, taskResult) => {
    // Implement your useful work validation logic (e.g., checking results of computational tasks)
    return t
