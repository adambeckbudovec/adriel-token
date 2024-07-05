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
    miner_address = 'YOUR_MINER_ADDRESS' # Replace with the miner's address
    difficulty = 5  # Adjust the difficulty as needed
    amount = 100  # Reward amount (adjust as needed)

    print('Mining Adriel token...')
    nonce, hash_result = mine_adriel(miner_address, difficulty)
    print(f'Nonce: {nonce}')
    print(f'Hash: {hash_result}')

    # Submit the proof to the backend service
    response = requests.post('http://your-backend-api/submit_pow', json={
        'miner': miner_address,
        'nonce': nonce,
        'amount': amount
    })
    print(response.json())
