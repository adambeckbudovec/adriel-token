import requests

def human_work_adriel(miner_address, amount):
    work_valid = True

    if work_valid:
        response = requests.post('http://localhost:3000/submit_pohw', json={
            'miner': miner_address,
            'amount': amount
        })
        print(response.json())

if __name__ == '__main__':
    miner_address = 'YOUR_MINER_ADDRESS' # Replace with the miner's address
    amount = 100  # Reward amount (adjust as needed)

    print('Performing human work for Adriel token...')
    human_work_adriel(miner_address, amount)
