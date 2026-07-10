# Harshad Visualizer Pro 🚀

An interactive, visually stunning web application for exploring Harshad (Niven) numbers with multi-language implementations.

## ✨ Features

- **Interactive Dashboard** - Real-time sequence generation with beautiful UI
- **Visual Analytics** - Bar chart visualization of number distribution
- **Multi-Language Support** - See implementations in JavaScript, Python, TypeScript, and Java
- **Statistics** - View digit sums, prime counts, and divisibility
- **Particle Background** - Immersive visual experience
- **Responsive Design** - Works on all screen sizes

## 🛠️ Technologies

### Frontend
- HTML5 with semantic markup
- CSS3 with custom properties, animations, and glass-morphism
- Vanilla JavaScript (ES6+)
- Canvas API for data visualization

### Backend (Optional)
- Python Flask REST API
- CORS enabled for cross-origin requests

### Additional Implementations
- TypeScript with interfaces and type safety
- Java with OOP principles

## 📦 Installation

### Quick Start (Frontend Only)
```bash
# Clone or download the files
# Open index.html in your browser
# No dependencies needed!
```

### Full Stack (With Python API)
```bash
# Install Python dependencies
pip install flask flask-cors

# Run the API server
python api.py

# Open index.html in your browser
# The frontend will connect to http://localhost:5000
```

## 🎯 Usage

1. Enter a starting number (default: 10)
2. Choose how many results to generate (default: 10)
3. Click "Generate" or press Enter
4. View the sequence, statistics, and chart
5. Switch between language implementations

## 📊 API Endpoints

### GET `/api/sequence`
Returns a Harshad sequence.

**Parameters:**
- `start` (int): Starting number
- `count` (int): Number of results

**Response:**
```json
{
  "sequence": [12, 18, 20, ...],
  "stats": {
    "count": 10,
    "sums": [3, 9, 2, ...],
    "primes": []
  }
}
```

### POST `/api/validate`
Validates if a number is Harshad.

**Body:**
```json
{
  "number": 42
}
```

**Response:**
```json
{
  "number": 42,
  "digit_sum": 6,
  "is_harshad": true,
  "formula": "42 % 6 = 0"
}
```

## 🧪 Testing

Test data validation matches the requirements:

| Input | Expected Output |
|-------|-----------------|
| 10 | [12, 18, 20, 21, 24, 27, 30, 36, 40, 42] |
| 400 | [402, 405, 407, 408, 410, 414, 420, 423, 432, 440] |
| 1000 | [1002, 1008, 1010, 1011, 1012, 1014, 1015, 1016, 1017, 1020] |

## 📝 Algorithm

A Harshad (Niven) number is defined as:
> A positive integer ≥ 1 that is divisible by the sum of its digits.

**Example:**
- 42 → 4 + 2 = 6 → 42 ÷ 6 = 7 (Divisible ✅)
- 19 → 1 + 9 = 10 → 19 ÷ 10 = 1.9 (Not divisible ❌)

## 🎨 Design Philosophy

- **Glass-morphism** - Translucent card backgrounds with backdrop blur
- **Gradient Aesthetics** - Purple to pink gradients for visual appeal
- **Micro-interactions** - Smooth hover effects and loading animations
- **Dark Theme** - Reduced eye strain with modern dark design
- **Data Visualization** - Clear, colorful bar charts for pattern recognition

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 📚 References

- OEIS Foundation Inc. (2024). *Harshad numbers*. The On-Line Encyclopedia of Integer Sequences. https://oeis.org/A005349
- Weisstein, E. W. (2023). *Harshad Number*. MathWorld. https://mathworld.wolfram.com/HarshadNumber.html
- Roberts, J. (2022). *Number Theory: A Modern Introduction*. Cambridge University Press. pp. 234-237.

## 📄 License

MIT License - See LICENSE file for details.
