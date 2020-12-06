// Read the accompanying notes

// memoization
// we'l use a fast access data structure to store computed values so that we
// don't have to do the cal again.
//     js object, keys will be arg to fn, value will be return value

const fib = (n, memo = {}) => {
    if (n in memo) return memo[n];
    if (n <= 2) return 1;
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
};

console.log(fib(6)); // 8
console.log(fib(7)); // 13
console.log(fib(8)); // 21
console.log(fib(50)); // 12586269025