const express = require('express');
const Web3 = require('web3');
const { abi } = require('./AdrielToken.json');

const app = express();
app.use(express.json());

const web3 = new Web3('https://etc.your-node-provider.com'); // Replace with your Ethereum Classic node provider
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your deployed contract address
const contract = new web3.eth.Contract(abi, contractAddress);
const ownerAddress = 'YOUR_OWNER_ADDRESS'; // Replace with the owner's address
const privateKey = 'YOUR_PRIVATE_KEY'; // Replace with the owner's private key

app.post('/submit_proof', async (req, res) => {
    const { nonce, hash } = req.body;

    // Validate proof (pseudo-code)
    const isValid = validateProof(nonce, hash); // Implement your proof validation logic
    if (isValid) {
        const amount = 100; // Reward amount (adjust as needed)
        const tx = contract.methods.mine(nonce, amount);
        const gas = await tx.estimateGas({ from: ownerAddress });
        const gasPrice = await web3.eth.getGasPrice();
        const data = tx.encodeABI();
        const nonce = await web3.eth.getTransactionCount(ownerAddress);

        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: contract.options.address,
                data,
                gas,
                gasPrice,
                nonce,
                chainId: 61 // Ethereum Classic chain ID
            },
            privateKey
        );

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        res.json({ success: true, receipt });
    } else {
        res.status(400).json({ success: false, error: 'Invalid proof' });
    }
});

const validateProof = (nonce, hash) => {
    const prefix = '0'.repeat(5); // Adjust the difficulty
    const hashResult = hashlib.sha256(f'{nonce}'.encode()).hexdigest();
    return hashResult.startswith(prefix);
};

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
