---
title: 'Algorithms: Hash Table'
date: 2017-05-17
permalink: /posts/2017/05/hash-table/
tags:
  - 中文
  - LeetCode
  - Algorithms
---

# 概述
- 要对每种基础数据结构有深刻的理解。主要应对设计题：
- HashTable： 增、删、查都是O(1)，但是是无序的
- vector: 增(尾部增O(1)、其他O(n))、删(尾部删O(1)、其他O(n))、查(O(n)),可以有序可以无序
- list: 增、删(头尾O(1)、其他O(n))、查(O(n))

# 题目
## [1. Two Sum](https://leetcode.com/problems/two-sum/)
```c++
Given an array of integers, return indices of the two numbers such that they add up to a specific target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
Example:
Given nums = [2, 7, 11, 15], target = 9,
Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
```
### 使用Hash Table保存遍历过的元素，从而达到降低时间复杂度到O(n)。利用到的技巧：1. 边遍历边加入Hash Table中。 2. 在Hash Table中找差值
```c++
vector<int> twoSum(vector<int>& nums, int target) {
    vector<int> res;
    unordered_map<int, int> dict;
    for (int i = 0; i < nums.size(); ++i) {
        int toGet = target - nums[i];
        if (dict.find(toGet) != dict.end()) {
            res.push_back(dict[toGet]);
            res.push_back(i);
            return res;
        }
        dict[nums[i]] = i;
    }
    return res;
}
```

## [36. Valid Sudoku](https://leetcode.com/problems/valid-sudoku/)
Determine if a Sudoku is valid, according to: Sudoku Puzzles - The Rules.
The Sudoku board could be partially filled, where empty cells are filled with the character '.'.
A partially filled sudoku which is valid.
```c++
Input:
[
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
Output: true
```
### 数独是否可解，数独的三个条件 1. 行不重复 2. 列不重复 3. 3*3子矩阵不重复。使用数组做词典来比较。
```c++
bool isValidSudoku(vector<vector<char>>& board) {
    int row[9][9] = {0}, column[9][9] = {0}, subBox[9][9] = {0};
    
    for (int i = 0; i < board.size(); ++i) {
        for (int j = 0; j < board[0].size(); ++j) {
            if (board[i][j] != '.') {
                int num = board[i][j] - '0' - 1;
                int sub = i/3*3 + j/3;
                if (row[i][num] || column[j][num] || subBox[sub][num]) return false;
                row[i][num] = column[j][num] = subBox[sub][num] = 1;
            }
        }
    }
    
    return true;
}
```

## [146. LRU Cache](https://leetcode.com/problems/lru-cache)
### 实现LRU，即优先抛弃最近未命中
### 使用list保存key值新命中的放前面，unordered_map保存key value对应的对，unordered_map保存key 位置对应的对。
```c++
class LRUCache {
public:
    LRUCache(int capacity) {
        cap = capacity;
    }
    
    int get(int key) {
        if (key2value.find(key) != key2value.end()) {
            update_key(key);            
            return key2value[key];
        } else {
            return -1;
        }
    }
    
    void update_key(key) {
        if(key2value.find(key2loc[key]) != key2value.end()){
            keys.erase(key2loc[key]);
        }
        keys.push_front(key);
        key2loc[key] = keys.begin();
    }

    void put(int key, int value) {
        if (key2value.find(key) != key2value.end()) {
                key2value[key] = value;                
                update_key(key);
        } else { 
            if (keys.size() == cap) {
                    key2value.erase(key2value.find(keys.back()));
                    key2loc.erase(key2loc.find(keys.back()));
                    keys.pop_back();
                    
                    update_key(key);
            } else {
                keys.push_front(key);
                update_key(key);
            }
        }
   }
private:
    unordered_map<int, int> key2value;
    unordered_map<int, list<int>::iterator> key2loc; 
    list<int> keys;
    int cap;
};
```

### [30. Substring with Concatenation of All Words](https://leetcode.com/problems/substring-with-concatenation-of-all-words/)
### 所有字符串拼接出来的起始位置。 注意：有可能字符串有可能重复，所以使用map保存其出现次数。for循环的步长为1， 结束条件为剩余长度为n-1。
```
Input:
  s = "barfoothefoobarman",
  words = ["foo","bar"]
Output: [0,9]
Explanation: Substrings starting at index 0 and 9 are "barfoor" and "foobar" respectively.
The output order does not matter, returning [9,0] is fine too.
```
```c++
vector<int> findSubstring(string s, vector<string>& words) {
    int m = words.size(), n = m?words[0].size():0;
    vector<int> res;
    if (!m || !n || s.size() < m*n) return res;
    
    unordered_map<string, int> words_count;
    for (auto word:words) words_count[word]++;
    
    for (int i = 0; i <= s.size() - n; ++i) {
        bool flag = true;
        unordered_map<string, int> tmp = words_count;
        for (int j = 0; j < m; ++j) {
            if (tmp[s.substr(i + j*n, n)]-- == 0) {
                flag = false;
                break;
            }
        }
        
        for (auto it = tmp.begin(); it != tmp.end(); ++it) {
            if (it -> second != 0) {
                flag = false;
                break;
            }
        }
        
        if (flag) {
            res.push_back(i);
        } 
    }
    
    return res;
}

```

### [128. Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)
### 最大连续序列。使用Hash table记录数组中数值，遍历数组如果数值是新的开始，则遍历该数值能到达的长序列。得到的最大值就是结果。
```
Input: [100, 4, 200, 1, 3, 2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
```
```c++
int longestConsecutive(vector<int>& nums) {
    set<int> nums_set;
    for (int i = 0; i < nums.size(); ++i) {
        nums_set.insert(nums[i]);
    }
    
    int longest = 0;
    for (set<int>::iterator it = nums_set.begin(); it != nums_set.end(); ++it) {
        if (nums_set.find(*it-1) == nums_set.end()) {
            int cur = *it;
            while (nums_set.find(cur + 1) != nums_set.end()) {
                cur++;
            }
            
            longest = max(longest, cur - *it + 1);
        }
    }
    return longest;
}
```