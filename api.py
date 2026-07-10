from flask import Flask, jsonify, request
from flask_cors import CORS
import math

app = Flask(__name__)
CORS(app)

def is_harshad(n):
    digit_sum = sum(int(d) for d in str(n))
    return n % digit_sum == 0

def get_harshad_sequence(start, count):
    result = []
    num = start + 1
    while len(result) < count:
        if is_harshad(num):
            result.append(num)
        num += 1
    return result

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True

@app.route('/api/sequence', methods=['GET'])
def sequence():
    start = int(request.args.get('start', 10))
    count = int(request.args.get('count', 10))
    seq = get_harshad_sequence(start, count)
    
    return jsonify({
        'sequence': seq,
        'stats': {
            'count': len(seq),
            'sums': [sum(int(d) for d in str(n)) for n in seq],
            'primes': [n for n in seq if is_prime(n)]
        }
    })

@app.route('/api/validate', methods=['POST'])
def validate():
    data = request.get_json()
    num = data.get('number')
    if num is None:
        return jsonify({'error': 'Missing number'}), 400
    
    digit_sum = sum(int(d) for d in str(num))
    is_harshad = num % digit_sum == 0
    
    return jsonify({
        'number': num,
        'digit_sum': digit_sum,
        'is_harshad': is_harshad,
        'formula': f'{num} % {digit_sum} = {num % digit_sum}'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
