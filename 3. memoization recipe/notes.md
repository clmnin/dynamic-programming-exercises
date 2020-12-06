# How to approach to solve a memoization problem

1. Make it work
    First find a solution that may not be efficient. It can be brute forced. 

    * visualize the problem as a tree
    * implement the tree using recursion
    * test it

2. Make it efficient
    Once a working code is ready, find the complexity of the problem and try to find sub problems the problem creates.

    Now try to write a solution that reduces the repleated calculation the program does.

    * add a memo object
    * add a base case to return memo values
    * store return values into the memo object