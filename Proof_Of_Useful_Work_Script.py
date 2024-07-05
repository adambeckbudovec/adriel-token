import hashlib
import requests

def useful_work_adriel(miner_address, task_data, difficulty):
    # Simulate performing a useful computational task
    task_result = hashlib.sha256(task_data.encode()).hexdigest()
    
    # Assume task_result needs to meet certain difficulty criteria
    prefix = '0' * difficulty
    if task_result.startswith(prefix):
        return task_result
    else:
        return None

if __name__ == '__main__':
    miner_address = 'YOUR_MINER_ADDRESS'  # Replace with the miner's address
    task_data = 'some useful task data'  # Replace with actual task data
    difficulty = 5  # Adjust the difficulty as needed
    amount = 100  # Reward amount (adjust as needed)

    print('Performing useful work for Adriel token...')
    task_result = useful_work_adriel(miner_address, task_data, difficulty)
    if task_result:
        print(f'Task Result: {task_result}')

        # Submit the task result to the backend service
        response = requests.post('http://localhost:3000/submit_pouw', json={
            'miner': miner_address,
            'taskResult': task_result,
            'amount': amount
        })
        print(response.json())
    else:
        print('Task result did not meet the required difficulty.')
