export interface HarshadResult {
    sequence: number[];
    stats: {
        count: number;
        digitSums: number[];
        primes: number[];
        average: number;
    };
}

export class HarshadGenerator {
    isHarshad(n: number): boolean {
        const digitSum = String(n)
            .split('')
            .reduce((acc, d) => acc + parseInt(d, 10), 0);
        return n % digitSum === 0;
    }

    generate(start: number, count: number): HarshadResult {
        const sequence: number[] = [];
        let num = start + 1;
        
        while (sequence.length < count) {
            if (this.isHarshad(num)) {
                sequence.push(num);
            }
            num++;
        }
        
        const digitSums = sequence.map(n => 
            String(n).split('').reduce((a, d) => a + parseInt(d, 10), 0)
        );
        
        const primes = sequence.filter(n => this.isPrime(n));
        
        return {
            sequence,
            stats: {
                count: sequence.length,
                digitSums,
                primes,
                average: sequence.reduce((a, b) => a + b, 0) / sequence.length
            }
        };
    }

    private isPrime(n: number): boolean {
        if (n < 2) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
        }
        return true;
    }
}

// Usage example
const generator = new HarshadGenerator();
const result = generator.generate(10, 10);
console.log(result);
