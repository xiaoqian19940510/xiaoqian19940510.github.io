---
title: 'Algorithms: Backtracking'
date: 2017-07-08
permalink: /posts/2017/07/backtracking/
tags:
  - 中文
  - LeetCode
  - Algorithms
---

### 遍历全部情况
1. 定义解空间，包含全部解
2. 利用深度优先搜索解空间
3. Trial，减枝。（避免访问不可能产生解的子空间）
* 而**根据条件有选择的遍历**，叫做剪枝或分枝定界。

### 主要分为两种情况：
1. 宽度不定，解空间大小通常为2^m（排列问题的解空间是n!阶乘形）。该类题目通常为，cur的长度不定的题目。如39、40、78等。
> 总规模为 1 + m + (m-1+m-2+...+1) + (m-2+m-3+...+1) + ... + 1 = 2^m
每层节点个数不一样，越来越少。
```c++
void helper(输入，int depth，vector<vector<xxx>> &res, vector<xxx> &cur) {
    if (满足条件) { 
        res.push_back(cur);
        return;
    }
    for (auto i = depth; i < m; ++i) { 
        //3. 减枝条件
        if (满足条件) { 
            cur.push_back(xxx);
            helper(输入，i+1，结束条件更新，res, cur);
            cur.pop_back();
        }
    }
}
```
2. 宽度固定。
> 每次递归的规模都是一样的，所以***总规模***为**m+m^2+m^3+...+m^k**。此时宽度为m，深度为k。最后一层规模为m^k，该层结果加入结果集中。
指数级增长，1+m+m^2+m^3+...+m^k
```c++
void helper(输入，int depth，结束条件, vector<vector<xxx>> &res, vector<xxx> &cur) {
    // 1. DFS到达解空间底部
    if (depth == 解空间深度) { 
        res.push_back(cur);
        return;
    }
    // 2. 宽度
    for (auto i = 0; i < m; ++i) { 
        //3. 减枝条件
        if (满足条件) { 
            cur.push_back(xxx);
            helper(输入，depth + 1，结束条件更新，res, cur);
            cur.pop_back();
        }
    }
}
```
---
## [39. Combination Sum](https://leetcode.com/problems/combination-sum/#/description)
```c++
Given a set of candidate numbers (C) (without duplicates) and a target number (T), find all unique combinations in C where the candidate numbers sums to T.
The same repeated number may be chosen from C unlimited number of times.
Note:
All numbers (including target) will be positive integers.
The solution set must not contain duplicate combinations.
For example, given candidate set [2, 3, 6, 7] and target 7, 
A solution set is: 
[
  [7],
  [2, 2, 3]
]
```
* 候选集合中选取数字，其和为目标值，同一元素可以重复出现。
* 解空间： 深度不定， 宽度为candidates.size() - lastIndex。
* 减枝： 和小于等于target
```c++
vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
    vector<vector<int>> res;
    vector<int> cur;
    helper(candidates, target, 0, res, cur);
    return res;
}
void helper(vector<int>& candidates, int target, int index, vector<vector<int>> &res, vector<int> &cur) {
    if (!target) {
        res.push_back(cur);
        return;
    } 
    
    for (int i = index; i < candidates.size(); ++i) {
        if (candidates[i] <= target) {
            cur.push_back(candidates[i]);
            helper(candidates, target - candidates[i], i, res, cur);
            cur.pop_back();
        }
    }
}
```
---
## [40. Combination Sum II](https://leetcode.com/problems/combination-sum-ii/#/description)
```c++
Given a collection of candidate numbers (C) and a target number (T), find all unique combinations in C where the candidate numbers sums to T.
Each number in C may only be used once in the combination.
Note:
All numbers (including target) will be positive integers.
The solution set must not contain duplicate combinations.
For example, given candidate set [10, 1, 2, 7, 6, 1, 5] and target 8, 
A solution set is: 
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]
```
* 候选集合中选取数字，其和为目标值，同一元素不可重复出现。不可重复，所以递归函数调用下一个，同时完成递归后将指针移动到与当前元素值不同的位置。
* 解空间：2^m。深度最大为m， 宽度为candidates.size() - lastIndex - 1。
* 减枝条件： 和小于等于target。
```c++
vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
    std::sort(candidates.begin(), candidates.end());
    vector<vector<int>> res;
    vector<int> cur;
    helper(candidates, target, 0, res, cur);
    return res;
}
void helper(vector<int> &candidates, int target, int index, vector<vector<int>> &res, vector<int> &cur) {
    if (target == 0) {
        res.push_back(cur);
        return;
    }
    
    for (int i = index; i < candidates.size(); ++i) {
        if (candidates[i] <= target) {
            cur.push_back(candidates[i]);
            helper(candidates, target - candidates[i], i + 1, res, cur);
            cur.pop_back();
        }
        while (i + 1 < candidates.size() && candidates[i] == candidates[i+1]) ++i;
    }
}
```
---
## [216. Combination Sum III](https://leetcode.com/problems/combination-sum-iii/#/description)
```c++
Find all possible combinations of k numbers that add up to a number n, given that only numbers from 1 to 9 can be used and each combination should be a unique set of numbers.
```
* 从1-9任取k次，和为n的情况。不可重复。
* 解空间：2^m。深度最大为m， 宽度为candidates.size() - lastIndex - 1。
* 减枝条件： 和小于等于target。
```c++
class curution {
public:
  vector<vector<int>> combinationSum3(int k, int n) {
    vector<vector<int>> result;
    vector<int> cur;
    combination(result, cur, k, n);
    return result;
  }  
  
  void combination(vector<vector<int>>& result, vector<int> cur, int k, int n) {
    if (cur.size() == k && n == 0) { result.push_back(cur); return ; }
    if (cur.size() < k) {
      for (int i = cur.empty() ? 1 : cur.back() + 1; i <= 9; ++i) {
        if (n - i < 0) break;
        cur.push_back(i);
        combination(result, cur, k, n - i);
        cur.pop_back();
      }
    }
  }
};
```
---
## [78. Subsets](https://leetcode.com/problems/subsets/#/description)
```c++
Given a set of distinct integers, nums, return all possible subsets.
Note: The solution set must not contain duplicate subsets.
For example,
If nums = [1,2,3], a solution is:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
```
* 求int数组的子集。
* 解空间：总大小2^m, m为子集大小。宽度不定型
* 减枝：无
```c++
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        vector<int> cur;
        helper(nums, 0, res, cur);
        return res;
    }
    
    void helper(vector<int> &nums, int depth, vector<vector<int>> &res, vector<int> &cur) {
        res.push_back(cur);
        for (int i = depth; i < nums.size(); ++i) {
            cur.push_back(nums[i]);
            helper(nums, i+1, res, cur);
            cur.pop_back();
        }
    }
};
// 迭代
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> subs(1, vector<int>());
        for (int i = 0; i < nums.size(); i++) {
            int n = subs.size();
            for (int j = 0; j < n; j++) {
                subs.push_back(subs[j]); 
                subs.back().push_back(nums[i]);
            }
        }
        return subs;
    }
}; 
// Bit Manipulation
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int num_subset = pow(2, nums.size()); 
        vector<vector<int> > res(num_subset, vector<int>());
        for (int i = 0; i < nums.size(); i++)
            for (int j = 0; j < num_subset; j++)
                if ((j >> i) & 1)
                    res[j].push_back(nums[i]);
        return res;  
    }
};
```
---
## [90. Subsets II](https://leetcode.com/problems/subsets-ii/#/description)
```c++
Given a collection of integers that might contain duplicates, nums, return all possible subsets.
Note: The solution set must not contain duplicate subsets.
For example,
If nums = [1,2,2], a solution is:
[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]
```
* 求int数组的子集。
* 解空间：总大小2^m, m为子集大小。宽度不定型
* 减枝：i == depth || nums[i] != nums[i-1]
```c++
class Solution {
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        std::sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        vector<int> cur;
        helper(nums, 0, res, cur);
        return res;
    }
    
    void helper(vector<int> &nums, int depth, vector<vector<int>> &res, vector<int> &cur) {
        res.push_back(cur);
        for (int i = depth; i != nums.size(); ++i) { 
            if (i == depth || nums[i] != nums[i-1]) {
                cur.push_back(nums[i]);
                helper(nums, i+1, res, cur);
                cur.pop_back();
            }
        }
    }
};
```
---
## [131. Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/#/description)
```c++
Given a string s, partition s such that every substring of the partition is a palindrome.
Return all possible palindrome partitioning of s.
For example, given s = "aab",
Return
[
  ["aa","b"],
  ["a","a","b"]
]
```
* 求字符串分割为回文子串的全部情况。
1. 迭代，遍历给定字符串从起始位置到终止，每个位置代表s.substr(index, i - index + 1)。若该子串为回文，则该子串加入cur中，并递归找出去除该子串之后位置的回文。
2. 递归，递归函数结束条件为起始位置=字符串长度

* 解空间： 2^n, n为字符串长度
* 减枝：s[index, i]为回文
```c++
vector<vector<string>> partition(string s) {
    vector<vector<string>> res;
    vector<string> cur;
    palindrome(s, 0, res, cur);
    return res;
}
void palindrome(string s, int index, vector<vector<string>> &res, vector<string> &cur) {
    if (index == s.size()) {
        res.push_back(cur);
        return;
    }
    
    for (auto i = index; i < s.size(); ++i) {
        auto left = index, right = i;
        while (left < right && s[left] == s[right]) {
            left++;
            right--;
        }
        if (left>=right) {
            cur.push_back(s.substr(index, i - index + 1));
            palindrome(s, i + 1, res, cur);
            cur.pop_back();
        }
    }
}
```
---
## [46. Permutations](https://leetcode.com/problems/permutations/#/description)
```c++
Given a collection of distinct numbers, return all possible permutations.

For example,
[1,2,3] have the following permutations:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```
* 求全排列n！。
* 解空间：n!
* 减枝：无
```c++
class Solution {
public:
	// 解空间：n!
	vector<vector<int>> permute(vector<int>& nums) {
		vector<vector<int>> res;
		vector<int> cur;
		queue<int> input;
		for (int n : nums) input.push(n);
		helper(input, res, cur);
		return res;
	}

	void helper(queue<int> &input,vector<vector<int>> &res, vector<int> &cur) {
		if (input.size() == 0) {
			res.push_back(cur);
			return;
		}
		auto flag = input.size();
		for (auto i = 0; i != flag; ++i) {
			auto element = input.front();
			cur.push_back(element);
			input.pop();
			helper(input, res, cur);
			input.push(element);
			cur.pop_back();
		}
	}
};
```
---
## [47. Permutations II](https://leetcode.com/problems/permutations-ii/#/description)
```c++
Given a collection of numbers that might contain duplicates, return all possible unique permutations.

For example,
[1,1,2] have the following unique permutations:
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]
```
* 数组中存在重复元素，求数组的全排列。
* 解空间：n！
* 减枝：i==0 || (i > 0 && element != last)
```c++
class Solution {
public:
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        std::sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        vector<int> cur;
        queue<int> input;
        for (auto n:nums) input.push(n);
        
        helper(input, res, cur);
        return res;
    }
    
    void helper(queue<int> &input, vector<vector<int>> &res, vector<int> &cur) {
        if (input.empty()) {
            res.push_back(cur);
            return;
        }
        
        auto flag = input.size();
        auto last = -1;
        for (auto i = 0; i < flag; ++i) {
            auto element = input.front();
            input.pop();
            if (i==0 || (i > 0 && element != last)) {
                cur.push_back(element);
                helper(input, res, cur);
                cur.pop_back();
            }
            input.push(element);
            last = element;
        }
    }
};
```
---
## [93. Restore IP Addresses](https://leetcode.com/problems/restore-ip-addresses/#/description)
```c++
Given a string containing only digits, restore it by returning all possible valid IP address combinations.

For example:
Given "25525511135",

return ["255.255.11.135", "255.255.111.35"]. (Order does not matter)
```
* 求数字序列构成ip地址的可能情况。
* 解空间：3^m，m为字符串长度
* 减枝：tmpInt < 256 && to_string(tmpInt).size() == tmp.size() && divides < 4
```c++
class Solution {
public:
	vector<string> restoreIpAddresses(string s) {
		vector<string> res;
		string cur;
		helper(s, 0, res, cur);
		return res;
	}

	void helper(string s, int divides, vector<string> &res, string &cur) {
		if (divides == 4 && s.size() == 0) {
			res.push_back(cur.substr(0, cur.size() - 1));
			return;
		}

		for (int i = 1; i <= 3 && i <= s.size(); ++i) {
			string tmp = s.substr(0, i);
			int tmpInt = stoi(tmp);
			if (tmpInt < 256 && to_string(tmpInt).size() == tmp.size() && divides < 4) {
				cur += (tmp + '\.');
				helper(s.substr(i), divides+1, res, cur);
				cur = cur.substr(0, cur.size() - i - 1);
			}
		}		
	}
};
```
---
## [79. Word Search](https://leetcode.com/problems/word-search/)
```c++
Given a 2D board and a word, find if the word exists in the grid.

The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.

For example,
Given board =

[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]
word = "ABCCED", -> returns true,
word = "SEE", -> returns true,
word = "ABCB", -> returns false.
```
* 在字符矩阵中找某个字符串是否存在，可以水平或垂直移动，4个方向。
* 时间复杂度：O(n!)
* 解空间：m*n*(4^k)， m*n为board大小， k为单词长度
* DFS：迭代规模为m*n，递归深度为k。
* 减枝：4个方向的字符为当前字符
```c++
bool exist(vector<vector<char>>& board, string word) {
	for (int i = 0; i < board.size(); ++i) {
		for (int j = 0; j < board[0].size(); ++j) {
			if (search(board, i, j, word, 0)) return true;
		}
	}
	return false;
}

bool search(vector<vector<char>> &board, int i, int j, string &word, int begin) {
	if (i >= 0 && i < board.size() && j >= 0 && j < board[0].size() && board[i][j] == word[begin]) {
		if (begin == word.size() - 1) return true;
		
		char t = board[i][j];
	    board[i][j] = '\0';
		if (search(board, i - 1, j, word, begin + 1)||search(board, i + 1, j, word, begin + 1)||search(board, i, j - 1, word, begin + 1)||search(board, i, j + 1, word, begin + 1))
		    return true;
		board[i][j] = t;
		return false;
	}
	else {
		return false;
	}
}
```
---
## [77. Combinations](https://leetcode.com/problems/combinations/#/description)
```c++
Given two integers n and k, return all possible combinations of k numbers out of 1 ... n.
For example,
If n = 4 and k = 2, a solution is:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
```
* 返回给定的全部组合数目
* 解空间： n^k
* 减枝：前面的小于后面的。
```c++
vector<vector<int>> combine(int n, int k) {
    vector<vector<int>> res;
    vector<int> cur;
    helper(n, 1, k, res, cur);
    return res;
}
void helper(int n, int index, int k, vector<vector<int>> &res, vector<int> &cur) {
    if (k == 0) {
        res.push_back(cur);
        return;
    }
    
    for (int i = index; i <= n - k + 1; ++i) {
        cur.push_back(i);
        helper(n, i + 1, k - 1, res, cur);
        cur.pop_back();
    }
}
```
---
## [22. Generate Parentheses](https://leetcode.com/problems/generate-parentheses/#/description)
```c++
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
For example, given n = 3, a solution set is:
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
```
* 生成合法括号序列。
* 解空间：2^n。n个位置，去左括号或右括号
* 减枝：1. 左括号个数小于n时，可以添加左括号。2. 左括号多于右括号时，可以添加右括号。
```c++
vector<string> generateParenthesis(int n) {
    vector<string> res;
    string cur;
    helper(n, n, res, cur);
    return res;
}
void helper(int left, int right, vector<string> &res, string &cur) {
    if (!left && !right) {
        res.push_back(cur);
        return;
    }
    
    if (left > 0) {
        cur.push_back('(');
        helper(left - 1, right, res, cur);
        cur.pop_back();
    }
    
    if (left < right) {
        cur.push_back(')');
        helper(left, right - 1, res, cur);
        cur.pop_back();
    }
}
```
---
## [37. Sudoku Solver](https://leetcode.com/problems/sudoku-solver/#/description)
```c++
Write a program to solve a Sudoku puzzle by filling the empty cells.
Empty cells are indicated by the character '.'.
You may assume that there will be only one unique solution.
```
* 数独求解，行、列、3*3box中都不能有重复值。
* 解空间：9^m。
* 减枝：尝试插入数值，满足行、列、3*3box中都不能有重复值。
```c++
class Solution {
public:
    void solveSudoku(vector<vector<char>>& board) {
        solve(board, 0);
    }
    
	bool solve(vector<vector<char>>& board, int cur) {		
		while (cur < 81 && board[cur / 9][cur%9] != '.') cur++; 
		if (cur == 81) return true;
		int i = cur / 9, j = cur%9;
		for (auto c = '1'; c <= '9'; ++c) {
			if (isValid(board, i, j, c)) {
				board[i][j] = c;
				if (solve(board, cur + 1))
					return true;
				else
					board[i][j] = '.';
			}
		}

		return false;
	}
    
    bool isValid(vector<vector<char>> &board, int i, int j, char c) {
        for (int k = 0; k < 9; ++k) {
            if (board[i][k] == c) return false;
            if (board[k][j] == c) return false;
            if (board[3*(i/3)+k/3][3*(j/3)+k%3] == c) return false;
        }
        return true;
    }
};
```
---
## [51. N-Queens](https://leetcode.com/problems/n-queens/#/description)
* n皇后问题。
* 解空间：n^n。
* 减枝：皇后不能在同一行、同一列、45度角（行差=列差）。
```c++
class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res;
        vector<string> cur;
        vector<int> occupied;
        helper(n, occupied, res, cur);
        cout << res.size() << endl;
        return res;
    }
    
    void helper(int n, vector<int> &occupied, vector<vector<string>> &res, vector<string> &cur) {
        if (occupied.size() == n) {
            res.push_back(cur);
            return;
        }
        
        for (int i = 0; i < n; i++) {
            string tmp(n, '.');
            if (isSafe(occupied, i, occupied.size())) {
                tmp[i] = 'Q';
                cur.push_back(tmp);
                occupied.push_back(i);
                helper(n, occupied, res, cur);
                cur.pop_back();
                occupied.pop_back();
            } 
        }
    }
    
    bool isSafe(vector<int> &occupied, int trial, int loc) {
        for (auto i = 0; i < occupied.size(); ++i) {
            if (occupied[i] == trial || abs(trial - occupied[i]) == abs(loc - i))
                return false;
        }
        return true;
    }
};
```
---
## [52. N-Queens II](https://leetcode.com/problems/n-queens-ii/#/description)
* n皇后解的个数。
* 解空间：n^n。
* 减枝：皇后不能在同一行、同一列、45度角（行差=列差）。
```c++
class Solution {
public:
    int totalNQueens(int n) {
        int res = 0;
        vector<int> occupied;
        helper(n, 0, occupied, res);
        return res;
    }
    
    void helper(int n, int depth, vector<int> &occupied, int &res) {
        if (depth == n) {
            res++;
            return;
        }
        
        for (int i = 0; i < n; i++) {
            if (isSafe(occupied, i, occupied.size())) {
                occupied.push_back(i);
                helper(n, depth + 1, occupied, res);
                occupied.pop_back();
            } 
        }
    }
    
    bool isSafe(vector<int> &occupied, int trial, int loc) {
        for (auto i = 0; i < occupied.size(); ++i) {
            if (occupied[i] == trial || abs(trial - occupied[i]) == abs(loc - i))
                return false;
        }
        return true;
    }
};
```
---
## [17. Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/#/description)
* 9键键盘数字序列对应的所有字母序列的。
* 解空间： 4^n，n为数字序列的长度。
* 减枝： 无
```c++
vector<string> letterCombinations(string digits) {
	static const vector<string> digit2letter = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
	vector<string> res;
	getHits(digits, digit2letter, 0, res, "");
	return res;
}
void getHits(string digits, vector<string> digit2letter, int pos, vector<string> &res, string cur) {
	if (pos == digits.size()) {
		if (cur.size()) res.push_back(cur);
		return;
	}
	string hits = digit2letter[digits[pos] - '0'];
	for (int i = 0; i < hits.size(); ++i) {
		cur.push_back(hits[i]);
		getHits(digits, digit2letter, pos + 1, res, cur);
		cur.pop_back();
	}
}
```
---
## [526. Beautiful Arrangement](https://leetcode.com/problems/beautiful-arrangement/#/description)
* 解析: 1-N构成数组，满足ith整除i或者i整除ith。注意，这是要求全部满足。
* 边界：为空
* 思路：输入长度N，每次起始位置不变全部为1，中间结果（深度，即构成第i个），与顺序有关。
* 时间复杂度：O(n!)
```c++
int countArrangement(int N) {
    int res = 0;
    vector<int> used(N+1,0);
    arrange(used, res, depth);
    return res;
}

void arrange(vector<int> used, int &res, int depth) {
    for (int i = 1; i < used.size(); ++i) {
        if (used[i] == 0 && (used[i] % depth == 0 || depth % used[i] == 0)) {
            used[i] = 1;
            arrange(used, res, depth + 1);
            used[i] = 0;
        }
    }
}

```
---
## [357. Count Numbers with Unique Digits](https://leetcode.com/problems/count-numbers-with-unique-digits/#/description)
* 解析: [0,10^N)的范围内整数中，每位完全不重复的整数个数
* 边界：为空
* 思路：0特殊处理，不能用来做首位。total = 1 ，处理了前面几位是0的情况。 
* 时间复杂度：O(n!)
```c++
int countNumbersWithUniqueDigits(int n) {
	vector<int> occur(10, 0);
	return count(occur, n, 0);
}

int count(vector<int> occur, int n, int d) {
	if (n == d) {
		return 1;
	}
	int total = 1;
	for (int i = (d == 0) ? 1 : 0; i < occur.size(); ++i) {
		if (!occur[i]) {
			occur[i] = 1;
			total += count(occur, n, d + 1);
			occur[i] = 0;
		}
	}
	return total;
}
```