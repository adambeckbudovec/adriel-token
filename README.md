# Adirel-Token
![alt text](https://github.com/adambeckbudovec/adirel-token/blob/main/AdrielCOIN.jpg)
Certainly! Below is a summary for your `README.md` file for the Adriel Token project, which includes all the updated details about the token, its purpose, and the various mining methods.

```markdown
# Adriel Token

Adriel Token (ADRL) is a cryptocurrency built on the Ethereum Classic (ETC) blockchain. The primary mission of Adriel Token is to combat human trafficking across the globe. This project combines multiple mining methods to engage a diverse range of participants, from those with computational resources to those willing to contribute through useful or human-verifiable work.

## Overview

- **Token Name**: Adriel Token
- **Token Symbol**: ADRL
- **Initial Supply**: 27.9 million ADRL (representing the estimated number of people currently being human trafficked)
- **Blockchain**: Ethereum Classic (ETC)
- **Purpose**: To fight human trafficking through multiple forms of mining and community engagement.

## Mining Methods

Adriel Token supports four mining methods to accommodate various types of contributions:

### 1. Proof of Work (PoW)

Traditional mining method where miners solve cryptographic puzzles.

- **Endpoint**: `/submit_pow`
- **Validation**: Miners must submit a valid nonce that solves a cryptographic puzzle.
- **Reward**: ADRL tokens

### 2. Proof of Contribution (PoC)

Users contribute computational power to AI systems that combat human trafficking.

- **Endpoint**: `/submit_poc`
- **Validation**: Miners contribute to AI computational tasks.
- **Reward**: ADRL tokens

### 3. Proof of Human Work (PoHW)

Users perform human-verifiable tasks, such as data labeling or participating in awareness campaigns.

- **Endpoint**: `/submit_pohw`
- **Validation**: Miners complete human-verifiable tasks.
- **Reward**: ADRL tokens

### 4. Proof of Useful Work (PoUW)

Users perform computational tasks with intrinsic value, such as scientific research or data analysis.

- **Endpoint**: `/submit_pouw`
- **Validation**: Miners perform useful computational tasks.
- **Reward**: ADRL tokens

## Smart Contract

The smart contract manages the minting and distribution of ADRL tokens based on validated contributions.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AdrielToken is ERC20, Ownable {
    mapping(address => uint256) public nonces;

    event Mined(address indexed miner, uint256 amount, string method);
    event Donated(address indexed from, address indexed to, uint256 amount);

    constructor() ERC20("AdrielToken", "ADRL") {
        uint256 initialSupply = 27900000 * 10 ** decimals();
        _mint(msg.sender, initialSupply);
    }

    function minePoW(address miner, uint256 nonce, uint256 amount) public onlyOwner {
        require(isValidProof(miner, nonce), "Invalid proof of work");
        nonces[miner] = nonce;
        _mint(miner, amount);
        emit Mined(miner, amount, "PoW");
    }

    function minePoC(address miner, uint256 amount) public onlyOwner {
        _mint(miner, amount);
        emit Mined(miner, amount, "PoC");
    }

    function minePoHW(address miner, uint256 amount) public onlyOwner {
        _mint(miner, amount);
        emit Mined(miner, amount, "PoHW");
    }

    function minePoUW(address miner, uint256 amount) public onlyOwner {
        _mint(miner, amount);
        emit Mined(miner, amount, "PoUW");
    }

    function donate(address from, address to, uint256 amount) public {
        _transfer(from, to, amount);
        emit Donated(from, to, amount);
    }

    function isValidProof(address miner, uint256 nonce) internal view returns (bool) {
        bytes32 hash = keccak256(abi.encodePacked(miner, nonce));
        return uint256(hash) < target();
    }

    function target() internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked("adriel"))) >> 8; // Adjust difficulty as needed
    }
}
```

## Backend Service

The backend service validates contributions and interacts with the smart contract to mint tokens.

### Endpoints

- **POST /submit_pow**: Submit proof of work
- **POST /submit_poc**: Submit proof of contribution
- **POST /submit_pohw**: Submit proof of human work
- **POST /submit_pouw**: Submit proof of useful work

### Example Request

```json
{
    "miner": "YOUR_MINER_ADDRESS",
    "nonce": 123456,
    "amount": 100
}
```

### Example Response

```json
{
    "success": true,
    "receipt": {
        "transactionHash": "0x..."
    }
}
```

## Mining and Contribution Scripts

### Proof of Work Mining Script (Python)

```python
import hashlib
import requests

def mine_adriel(miner_address, difficulty):
    prefix = '0' * difficulty
    nonce = 0
    while True:
        text = f'{miner_address}{nonce}'.encode()
        hash_result = hashlib.sha256(text).hexdigest()
        if hash_result.startswith(prefix):
            return nonce, hash_result
        nonce += 1

if __name__ == '__main__':
    miner_address = 'YOUR_MINER_ADDRESS'
    difficulty = 5
    amount = 100

    print('Mining Adriel token...')
    nonce, hash_result = mine_adriel(miner_address, difficulty)
    print(f'Nonce: {nonce}')
    print(f'Hash: {hash_result}')

    response = requests.post('http://your-backend-api/submit_pow', json={
        'miner': miner_address,
        'nonce': nonce,
        'amount': amount
    })
    print(response.json())
```

### Proof of Contribution Script (Python)

```python
import requests

def contribute_adriel(miner_address, amount):
    contribution_valid = True

    if contribution_valid:
        response = requests.post('http://your-backend-api/submit_poc', json={
            'miner': miner_address,
            'amount': amount
        })
        print(response.json())

if __name__ == '__main__':
    miner_address = 'YOUR_MINER_ADDRESS'
    amount = 100

    print('Contributing to Adriel token...')
    contribute_adriel(miner_address, amount)
```

### Proof of Human Work Script (Python)

```python
import requests

def human_work_adriel(miner_address, amount):
    work_valid = True

    if work_valid:
        response = requests.post('http://your-backend-api/submit_pohw', json={
            'miner': miner_address,
            'amount': amount
        })
        print(response.json())

if __name__ == '__main__':
    miner_address = 'YOUR_MINER_ADDRESS'
    amount = 100

    print('Performing human work for Adriel token...')
    human_work_adriel(miner_address, amount)
```

### Proof of Useful Work Script (Python)

```python
import requests

def useful_work_adriel(miner_address, amount):
    work_valid = True

    if work_valid:
        response = requests.post('http://your-backend-api/submit_pouw', json={
            'miner': miner_address,
            'amount': amount
        })
        print(response.json())

if __name__ == '__main__':
    miner_address = 'YOUR_MINER_ADDRESS'
    amount = 100

    print('Performing useful work for Adriel token...')
    useful_work_adriel(miner_address, amount)
```
