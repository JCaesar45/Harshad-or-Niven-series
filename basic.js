function isHarshadOrNiven(n) {
  const res = [];
  let num = n + 1;
  
  // Function to check if a number is a Harshad number
  function isHarshad(number) {
    const sumOfDigits = String(number)
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit), 0);
    return number % sumOfDigits === 0;
  }
  
  // Find the first 10 Harshad numbers greater than n
  while (res.length < 10) {
    if (isHarshad(num)) {
      res.push(num);
    }
    num++;
  }
  
  return res;
}
