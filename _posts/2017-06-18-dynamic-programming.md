---
title: 'Algorithms: Dynamic Programming'
date: 2017-06-18
permalink: /posts/2017/06/dp/
tags:
  - 中文
  - LeetCode
  - Algorithms
---

### 分治方法
1. 将问题划分成**互不相交**的子问题 
2. 递归地求解子问题
3. 将子问题的解组合起来
### 动态规划(两个要素：最优子结构、子问题重叠)
1. 应用于**子问题重叠**的情况，对于每个子问题求解一次，并将结果放在表格中
2. 通常用于求解**最优化问题**或**和问题**
3. 找出**子问题**，定义**最优子结构**=> 给出最优子结构的**递推公式** => 计算最优解（通常**Bottom-top**）

---
## [70. Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
```c++
You are climbing a stair case. It takes n steps to reach to the top.
Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
Note: Given n will be a positive integer.
```
### 斐波那契数列。子问题F(n)为到第n阶阶梯的不同走法。最优子结构：F(n) = F(n - 1) + F(n - 2)。
```c++
int climbStairs(int n) {
    if (n == 1) return 1;
    if (n == 2) return 2;
    
    int left = 1, right = 2, next = 0;
    for (int i = 3; i <= n; ++i) {
        next = left + right;
        left = right;
        right = next;
    }
    return next;
}
```
---
## [53. Maximum Subarray](https://leetcode.com/problems/maximum-subarray/#/description)
```c++
Find the contiguous subarray within an array (containing at least one number) which has the largest sum.
For example, given the array [-2,1,-3,4,-1,2,1,-5,4],
the contiguous subarray [4,-1,2,1] has the largest sum = 6.
```
### 最优化问题，通常使用DP可以解决。
1.子问题maxSubArray(int A[], i)代表[0, i]的最大子序列  
2.最优子结构maxSubArray(int[], i) = (maxSubArray(int[], i - 1) > 0 ? maxSubArray(int[], i - 1) : 0) + A[i]  
3.求解，使用Bottom-top自底向上，计算从i=0到n-1的情况
```c++
int maxSubArray(vector<int>& nums) {
    int maxSum = INT_MIN, curSum = INT_MIN;
    for (auto n:nums) {
        if (curSum > 0) curSum += n;
        else curSum = n;
        maxSum = max(maxSum, curSum); 
    }
    return maxSum;
}
```
---
## [152. Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/#/description)
```c++
Find the contiguous subarray within an array (containing at least one number) which has the largest product.
For example, given the array [2,3,-2,4],
the contiguous subarray [2,3] has the largest product = 6.
```
### 求数组中连续乘积的最大值。双向乘法，从前向后以及从后向前。子问题：curMax = max(leftProduct, rightProduct)
```c++
int maxProduct(vector<int>& nums) {
    if (nums.empty()) return 0;
    int leftProduct = 1, rightProduct = 1, curMax = INT_MIN;
    for (auto  i = 0; i < nums.size(); ++i) {
        leftProduct *= nums[i];
        rightProduct *= nums[nums.size() - 1 - i];
        
        curMax = max(curMax, max(leftProduct, rightProduct));
        if (!leftProduct) leftProduct = 1;
        if (!rightProduct) rightProduct = 1;
    }
    return curMax;
}
```
---
## [62. Unique Paths](https://leetcode.com/problems/unique-paths/#/description)
```c++
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).
The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).
How many possible unique paths are there?
```
### m行n列，从[0, 0]到[m-1, n-1]一共有多少种走法。子问题path[i][j]为到达[i,j]位置的路径数，最优子结构为：path[i][j] = path[i-1][j] + path[i][j-1]
```c++
int uniquePaths(int m, int n) {
    if (m > n) swap(m, n);
    vector<int> path(m, 1);
    for (int i = 1; i < n; ++i) 
        for (int j = 1; j < m; ++j)
            path[j] += path[j-1];
    return path.back();
}
```
---
## [63. Unique Paths II](https://leetcode.com/problems/unique-paths-ii/#/description)
```c++
Follow up for "Unique Paths":
Now consider if some obstacles are added to the grids. How many unique paths would there be?
An obstacle and empty space is marked as 1 and 0 respectively in the grid.
For example,
There is one obstacle in the middle of a 3x3 grid as illustrated below.
[
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
The total number of unique paths is 2.
Note: m and n will be at most 100.
```
* m行n列，从[0, 0]到[m-1, n-1]一共有多少种走法。其中存在障碍。子问题path[i][j]为到达[i,j]位置的路径数，最优子结构为：dp[i][j] =0，当obstacleGrid[i][j] == 1时; dp[i][j] = dp[i-1][j] + dp[i][j-1]，当当obstacleGrid[i][j] == 0时。 使用了m+1*n+1的结果矩阵来保存结果，将obstacleGrid[0][0]为0和为1的情况做了统一处理。
```c++
int minPathSum(vector<vector<int>>& grid) {
    int m = grid.size(), n = m ? grid[0].size() : 0;
    vector<vector<int>> dp(m+1, vector<int>(n+1, INT_MAX));
    dp[0][1] = 0;
    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            dp[i][j] = min(dp[i][j-1], dp[i-1][j]) + grid[i-1][j-1];
        }
    }
    return dp[m][n];
}
```
---
## [64. Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/#/description)
```c++
Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.
Note: You can only move either down or right at any point in time.
```
* 从[0, 0]到[n-1, n-1]的最短路径。
1. 子问题：到达[i,j]只有从上往下或从左往右两条路
2. 最优子结构：dp[i][j] = min(dp[i][j-1], dp[i-1][j]) + grid[i-1][j-1]
```c++
int minPathSum(vector<vector<int>>& grid) {
    int m = grid.size(), n = m ? grid[0].size() : 0;
    vector<vector<int>> dp(m+1, vector<int>(n+1, INT_MAX));
    dp[0][1] = 0;
    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            dp[i][j] = min(dp[i][j-1], dp[i-1][j]) + grid[i-1][j-1];
        }
    }
    return dp[m][n];
}
```
---
## [120. Triangle](https://leetcode.com/problems/triangle/#/description)
```c++
iven a triangle, find the minimum path sum from top to bottom. Each step you may move to adjacent numbers on the row below.

For example, given the following triangle
[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
The minimum path sum from top to bottom is 11 (i.e., 2 + 3 + 5 + 1 = 11).
```
* 到达某个点可用之前邻居的邻居，子问题有重叠。找和最小的路径，是最优化问题。子问题：sum[i][j]为从底向上，到达第i行第j列的最小路径和。最优子结构为：**sum[i][j] = min(sum[i+1][j], sum[i+1][j+1]) + triangle[i][j]**
---
```c++
int minimumTotal(vector<vector<int>>& triangle) {
    int m = triangle.size();
    if (!m) return 0;
    vector<int> sum(triangle.back());
        
    for (int i = m - 2; i >= 0; --i) {
        for (int j = 0; j <= i; ++j) {
            sum[j] = min(sum[j], sum[j+1]) + triangle[i][j];
        }
    }
    return sum[0];
}
```
---
## [96. Unique Binary Search Trees](https://leetcode.com/problems/unique-binary-search-trees/#/description)
```c++
Given n, how many structurally unique BST's (binary search trees) that store values 1...n?

For example,
Given n = 3, there are a total of 5 unique BST's.

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
```
* 求1..n直接整数构成的不同二叉搜索树的个数。
1. 子问题：G(n) = F(1, n) + F(2, n) + ... + F(n, n)且F(j, i) = G(j - 1)*G(i - j)
2. 最优子结构：res[i] = res[1-1]*res[i-1] + res[2-1]*res[i-2] + ... + res[j-1]*res[i-j] + ...+ res[i-1]*res[i-i]
其中res(n)代表1..n构成不同树的个数；F(i, n)代表根节点为i时，1..n构成不同二叉搜索树的个数
```c++
int numTrees(int n) {
    vector<int> res(n+1, 0);
    res[0] = 1;
    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= i; ++j) {
            res[i] += res[j-1]*res[i-j];
        }
    }
    return res[n];
}
```
---
## [85. Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/#/description)
```c++
Given a 2D binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.
For example, given the following matrix:
1 0 1 0 0
1 0 1 1 1
1 1 1 1 1
1 0 0 1 0
Return 6.
```
* 解析: 找出中为1的长方形的最大元素个数
* 思路：对于这种无从下手的矩阵问题肯定是一行行进行遍历，而且有很大可能是动态规划问题。
1. height[j]为某列高度，left[j]为满足该列高度的最左位置，right[j]为满足该高度的最右位置+1
2. curLeft为从左往右第一个不为0的位置，curRight为从右往左第一个不为0的位置。
3. left[j]=max(left[j], curLeft); right[j] = max(right[j], curRight);
4. res = max(res, (right[j] - left[j])*height[j]);
```c++
int maximalRectangle(vector<vector<char>>& matrix) {
    int m = matrix.size(), n = m?matrix[0].size():0;
    vector<int> left(n,0), right(n, n), height(n, 0);
    int res = 0;
    for (int i = 0; i < m; ++i) {
        int curLeft = 0;
        int curRight = n;
        for (int j = 0; j < n; ++j) {
            if (matrix[i][j] == '1') left[j] = max(left[j], curLeft);
            else {
                curLeft = j + 1;
                left[j] = 0;
            }
        }
        
        for (int j = n - 1; j >= 0; --j) {
            if (matrix[i][j] == '1') right[j] = min(right[j], curRight);
            else {
                curRight = j;
                right[j] = n;
            }
        }
        
        for (int j = 0; j < n; ++j) {
            if (matrix[i][j] == '1') height[j]++;
            else height[j] = 0;
        }
        
        for (int j = 0; j < n; ++j) {
            if (height[j]) res = max(res, (right[j] - left[j])*height[j]);
        }
    }
    return res;
}
```
---
## [121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/#/description)
* 求最大收益，只允许交易一次（此处用到了遍历的顺序，卖出必然在买入之后，所以直接求最大和最小值只差是不可以的）。
1. 子问题： maxPro[i] = max(maxPro[i-1], cur - minProce)
2. 最优子结构：maxPro = max(maxPro, prices[i] - minPrice)

## 时间复杂度：O(n)
```c++
int maxProfit(vector<int>& prices) {
    int minPrice = INT_MAX, maxPro = 0;
    for (int i = 0; i < prices.size(); ++i) {
        minPrice = min(minPrice, prices[i]);
        maxPro = max(maxPro, prices[i] - minPrice);
    }
    
    return maxPro;
}
```
---
## [123. Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/#/description)
* 思路：动态规划。这个很难想，很想121中第一种方法，主要区别是本次可以多于2次交易，第2次不能和第一次重复，所以要用lowBuyPrice1 = min(lowBuyPrice1, p - maxProfit1)，将第一次交易获得利润保存在第二次购买的价格中。又变成了单次交易最大获利。  子状态为：每次第一次获利找出最大的2次获利和，最终会找到最大获利。
1. 子问题：maxPro = max(sell1-buy1 + sell2-buy2)
2. 最优子结构： maxPro = max(maxPro, sell2 - (buy2 - maxPro1))
```c++
int maxProfit(vector<int>& prices) {
    int maxProfit1 = 0, maxProfit2 = 0;
    int lowBuyPrice1 = INT_MAX, lowBuyPrice2 = INT_MAX;
    
    for (auto p:prices) {
        lowBuyPrice1 = min(lowBuyPrice1, p);
        maxProfit1 = max(maxProfit1, p - lowBuyPrice1);
        lowBuyPrice2 = min(lowBuyPrice2, p - maxProfit1);
        maxProfit2 = max(maxProfit2, p - lowBuyPrice2);
    }
    
    return maxProfit2;
}
```
---
## [188. Best Time to Buy and Sell Stock IV](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/#/description)
* 思路：动态规划。思路和最多买卖2次的很像，区别在k>n/2时需要特殊处理，不然会溢出，k>n/2时就能取交易的最大数目，因为不需要买卖之间可以一段。
* 时间复杂度：O(kn) 空间复杂度O(k)
```c++
int maxProfit(int k, vector<int>& prices) {
    int maxProfit = 0;
    if (k < 1) return 0;
    if(prices.size()<2)
        return 0;
    if(k>prices.size()/2){
        for(int i=1; i<prices.size(); i++)
            maxProfit += max(prices[i]-prices[i-1], 0);
        return maxProfit;
    }
    vector<int> lowBuyPrice(k,INT_MAX), maxPro(k, 0);
    for (auto p:prices) {
        for (int i = 0; i < k; ++i) {
            lowBuyPrice[i] = min(lowBuyPrice[i], i == 0 ?p:p - maxPro[i-1]);
            maxPro[i] = max(maxPro[i], p - lowBuyPrice[i]);
        }
    }
    
    return maxPro.back();
}
```
---
## [95. Unique Binary Search Trees II](https://leetcode.com/problems/unique-binary-search-trees-ii/#/description)
```c++
Given an integer n, generate all structurally unique BST's (binary search trees) that store values 1...n.

For example,
Given n = 3, your program should return all 5 unique BST's shown below.

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
```
* 96题升级版，求[1,n]构成的全部平衡二叉树。
1. 子问题：G(n) = F(1, n) + F(2, n) + ... + F(n, n)且F(j, i) = G(j - 1)*G(i - j)
2. 最优子结构：res[i] = res[1-1]*res[i-1] + res[2-1]*res[i-2] + ... + res[j-1]*res[i-j] + ...+ res[i-1]*res[i-i]
* 此处使用小技巧，使用offset拷贝res[i-j]为j的右子树
```c++
class Solution {
public:
    vector<TreeNode *> generateTrees(int n) {
        if (!n) return vector<TreeNode*>();
        vector<vector<TreeNode*>> res(n+1, vector<TreeNode*>());
        res[0].push_back(NULL);
        
        for (int i = 1; i <=n; ++i) {
            for (int j = 1; j <= i; ++j) {
                for (auto l:res[j-1]) {
                    for (auto r:res[i-j]) {
                        TreeNode* node = new TreeNode(j);
                        node->left = l;
                        node->right = clone(r, j);
                        res[i].push_back(node);
                    }
                }
            }
        }
        
        return res[n];
    }
    
    TreeNode* clone(TreeNode* root, int offset){
        if(root == nullptr)
            return nullptr;
        TreeNode* newroot = new TreeNode(root->val + offset);
        newroot->left = clone(root->left, offset);
        newroot->right = clone(root->right, offset);
        return newroot;
    }
};
```
* 也可以使用分治的方法求解，子问题会重复求解。然而这俩个解的实际运行实际都是19ms，原因是动态规划的部分由于数组中保存的是指针，所以即使保存了子问题的解，仍然需要使用clone函数将子问题的解重新分配空间。
```c++
class Solution {
public:
    vector<TreeNode *> generateTrees(int n) {
        if (!n) return vector<TreeNode*>();
        return helper(1, n);
    }
    
    vector<TreeNode *> helper(int s, int e){
        vector<TreeNode*> res;
        if (s > e) {
            res.push_back(NULL);
            return res;
        }
        
        for (int i = s; i <= e; ++i) {
            auto left = helper(s, i-1);
            auto right = helper(i+1, e);
            
            for (auto l:left) {
                for (auto r:right) {  
                    TreeNode *node = new TreeNode(i);
                    node->left = l;
                    node->right = r;
                    res.push_back(node);
                }
            }
        }
        return res;
    }
};
```
---
## [91. Decode Ways](https://leetcode.com/problems/decode-ways/#/description)
```c++
A message containing letters from A-Z is being encoded to numbers using the following mapping:
'A' -> 1
'B' -> 2
...
'Z' -> 26
Given an encoded message containing digits, determine the total number of ways to decode it.
For example,
Given encoded message "12", it could be decoded as "AB" (1 2) or "L" (12).
The number of ways decoding "12" is 2.
```
* 求数字字符串解码的个数。
1. 子问题：依次遍历字符串，主要分为2种情况，当前字符不为0；当前和前一个字符构成的数字在1-26之间。
2. 最优子结构：count[i] = count[i-1]*isNotZero(s,i) + count[i-2]*isLastTwoLess26(s, i)。
```c++
int numDecodings(string s) {
    if (s.empty() || s[0] == '0') return 0;
    int first = 1, second = 1;
    for (auto i = 1; i < s.size(); ++i) {
        int tmp = 0;
        if (s[i] > '0' && s[i] <= '9')
            tmp += second;
        if ((s[i-1] == '1' && s[i] >= '0' && s[i] <= '9') || (s[i-1] == '2' && s[i] >= '0' && s[i] <= '6'))
            tmp += first;
        first = second;
        second = tmp;
    }
    return second;
}
```
---
## [89. Gray Code](https://leetcode.com/problems/gray-code/#/description)
## 生成格雷码，对于输入n，输出2^n个int。
## 最优子结构： G(n) =  B(n) XOR B(n)/2
```c++
vector<int> grayCode(int n) {
    vector<int> res;
    for (int i = 0; i < 1<<n; ++i) {
        res.push_back(i^(i>>1));
    }
    return res;
}
```
## [详解](https://discuss.leetcode.com/topic/8398/dp-solution-in-6-lines-with-explanation-f-i-n-g-i-1-g-n-i/2)。
---
## [97. Interleaving String](https://leetcode.com/problems/interleaving-string/#/description)
```c++
Given s1, s2, s3, find whether s3 is formed by the interleaving of s1 and s2.
For example,
Given:
s1 = "aabcc",
s2 = "dbbca",
When s3 = "aadbbcbcac", return true.
When s3 = "aadbbbaccc", return false.
```
* 第三个字符串是否是前两个字符串交叉拼接起来的。使用矩阵记录table[i][j]记录是否s3[i+j-1]是可以使用s1[0..i-1]、s2[0..j-1]拼接起来。注意哑变量的使用。
子问题：第三个字符串可以分割为前两个字符串的依次遍历。
最优子结构：table[i][j] = (table[i-1][j] && s1[i-1] == s3[i+j-1]) || (table[i][j-1] && s2[j-1] == s3[i+j-1])
```c++
bool isInterleave(string s1, string s2, string s3) {
    if (s3.size() != s1.size() + s2.size()) return false;
    vector<vector<bool>> table(s1.size() + 1, vector<bool>(false, s2.size() + 1));
    for (auto i = 0; i <= s1.size(); ++i) {
        for (auto j = 0; j <= s2.size(); ++j) {
            if (i == 0 && j == 0) 
                table[i][j] = true;
            else if (i == 0) 
                table[0][j] = (table[0][j-1] && s2[j-1] == s3[j-1]);
            else if (j == 0) 
                table[i][0] = (table[i-1][0] && s1[i-1] == s3[i-1]);
            else 
                table[i][j] = (table[i-1][j] && s1[i-1] == s3[i+j-1]) || (table[i][j-1] && s2[j-1] == s3[i+j-1]);
        }
    }
    return table[s1.size()][s2.size()];
}
```
---
## [72. Edit Distance](https://leetcode.com/problems/edit-distance/#/description)
```c++
Given two words word1 and word2, find the minimum number of steps required to convert word1 to word2. (each operation is counted as 1 step.)
You have the following 3 operations permitted on a word:
a) Insert a character
b) Delete a character
c) Replace a character
```
* 求最短的编辑距离。[详解](https://discuss.leetcode.com/topic/17639/20ms-detailed-explained-c-solutions-o-n-space)
1. dp[i][j]代表word1[0..i-1]和word2[0..j-1]的最小编辑距离，大小为(m+1)*(n+1)
2. 最优子结构的递推公式
```c++
dp[i][0] = i;
dp[0][j] = j;
dp[i][j] = dp[i - 1][j - 1], if word1[i - 1] = word2[j - 1];
dp[i][j] = min(dp[i - 1][j - 1] + 1, dp[i - 1][j] + 1, dp[i][j - 1] + 1), otherwise.
```
```c++
int minDistance(string word1, string word2) {
    int m = word1.size(), n = word2.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
    for (int i = 1; i <= m; ++i) dp[i][0] = i;
    for (int j = 1; j <= n; ++j) dp[0][j] = j;
    
    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (word1[i-1] == word2[j-1]) dp[i][j] = dp[i-1][j-1];
            else {
                dp[i][j] = min(dp[i-1][j-1], min(dp[i][j-1], dp[i-1][j])) + 1;
            }
        }
    }
    return dp[m][n];
}
```
* 拓展：该题目和经典的LCS（最长公共子串）很像，都是通过保存大小为(m+1)*(n+1)的dp二维数组进行运算。
```c++
dp[i,j] = 0                             \\若i = 0 或 j = 0
dp[i,j] = dp[i-1, j-1] + 1              \\若word1[i] = word2[j]
dp[i,j] = max(dp[i][j-1], dp[i-1][j])   \\若word1[i] != word2[j]
```
```c++
int lcs(string word1, string word2) {
    int m = word1.size(), n = word2.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
    for (int i = 1; i <= m; ++i) dp[i][0] = 0;
    for (int j = 1; j <= n; ++j) dp[0][j] = 0;
    
    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (word1[i-1] == word2[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
            else {
                dp[i][j] = max(dp[i][j-1], dp[i-1][j]);
            }
        }
    }
    return dp[m][n];
}
```
---
## [139. Word Break](https://leetcode.com/problems/word-break/#/description)
```c++
Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, determine if s can be segmented into a space-separated sequence of one or more dictionary words. You may assume the dictionary does not contain duplicate words.

For example, given
s = "leetcode",
dict = ["leet", "code"].

Return true because "leetcode" can be segmented as "leet code".
```
* 求字符串是否可以使用词典中词分割。1. 子问题：dp[i]代表s[0..i-1]是否能分割 2. 最优子结构递推公式： 对应j[0, i]，若存在dp[j] && 字典中存在s[j..i-1]， dp[i]为true。
```c++
bool wordBreak(string s, vector<string>& wordDict) {
    // dp[i]代表s[0..i-1]是否可分割
    unordered_set<string> dict;
    for (auto word:wordDict) dict.insert(word);
    
    auto m = s.size();
    vector<bool> dp(m+1,false);
    dp[0] = true;
    for (int i = 1; i <= m; ++i) {
        for (int j = 0; j < i; ++j) {
            if (dp[j] && dict.find(s.substr(j, i - j)) != dict.end()) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[m];
}
```
---
## [140. Word Break II](https://leetcode.com/problems/word-break-ii/#/description)
```c++
Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, add spaces in s to construct a sentence where each word is a valid dictionary word. You may assume the dictionary does not contain duplicate words.
Return all such possible sentences.
For example, given
s = "catsanddog",
dict = ["cat", "cats", "and", "sand", "dog"].
A solution is ["cats and dog", "cat sand dog"].
```
* 如果采用139题中使用的方法，记录每个循环可用的会导致内存不足的问题。使用下面的方式可用解决该问题，本质上是BFS和DFS的区别。
1. 子问题：wordBreak(s)为s对应的可以分割的情况。wordBreak(s) = wordBreak(left) + wordBreak(right)  
2. 最优子结构递推公式： wordBreak(s) = wordBreak(left) + wordBreak(right)
```c++
class Solution {
public:
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        if (m.count(s)) return m[s];
        
        vector<string> res;
        if (find(wordDict.begin(), wordDict.end(), s) != wordDict.end()) 
            res.push_back(s);
        for (auto i = 1; i < s.size(); ++i) {
            string left = s.substr(0, i);
            if (find(wordDict.begin(), wordDict.end(), left) != wordDict.end()) {
                string right = s.substr(i);
                vector<string> rest = wordBreak(right, wordDict);
                for (auto &word:rest) {
                    word = left + " " + word;
                }
                res.insert(res.end(), rest.begin(), rest.end());
            }
        }
        m[s] = res;
        return res;
    }
private:
    unordered_map<string, vector<string>> m;
};
```
---
## [87. Scramble String](https://leetcode.com/problems/scramble-string/#/description)
```c++
Given a string s1, we may represent it as a binary tree by partitioning it to two non-empty substrings recursively.
Below is one possible representation of s1 = "great":
    great
   /    \
  gr    eat
 / \    /  \
g   r  e   at
           / \
          a   t
To scramble the string, we may choose any non-leaf node and swap its two children.
For example, if we choose the node "gr" and swap its two children, it produces a scrambled string "rgeat".
    rgeat
   /    \
  rg    eat
 / \    /  \
r   g  e   at
           / \
          a   t
We say that "rgeat" is a scrambled string of "great".
Similarly, if we continue to swap the children of nodes "eat" and "at", it produces a scrambled string "rgtae".
    rgtae
   /    \
  rg    tae
 / \    /  \
r   g  ta  e
       / \
      t   a
We say that "rgtae" is a scrambled string of "great".
```
* 字符串某个点为轴交互字符串两边，递归的进行上述操作可以得到的字符串为Scramble字符串。
1. 子问题：isScramble(s1, s2) = pivot(1) || pivot(2) || ... || pivot(i) || ... || pivot(n-1)
2. 最优子结构：pivot(i) = isScramble(s1[0..i-1], s2[i..n-1]) && isScramble(s1[i..n-1], s2[i..n-1]) || isScramble(s1[0..i-1], s2[n-i..n-1]) && isScramble(s1[i..n-1], s2[0..n-1-i])。即是两个字符串左右对应或交叉对应。
```c++
bool isScramble(string s1, string s2) {
    if (s1 == s2) return true;
    string s1_tmp = s1;
    string s2_tmp = s2;
    std::sort(s1_tmp.begin(), s1_tmp.end());
    std::sort(s2_tmp.begin(), s2_tmp.end());
    
    if (s1_tmp != s2_tmp) return false;
    
    for (int i = 1; i < s1.size(); ++i) {
        if (isScramble(s1.substr(0, i), s2.substr(0, i)) && isScramble(s1.substr(i), s2.substr(i))) return true;
        if (isScramble(s1.substr(0, i), s2.substr(s1.size() - i)) && isScramble(s1.substr(i), s2.substr(0, s1.size() - i))) return true;
    }
    return false;
}
```
---
## [115. Distinct Subsequences](https://leetcode.com/problems/distinct-subsequences/#/description)
```c++
Given a string S and a string T, count the number of distinct subsequences of T in S.
A subsequence of a string is a new string which is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, "ACE" is a subsequence of "ABCDE" while "AEC" is not).
Here is an example:
S = "rabbbit", T = "rabbit"
Return 3.
```
* 删除某些字符构成不同的为目标子串的个数。
1. 子问题：table[i][j]中保存S[0..j-1]包含T[0..i-1]个不同的子串。
2. 最优子结构：如果S[j] == T[i]，则table[i][j] = table[i-1][j-1] + table[i][j-1]。（之前有的+各短一个字母的S和T）。
```c++
int numDistinct(string s, string t) {
    vector<vector<int>> table(t.size()+1, vector<int>(s.size()+1, 0));
    for (auto j = 0; j < s.size(); ++j) table[0][j] = 1;
    
    for (int i = 1; i <= t.size(); ++i) {
        for (int j = 1; j <= s.size(); ++j) {
            if (s[j-1] == t[i-1]) 
                table[i][j] = table[i][j-1] + table[i-1][j-1];
            else
                table[i][j] = table[i][j-1];
        }
    }
    return table[t.size()][s.size()];
}
```
---
## [132. Palindrome Partitioning II](https://leetcode.com/problems/palindrome-partitioning-ii/#/description)
```c++
Given a string s, partition s such that every substring of the partition is a palindrome.
Return the minimum cuts needed for a palindrome partitioning of s.
For example, given s = "aab",
Return 1 since the palindrome partitioning ["aa","b"] could be produced using 1 cut.
```
* 求将字符串分割成回文子串的最小割。dp[i]代表s[0:i)的最小回文割树。
1. i为中点，j为一半的长度。
2. 最优子结构：如果s[i:j)构成回文，则dp[j] = min(dp[j], dp[i] + 1)
```c++
int minCut(string s) {
    auto m = s.size();
    vector<int> dp(m+1, 0);
    for (auto i = 0; i <= m; ++i) {
        dp[i] = i - 1;
    }
    
    for (auto i = 0; i < m; ++i) {
        for (auto j = 0; i-j >= 0 && i+j < m && s[i-j] == s[i+j]; ++j)
            dp[i+j+1] = min(dp[i+j+1], dp[i-j] + 1);
        for (auto j = 1; i-j+1 >=0 && i+j < m && s[i-j+1] == s[i+j]; ++j)
            dp[i+j+1] = min(dp[i+j+1], dp[i-j+1] + 1);
    }
    
    return dp[m];
}
```
