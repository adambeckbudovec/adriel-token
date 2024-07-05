import hashlib
import time
import requests

def mine_adriel(difficulty):
    prefix = '0' * difficulty
    nonce = 0
    while True:
        text = f'{nonce}'.encode()
        hash_result = hashlib.sha256(text).hexdigest()
        if hash_result.startswith(prefix):
            return nonce, hash_result
        nonce += 1

if __name__ == '__main__':
    difficulty = 5  # Adjust the difficulty as needed
    print('Mining Adriel token...')
    nonce, hash_result = mine_adriel(difficulty)
    print(f'Nonce: {nonce}')
    print(f'Hash: {hash_result}')

    # Submit the proof to the blockchain (pseudo-code)
    response = requests.post('http://your-backend-api/submit_proof', json={
        'nonce': nonce,
        'hash': hash_result
    })
    print(response.json())
