class HarshadVisualizer {
  constructor() {
    this.sequence = [];
    this.init();
  }

  init() {
    this.bindEvents();
    this.generateParticles();
    this.loadDefaultCode();
  }

  bindEvents() {
    const btn = document.getElementById("generateBtn");
    btn.addEventListener("click", () => this.generate());

    const startInput = document.getElementById("startNum");
    const countInput = document.getElementById("count");

    startInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.generate();
    });
    countInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.generate();
    });

    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => this.switchTab(btn));
    });

    this.generate();
  }

  isHarshad(num) {
    const sum = String(num)
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit), 0);
    return num % sum === 0;
  }

  generateSequence(start, count) {
    const results = [];
    let num = start + 1;

    while (results.length < count) {
      if (this.isHarshad(num)) {
        results.push(num);
      }
      num++;
    }
    return results;
  }

  generate() {
    const start = parseInt(document.getElementById("startNum").value) || 0;
    const count = parseInt(document.getElementById("count").value) || 10;

    this.sequence = this.generateSequence(start, count);
    this.displaySequence();
    this.updateStats();
    this.drawChart();
  }

  displaySequence() {
    const container = document.getElementById("sequenceDisplay");
    if (this.sequence.length === 0) {
      container.innerHTML = '<span class="placeholder">No numbers found</span>';
      return;
    }

    container.innerHTML = this.sequence
      .map((num) => `<span class="number-chip">${num}</span>`)
      .join("");
  }

  updateStats() {
    if (this.sequence.length === 0) return;

    const first = this.sequence[0];
    const sumDigits = String(first)
      .split("")
      .reduce((acc, d) => acc + parseInt(d), 0);

    document.getElementById("sumDigits").textContent = sumDigits;
    document.getElementById("divisibility").textContent =
      first % sumDigits === 0 ? "✅ Divisible" : "❌ Not Divisible";

    const primes = this.sequence.filter((num) => this.isPrime(num));
    document.getElementById(
      "primeCount"
    ).textContent = `${primes.length} / ${this.sequence.length}`;
  }

  isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }

  drawChart() {
    const canvas = document.getElementById("distributionChart");
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (this.sequence.length === 0) {
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.font = "20px Inter";
      ctx.textAlign = "center";
      ctx.fillText("No data to visualize", width / 2, height / 2);
      return;
    }

    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const maxVal = Math.max(...this.sequence);
    const barWidth = Math.min((chartWidth / this.sequence.length) * 0.6, 50);
    const spacing = chartWidth / this.sequence.length;

    // Draw grid
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + chartHeight - (i / 5) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw bars
    this.sequence.forEach((num, index) => {
      const x = padding + index * spacing + (spacing - barWidth) / 2;
      const barHeight = (num / maxVal) * chartHeight;
      const y = padding + chartHeight - barHeight;

      const gradient = ctx.createLinearGradient(x, y, x, padding + chartHeight);
      gradient.addColorStop(0, "#6C63FF");
      gradient.addColorStop(1, "#FF6584");

      ctx.fillStyle = gradient;
      ctx.shadowColor = "rgba(108, 99, 255, 0.3)";
      ctx.shadowBlur = 10;

      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, 4);
      ctx.fill();

      ctx.shadowBlur = 0;

      // Value label
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "12px Inter";
      ctx.textAlign = "center";
      ctx.fillText(num, x + barWidth / 2, y - 8);
    });
  }

  switchTab(btn) {
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const lang = btn.dataset.lang;
    this.displayCode(lang);
  }

  displayCode(lang) {
    const codes = {
      js: `function isHarshad(n) {\n  const sum = String(n)\n    .split('')\n    .reduce((a, d) => a + parseInt(d), 0);\n  return n % sum === 0;\n}\n\nfunction getHarshadSequence(start, count) {\n  const result = [];\n  let num = start + 1;\n  while (result.length < count) {\n    if (isHarshad(num)) result.push(num);\n    num++;\n  }\n  return result;\n}`,

      py: `def is_harshad(n):\n    digit_sum = sum(int(d) for d in str(n))\n    return n % digit_sum == 0\n\ndef get_harshad_sequence(start, count):\n    result = []\n    num = start + 1\n    while len(result) < count:\n        if is_harshad(num):\n            result.append(num)\n        num += 1\n    return result`,

      ts: `function isHarshad(n: number): boolean {\n  const sum = String(n)\n    .split('')\n    .reduce((a, d) => a + parseInt(d), 0);\n  return n % sum === 0;\n}\n\nfunction getHarshadSequence(\n  start: number, \n  count: number\n): number[] {\n  const result: number[] = [];\n  let num = start + 1;\n  while (result.length < count) {\n    if (isHarshad(num)) result.push(num);\n    num++;\n  }\n  return result;\n}`,

      java: `public class Harshad {\n    public static boolean isHarshad(int n) {\n        int sum = 0;\n        int temp = n;\n        while (temp > 0) {\n            sum += temp % 10;\n            temp /= 10;\n        }\n        return n % sum == 0;\n    }\n    \n    public static int[] getSequence(int start, int count) {\n        int[] result = new int[count];\n        int num = start + 1;\n        int idx = 0;\n        while (idx < count) {\n            if (isHarshad(num)) {\n                result[idx++] = num;\n            }\n            num++;\n        }\n        return result;\n    }\n}`
    };

    document.getElementById("codeContent").textContent =
      codes[lang] || codes.js;
  }

  loadDefaultCode() {
    this.displayCode("js");
  }

  generateParticles() {
    const bg = document.getElementById("particleBg");
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.style.cssText = `
                position: absolute;
                width: ${2 + Math.random() * 4}px;
                height: ${2 + Math.random() * 4}px;
                background: ${Math.random() > 0.5 ? "#6C63FF" : "#FF6584"};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${0.1 + Math.random() * 0.3};
                animation: float ${
                  5 + Math.random() * 10
                }s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
      bg.appendChild(particle);
    }

    const style = document.createElement("style");
    style.textContent = `
            @keyframes float {
                0%, 100% { transform: translate(0, 0) scale(1); }
                25% { transform: translate(${Math.random() * 30 - 15}px, ${
      Math.random() * 30 - 15
    }px) scale(1.2); }
                50% { transform: translate(${Math.random() * 30 - 15}px, ${
      Math.random() * 30 - 15
    }px) scale(0.8); }
                75% { transform: translate(${Math.random() * 30 - 15}px, ${
      Math.random() * 30 - 15
    }px) scale(1.1); }
            }
        `;
    document.head.appendChild(style);
  }
}

// Polyfill roundRect if needed
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (r > w / 2) r = w / 2;
    if (r > h / 2) r = h / 2;
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    return this;
  };
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  new HarshadVisualizer();
});
