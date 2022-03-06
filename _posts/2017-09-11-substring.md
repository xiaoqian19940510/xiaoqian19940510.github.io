---
title: 'Algorithms: Substring'
date: 2017-09-11
permalink: /posts/2017/08/substring/
tags:
  - 中文
  - LeetCode
  - Algorithms
---

### 字串问题有个通用的滑动窗口算法，时间复杂度$O(n^2)$
### 其中关键：

* 窗口大小不固定：构造合适的count来控制窗口的滑动。
* 窗口大小固定：使用left、right控制窗口移动。
* 使用HashTable控制记录字符出现情况。（不在t中字符，或者已出现的应该<= 0，在t中的字符应该>=0）
* 若存在待比较字符串t，则初始化HashTable（t中字符对应value大于0），同时right++,HashTable中value--，count代表未命中字符个数。若无，则HashTable全部为0，同时right++，HashTable中value++，count++，count代表不同字符个数或者重复字符个数。

```c++
int findSubstring(string s){
        vector<int> map(128,0);
        int counter; // check whether the substring is valid
        int begin=0, end=0; //two pointers, one point to tail and one  head
        int d; //the length of substring

        for() { /* initialize the hash map here */ }

        while(end<s.size()){

            if(map[s[end++]]-- ?){  /* modify counter here */ }

            while(/* counter condition */){ 

                 /* update d here if finding minimum*/

                //increase begin to make it invalid/valid again

                if(map[s[begin++]]++ ?){ /*modify counter here*/ }
            }  

            /* update d here if finding maximum*/
        }
        return d;
  }
```

* 相关问题，76/242/438/159/3/30/340/395/467

## [76. Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/#/description)

* 解析: 2段字符串，找出包含t的最小窗口
* 边界：s比t小
* 思路：count代表未命中的字符，移动right和left，找出count为0时，最小的窗口。时间复杂度$O(nm)$

```c++
// 10行的滑动窗口代码模板
    string minWindow(string s, string t) {
        vector<int> map(128,0);
        for(auto c: t) map[c]++;
        int counter=t.size(), begin=0, end=0, d=INT_MAX, head=0;
        while(end<s.size()){
            if(map[s[end++]]-->0) counter--; //in t
            while(counter==0){ //valid
                if(end-begin<d)  d=end-(head=begin);
                if(map[s[begin++]]++==0) counter++;  //make it invalid
            }  
        }
        return d==INT_MAX? "":s.substr(head, d);
    }
```

## [242. Valid Anagram ](https://leetcode.com/problems/valid-anagram/#/description)

* 解析: 2段字符串，它们的内容全部相同，只是顺序不同
* 边界：长度不一致，包含char个数不同
* 思路：使用排序为$O(n\log(n))$，使用HashTable为$O(n)$

```c++
// C++ map利用滑动窗口思想
class Solution242 {
public:
    bool isAnagram(string s, string t) {
        if (s.size() != t.size()) {
            return false;
        }
        if (s == t) {
            return true;
        }

        vector<int> hash_map(128,0);
        for (auto c : t) {
            ++hash_map[c];
        }

        int count = t.size(), left = 0, right = 0;
        while (right < s.size()) {
            if(--hash_map[s[right++]] >= 0) {
                --count;
            }
            if(count == 0) {
                return true;
            }
        }

        return false;
    }
};
```

## [438. Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/#/description)

* 解析: 242的升级版。2段字符串，找出字符串A中所有可能是与字符串B构成回文结构的下标。设s长度为n,p长度为m
* 边界：字符串大小为空，字符串A的大小 < 字符串B的大小
* 误区：继续按照242的套路，时间复杂度最小也是O(nm)
* 思路：使用滑动窗口，窗口大小为m，滑动n次，时间复杂度为O(n)。hash_map:使用p中字符出现次数 初始化该map。count:只会对hash中字符未命中的个数；每次遍历right++，对应的hash--；如果窗口大于hash，left++，对应hash++。可以看出不在hash中的字符对应的hash小于等于0（不会影响count），而在hash中的字符对应的hash开始就大于0。所以实际影响count的就是(left,right)区间内的字符，right经过但left未经过，这些字符全部减-1，若此时hash>0的个数代表着初始化的hash正好被right移动时减掉了。
* 简单解释：利用了滑动窗口的特性右边经过的，左边也会经过。所以，右借左还，不会影响初始的结束条件。
* 时间复杂度$O(n)$

```c++
class Solution438 {
public:
    vector<int> findAnagrams(string s, string p) {
        vector<int> result;
        vector<int> hash_map(128,0);
        for (auto c : p) {
            ++hash_map[c];
        }

        int count = p.size(), left = 0, right = 0;
        while (right < s.size()) {
            if(--hash_map[right++] >= 0) {
                --count;
            }
            if(count == 0) {
                result.push_back(left);
            }
            if((right - left) == p.size() && ++hash_map[left++] > 0) {
                ++count;
            }
        }

        return result;
    }
}
```

## [159. Longest Substring with At Most Two Distinct Characters](https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters)

* 解析: 找出最多包含2个字符的最长子串。
* 边界：字符串长度小于3时，直接返回该字符串长度。
* 思路：count此处记录不同的字符个数，count > 2时，为invalid的情况。
* 时间复杂度$O(n^2)$

```c++
int lengthOfLongestSubstringTwoDistinct(string s) {
    vector<int> hash_map(128,0);
    int counter = 0, left = 0, right = 0, d = 0;
    while (right < s.size()) {
        if (hash_map[s[right++]]++ == 0) {
            ++counter;
        }
        while(counter > 2) {
            if(--hash_map[s[left++]] == 0) {
                --counter;
            }
        }
        d = max(d, right - left);
    }
    return d;
}
```

## [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/#/description)

* 解析: 找出字符不重复的最长子串。
* 边界：字符串长度小于2时，直接返回该字符串长度。
* 思路：count此处记录重复字符个数，count为1时，为invalid的情况，需要移动left。
* 时间复杂度$O(n^2)$

```c++
int lengthOfLongestSubstring(string s) {
    if (s.size() < 2) {
        return s.size();
    }
    vector<int> hash_map(128, 0);
    int count = 0, left = 0, right = 0, d = 0;
    while (right < s.size()) {
        if (hash_map[s[right++]]++ == 1) {
            ++count;
        }
        while (count == 1) {
            if (--hash_map[s[left++]] == 1) {
                --count;
            }
        }
        d = max(d, right - left);
    }
    return d;
};
```

* 最优算法的时间复杂度为O(n)，使用HashTable记录字符最靠右的位置

```c++
int lengthOfLongestSubstring(string s) {
    if(s.size() < 2) {
        return s.size();
    }

    vector<int> hash_map(256,-1);
    int left = 0, right = 0, d = 0;
    while (right < s.size()) {
        if (hash_map[s[right]] >= left) {
            left = hash_map[s[right]] + 1;
        }
        hash_map[s[right]] = right++;
        d = max(d, right - left);
    }
    return d;
};
```

## [30. Substring with Concatenation of All Words](https://leetcode.com/problems/substring-with-concatenation-of-all-words/#/description)

* 解析: 找出包含列表中全部的字符串的起始位置集合，类似438。
* 边界：s的大小小于列表长度。
* 思路：滑动窗口，left依次划过每个字符，判读left-right之间的字符串是否全部与列表命中。
* 时间复杂度$O(mn)$

```c++
bool concatenation(string input, unordered_map<string, int> hash_table,int len) {
    int length = len;
    for (int i = 0; i < input.size()/len; ++i) {
        if (--hash_table[input.substr(i*length, length)] < 0) {
            return false;
        }
    }
    for (unordered_map<string, int>::iterator it = hash_table.begin(); it != hash_table.end(); ++it) {
        if (it->second != 0) {
            return false;
        }
    }
    return true;
}
vector<int> findSubstring(string s, vector<string>& words) {
    vector<int> result;
    if (words.size() == 0 || s.size() < (words[0].size())*words.size()) {
        return result;
    }

    int length = words[0].size();
    unordered_map<string,int> hash_table;
    for (string word : words) {
        hash_table[word]++;
    }

    for (int i = 0; i < s.size() - length + 1; ++i) {
        if (concatenation(s.substr(i, words.size()*length), hash_table, length)) {
            result.push_back(i);
        }
    }
    return result;
}
```

## [395. Longest Substring with At Least K Repeating Characters](https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters)

* 解析: 找出每个字符最少重复K次的最长字符串。
* 边界：子串长度小于K
* 思路：将字符串按字符词典中小于K进行划分，若字符词典中出现次数全部大于K，则返回该字符串长度，并递归执行。
* 时间复杂度$O(n\log n)$

```c++
int longestSubstring(string s, int k) {
    if (s.size() < k) {
        return 0;
    }
    unordered_map<char,int> hash_map;
    for (char c : s) {
        hash_map[c]++;
    }

    set<char> splits;
    for (unordered_map<char, int>::iterator it = hash_map.begin(); it != hash_map.end(); ++it) {
        if (it ->second < k) {
            splits.insert(it->first);
        }
    }
    if (splits.size() == 0) {
        return s.size();
    }
    else if (splits.size() == hash_map.size()) {
        return 0;
    }
    vector<int> splits_loc;
    for (int i = 0; i < s.size(); ++i) {
        if (splits.find(s[i]) != splits.end()) {
            splits_loc.push_back(i);
        }
    }

    vector<int> result;
    int left = 0, right = -1;
    for (int loc : splits_loc) {
        left = right + 1;
        right = loc;
        result.push_back(longestSubstring(s.substr(left,right-left),k));
    }
    result.push_back(longestSubstring(s.substr(left+1, s.size() - 1 - left), k));

    return *(std::max_element(std::begin(result),std::end(result)));
}

```

## [467. Unique Substrings in Wraparound String](https://leetcode.com/problems/unique-substrings-in-wraparound-string/#/description)

* 解析: 连续字符的最大组合个数
* 边界：不连续是组合个数为单个的
* 思路：有n个连续的就有 (1+2+3+...+n)种组合情况，额外加入不连续的字符个数即可。同时要考虑，两段连续字符可能有部分重合的情况（这时候选取长的）。
* 时间复杂度$O(n\log n)$

```c++
int findSubstringInWraproundString(string p) {
    vector<int> letters(26,0);
    int res = 0, len = 0;
    for (int i = 0; i < p.size(); ++i) {
        int cur = p[i] - 'a';
        if (i > 0 && p[i-1] != (cur + 26 - 1) % 26 + 'a') {
            len = 0;
        }
        if(++len > letters[cur]) {
            res += len - letters[cur];
            letters[cur] = len;
        }
    }
    return res;
}
```