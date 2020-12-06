# Introduction to Dynamic Programming

## Complexity

Learn about both `time complexity` and `space complexity`. Time complexity can be said to be number of calls the fn is called or CPU units are consumed to get the result and space complexity is the amount of memory the algorithm takes - this can be in the stack for a browser (js).

1. Simple O(n)

    ```js
    const foo = (n) => {
        if(n <= 1) return;
        foo(n - 1);
    }
    ```

    This fn has a O(n) complexity. And a O(n) space complexity. 

    ```
    foo(5)
    5 -> 4 -> 3 -> 2 -> 1
    ```

2. Another O(n)

    ```js
    const bar = (n) => {
        if(n <= 1) return;
        bar(n - 2);
    }
    ```

    Here the fn ends in lesser time than the first one. It ends in half the amount of time.

    ```
    bar(5)
    5 -> 3 -> 1
    bar(6)
    6 -> 4 -> 2
    ```

    So the time complexity if O(n/2) and the space complexity is again O(n/2). Space complexity for js can be said the stack trace. Here we are recursing n/2 times and each of these parent recursion are stored in memort/ stack. So it's O(n/2).

    Since for calculating complexity we can omit constants our time and space complexity becomes O(n).

3. Two recursive calls

    ```js
    const dib = (n) => {
        if(n <= 1) return;
        dib(n - 1);
        dib(n - 1);
    }
    ```

    Here we are branching into two nodes for each recursion.

    ```
    dib(5)

    5
    |
    └─── 4
    |    |
    |    └─── 3
    |    |    |
    |    |    └─── 2 
    |    |    |    |
    |    |    |    └─── 1 
    |    |    |    └─── 1 
    |    |    └─── 2 
    |    |         |
    |    |         └─── 1 
    |    |         └─── 1 
    |    └─── 3
    |         |
    |         └─── 2 
    |         |    |
    |         |    └─── 1 
    |         |    └─── 1 
    |         └─── 2 
    |              |
    |              └─── 1 
    |              └─── 1
    └─── 4
        |
        └─── 3
        |    |
        |    └─── 2 
        |    |    |
        |    |    └─── 1 
        |    |    └─── 1 
        |    └─── 2 
        |         |
        |         └─── 1 
        |         └─── 1 
        └─── 3
             |
             └─── 2 
             |    |
             |    └─── 1 
             |    └─── 1 
             └─── 2 
                  |
                  └─── 1 
                  └─── 1
    ```

    Here as you can see the time complexity is O(2^n).

    But the space complexity isn't straight forward.This fn is calling the fun itself (recursive) but these are two different statements. So only after `dib(n - 1);` returns do we call the next `dib(n - 1);`. So if you go down the tree only after we hit 1 do we return and only then `dib(2)`'s second `dib(n - 1);` is called. At this time we've already reutrned 1 from the first call. So stack trace pop'ed. So now you can see that at a moment in time we are only having a max stack of 5. So the space complexity is o(n).

    Time complexity is O(2^n) and Space complexity is O(n)

4. Same as previous but with /2

    ```js
    const lib = (n) => {
        if(n <= 1) return;
        lib(n - 2);
        lib(n - 2);
    }
    ```

    Not gonna grow the graph. But here's the solution.

    Time complexity is O(2^n / 2) which simplifies to O(2^n) and Space complexity is O(n/2) which simplifies to O(n)

5. Fib recursive calls

    ```js
    const fib = (n) => {
        if (n <= 2) return 1;
        return fib(n - 1) + fib(n - 2);
    };
    ```

    Here you can see the first recursive call is (n - 1) which we calculated to be of O(n) time complexity and the second one with O(n/2) which simplifies to O(n). And we also calculated when there are called twice which is O(2^n). So `fib` should be between `dib` and `lib`

    ```js
    O(dib) <= O(fib) <= O(lib)
    O(2^n) <= O(2^n) <= O(2^n)
    ```

    Okay, so our fib fn has a time complexity of O(2^n) and space complexity O(n)

## Fib complexity

We found our regular fib fn has a O(2^n) complexity. Which is a very bad complexity. So we should do better.

```js
    const fib = (n) => {
        if (n <= 2) return 1;
        return fib(n - 1) + fib(n - 2);
    };
```

To break down our problem and make it working lets look at fib(7)

```
fib(7)

7
|
└─── 5
|    |
|    └─── 3
|    |    |
|    |    └─── 1  
|    |    └─── 2
|    └─── 4
|         |
|         └─── 2
|         └─── 3 
|              |
|              └─── 1 
|              └─── 2
└─── 6
    |
    └─── 4
    |    |
    |    └─── 2
    |    └─── 3 
    |         |
    |         └─── 1 
    |         └─── 2 
    └─── 5
            |
            └─── 3 
            |    |
            |    └─── 1 
            |    └─── 2 
            └─── 4
                 |
                 └─── 2
                 └─── 3 
                      |
                      └─── 1 
                      └─── 2
```

The subtree `3 -> 2 and -> 1` is duplicate same for subtree 4 and subtree 5. So there are a lot of duplicate subtrees. So if I calculate `fib(5)` I shouldn't need to calcaulate it the second time, which would save a lot of CPU cycles.

So what do I do?

I should be reusing duplicate calculations. This pattern of overlapping sub problems is known as `dynamic programming`.

## Dynamic Programming

Any instance where we have a larger problem which can be decomposed to smaller instances of the same problem.

## Optimizing Fib

We understood we shouldn't recalculating what we already calculated. So we need a quick accessable dictionary or hash map or object to save computed data and fetch it instantly. So let's modify the fn to do that

```js
const fib = (n, memo = {}) => {
    if (n in memo) return memo[n];
    if (n <= 2) return 1;
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
};
```

It is self explanatory. In python one could even used a `@lru` LRU cache here. Just saying.

With this our time complexity was brought down from `O(2^n)` to `O(n)`.