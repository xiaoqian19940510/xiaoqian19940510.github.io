---
title: 'Algorithms: Two Pointers'
date: 2017-08-23
permalink: /posts/2017/08/two-pointers/
tags:
  - 中文
  - LeetCode
  - Algorithms
---

* 两个指针的问题：通过2个指针同步或不同步的移动，得到结果。时间复杂度一般会降低一个数量级。
* 适用于排好序的情况
---
## [86. Partition List](https://leetcode.com/problems/partition-list/#/description)
* 解析: 使用x进行划分，小的在前面，大的在后面，x两边的相对顺序不变。
* 边界：链表为空
* 思路：两个指针，一个负责小于x的情况，一个负责大于等于x的情况，之后连起来即可。注意！！！使用创建ListNode的对象，返回该对象的next
* 时间复杂度：$O(n)$

```c++
class Solution {
public:
    ListNode* partition(ListNode* head, int x) {
        ListNode leftHead = ListNode(INT_MIN);
        ListNode rightHead = ListNode(INT_MIN);
        ListNode *left = &leftHead, *right = &rightHead;
        while (head) {
            if (head->val < x) {
                left->next = head;
                left = left->next;
            } else {
                right->next = head;
                right = right->next;
            }
            head = head->next;
        }
        left->next = rightHead.next;
        right->next = NULL;
        return leftHead.next;
    }
};
```

---
## [88. Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)

```c++
Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.
Note:
You may assume that nums1 has enough space (size that is greater or equal to m + n) to hold additional elements from nums2. The number of elements initialized in nums1 and nums2 are m and n respectively.
```
* 使用两个指针，本体需要原地，所以从后往前，最后只需将nums2加入。
```c++
void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
    int i = m - 1, j = n - 1, k = m + n - 1;
    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            nums1[k--] = nums1[i--];
        } else {
            nums1[k--] = nums2[j--];
        }
    }
    while (j >= 0) {
        nums1[k--] = nums2[j--];
    }
}
```

---
## [11. Container With Most Water](https://leetcode.com/problems/container-with-most-water/)
```c++
Given n non-negative integers a1, a2, ..., an, where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.
Note: You may not slant the container and n is at least 2.
```
* 解析: abs(i-j)*min(nums[i],nums[j]) 的最大值
* 边界：输入数组大小小于2
* 思路：保留所有可能性，left在最左，right在最右。abs(i-j)肯定会变小，所有只需考虑高，高小于当前桶最高时，就要移动。
* 时间复杂度：$O(n)$

```c++
int maxArea(vector<int>& height) {
    int res;
    int left = 0, right = height.size()-1;
    while (left < right) {
        int h = min(height[left], height[right]);
        res = max(res,(right - left)*h);
        while (height[left] <= h && left < right) left++;
        while (height[right] <= h && left < right) right--;
    }
    return res;
}
```

---
## [167. Two Sum II - Input array is sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted)

```c++
Given an array of integers that is already sorted in ascending order, find two numbers such that they add up to a specific target number.
The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are not zero-based.
You may assume that each input would have exactly one solution and you may not use the same element twice.
Input: numbers={2, 7, 11, 15}, target=9
Output: index1=1, index2=2
```

* 初始left = 0 ， right = numbers.size() - 1. 偏大right往左移动，偏小left往右移动。

```c++
vector<int> twoSum(vector<int>& numbers, int target) {
    vector<int> res;
    if (numbers.size() < 2) {
        return res;
    }
    
    int left = 0, right = numbers.size() - 1;
    while (left < right) {
        if(target == numbers[left] + numbers[right]) {
            res.push_back(left+1);
            res.push_back(right+1);
            return res;
        }
        else if (target > numbers[left] + numbers[right]) {
            left++;
        }
        else {
            right--;
        }
    }
    return res;
}
```

---
## [15. 3Sum](https://leetcode.com/problems/3sum/)

```c++
Given an array of integers that is already sorted in ascending order, find two numbers such that they add up to a specific target number.
The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are not zero-based.
You may assume that each input would have exactly one solution and you may not use the same element twice.
Input: numbers={2, 7, 11, 15}, target=9
Output: index1=1, index2=2
```

* 解析: 1. 先进行排序 2.取第i个元素的负为要求的和 3. 之后的处理和排好序的2SUM差不多。
* 注意的是重复问题，解决方法是 1. 开始时left = i + 1。 2. left有重复则left++，right有重复则right--，nums[i]有重复则i++。 3. nums[i] == nums[i+1] 时，i++
* 时间复杂度$O(n^2)$

```c++
vector<vector<int>> threeSum(vector<int>& nums) {
    vector<vector<int>> res;
    std::sort(nums.begin(),nums.end());
    for (int i = 0; i < nums.size(); ++i) {
        int target = - nums[i];
        int left = i + 1, right = nums.size() - 1;
        while(left < right) {
            if (target == nums[left] + nums[right]) {
                vector<int> tmp = {nums[i],nums[left],nums[right]};
                res.push_back(tmp);
                while (left < right && nums[left] == tmp[1]) left++;
                while (left < right && nums[right] == tmp[2]) right--;
            } else if (target > nums[left] + nums[right]) {
                left++;
            } else {
                right--;
            }
        }
        while(i < nums.size() - 1 && nums[i] == nums[i+1]) {
            i++;
        }
    }
    return res;
}
```

---
## [16. 3Sum Closest](https://leetcode.com/problems/3sum-closest/)

```c++
Given an array S of n integers, find three integers in S such that the sum is closest to a given number, target. Return the sum of the three integers. You may assume that each input would have exactly one solution.
    For example, given array S = {-1 2 1 -4}, and target = 1.
    The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
```

* 解析: 和3SUM类似，取三个数值和与目标值最近的。
* 思路：需要逼近目标值可能的情况，排序+左右2个指针，去逼近目标值即可。left = i + 1，避免了重复取值。
* 时间复杂度：$O(n^2)$，如果挨个遍历则是$O(n^3)$

```c++
int threeSumClosest(vector<int>& nums, int target) {
    std::sort(nums.begin(),nums.end());
    
    int span = INT_MAX, closet = INT_MIN;
    for (int i = 0; i < nums.size(); ++i) {
        int left = i + 1, right = nums.size() - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == target) {
                return target;
            } else if (sum > target) {
                while(left < right && nums[right] == nums[right-1]) right--;
                right--;
            } else {
                while(left < right && nums[left] == nums[left+1]) left++;
                left++;
            }
            if (abs(sum - target) <= span) {
                span = abs(sum - target);
                closet = sum;
            } 
        }
    }
    return closet;
}
```

---
## [18. 4Sum](https://leetcode.com/problems/4sum)

```c++
Given an array S of n integers, are there elements a, b, c, and d in S such that a + b + c + d = target? Find all unique quadruplets in the array which gives the sum of target.
Note: The solution set must not contain duplicate quadruplets.
For example, given array S = [1, 0, -1, 0, -2, 2], and target = 0.
A solution set is:
[
  [-1,  0, 0, 1],
  [-2, -1, 1, 2],
  [-2,  0, 0, 2]
]
```

* 解析: 3Sum的变种，求4个数值的和等于目标值。
* 思路：先排序，4个数值从小到大，前2个用for，后2个使用2个指针。需要注意的是：1. 命中时，left和right移动到不等于与之前值不同的位置 2. for循环中的去重要在每次循环的结束位置，这样就会考虑到重复值的开头和结尾，中间部分去掉。
* 注意：每层循环的去重，i层，j层，2指针层。套路是去重放在后面，特别是2指针层的去重，要注意使用临时变量保存结果，去重时和临时变量进行比较。

```c++
vector<vector<int>> fourSum(vector<int>& nums, int target) {
    vector<vector<int>> res;
    if (nums.size() < 4) {
        return res;
    }
    std::sort(nums.begin(), nums.end());
    for (int i = 0; i < nums.size(); ++i) {
        for (int j = i + 1; j < nums.size(); ++j) {
            
            int t = target - nums[i] - nums[j];
            int left = j + 1, right = nums.size() -1 ;
            while (left < right) {
                int sum = nums[left] + nums[right];
                if (t == sum) {
                    vector<int> tmp = { nums[i],nums[j],nums[left],nums[right] };
                    res.push_back(tmp);
                    while (left < right && nums[left] == tmp[2]) left++;
                    while (left < right && nums[right] == tmp[3]) right--;
                }
                else if (t < sum) {
                    right--;
                }
                else {
                    left++;
                }
            }
            while (j < nums.size() - 1 && nums[j] == nums[j + 1]) j++;
        }
        while (i < nums.size() - 1 && nums[i] == nums[i + 1]) i++;
    }
    return res;
}
```

---
## [259. 3Sum Smaller](https://leetcode.com/problems/3sum-smaller)

```c++
Given an array of n integers nums and a target, find the number of index triplets i, j, k with 0 <= i < j < k < n that satisfy the condition nums[i] + nums[j] + nums[k] < target.
For example, given nums = [-2, 0, 1, 3], and target = 2.
Return 2. Because there are two triplets which sums are less than 2:
[-2, 0, 1]
[-2, 0, 3]
Follow up: Could you solve it in O(n2) runtime?
```

* 解析: 求3个数值和比目标值小的全部情况。
* 边界：输入数组大小小于3
* 思路：sum >= target时，right左移。sum < target时，共有right-left中情况命中（sum[i]、left、从right到left的后一个），left右移。
* 时间复杂度：$O(n^2)$，如果挨个遍历则是$O(n^3)$

```c++
int threeSumSmaller(vector<int>& nums, int target) {
    if (nums.size() < 3) {
        return 0;
    }
    std::sort(nums.begin(), nums.end());

    int res = 0;
    for (int i = 0; i < nums.size(); ++i) {
        int left = i + 1, right = nums.size() - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum >= target) {
                right--;
            }
            else {
                res += right - left;
                left++;
            }
        }
    }
    return res;
}
```

---
## [75. Sort Colors](https://leetcode.com/problems/sort-colors/)

```c++
Given an array with n objects colored red, white or blue, sort them so that objects of the same color are adjacent, with the colors in the order red, white and blue.
Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.
Note:
You are not suppose to use the library's sort function for this problem.
```

* 三种元素按类别划分并排序
```c++
void sortColors(vector<int>& nums) {
    int left = 0, right = nums.size() - 1, i = 0;
    while (i <= right) {
        while (nums[i] == 2 && i < right) swap(nums[i], nums[right--]);
        while (nums[i] == 0 && i > left) swap(nums[i], nums[left++]);
        ++i;
    }
}
```

---
## [42. Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/#/description)
* 解析: int数组，求这些数值构成的桶盛水的大小。
* 边界：数组大小大于2
* 思路：这道题时间复杂度为O(n)的情况比较难想，主要是要确定两个值能构成桶的边，而且桶的边是可以移动的。使用left、right2个指针，谁小谁往中间凑，谁大谁不动，这就确定了桶的1条边maxLeft或者maxRight。当移动过程中的值 >= 当前边时，小于maxLeft或maxRight，差值就是该位置盛水的大小。
* 时间复杂度：$O(n)$

```c++
int trap(vector<int>& height) {
    if (height.size() < 2) return 0;
    int left = 0, right = height.size() - 1;
    int maxLeft = height[left], maxRight = height[right];
    int res = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            maxLeft = max(maxLeft, height[++left]);
            res += maxLeft - height[left];
        } else {
            maxRight = max(maxRight, height[--right]);
            res += maxRight - height[right];
        }
    }
    
    return res;
}
```

---
## [26. Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

```c++
Given a sorted array, remove the duplicates in place such that each element appear only once and return the new length.
Do not allocate extra space for another array, you must do this in place with constant memory.
For example,
Given input array nums = [1,1,2],
Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively. It doesn't matter what you leave beyond the new length.
```

* 去除有序数组中重复元素，使用2个指针可以值遍历一次就完成，而且逻辑清晰。
* left负责从左向右新增不同元素，right负责遍历整个数组。right遍历到不同于当前left时，left向前移动并保存新元素。

```c++
int removeDuplicates(vector<int>& nums) {
    int left = 0, right = 0;
    while (right < nums.size()) {
        if(left < 1 || nums[right] > nums[left - 1]) {
            nums[left++] = nums[right];
        }
        right++;
    }
    
    return left;
}
```

---
## [80. Remove Duplicates from Sorted Array II](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/)

```c++
Follow up for "Remove Duplicates":
What if duplicates are allowed at most twice?
For example,
Given sorted array nums = [1,1,1,2,2,3],
Your function should return length = 5, with the first five elements of nums being 1, 1, 2, 2 and 3. It doesn't matter what you leave beyond the new length.
```

* 去除数组中重复元素，每个元素最多出现2次

```c++
int removeDuplicates(vector<int>& nums) {
    int left = 0, right = 0;
    while (right < nums.size()) {
        if (right < 2 || nums[right] > nums[left - 2]) {
            nums[left++] = nums[right];
        }
        right++;
    }
    return left;
}
```

---
## [19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/#/description)
* 解析: 链表中移除倒数第N个元素。
* 边界：链表为空
* 思路：两个指针，距离为N即可，当right为空时，left在要去除的位置。需要注意的是最好另外有个新指针res指向给出链表的头部，返回res.next()，可以统一处理结果为空的情况。
* 时间复杂度：O(n)

```c++
ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode res = ListNode(-1);
    res.next = head;
    ListNode *left = head, *right = head, *last = &res;
    for (int i = 0; i < n && right != NULL; ++i) {
        right = right -> next;
    }
    
    while (right != NULL) {
        last = left;
        left = left -> next;
        right = right -> next;
    }
    last -> next = left -> next;
    while (left != NULL) {
        left = left -> next;
    }
    return res.next;
}
```

---
## [209. Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/#/description)
* 解析: 求使得连续子数组和>x的最短连续子数组。
* 边界：全部和<x
* 思路：连续数组和>x时，才尝试移动left。
* 时间复杂度：O(n^2)

```c++
int minSubArrayLen(int s, vector<int>& nums) {
    int left = 0, right = 0, sum = 0, res = INT_MAX;
    while (right < nums.size()) {
        sum += nums[right++];
        while (sum >= s) {
            res = min(res, right - left);
            sum -= nums[left++];
        }
    }
    return res == INT_MAX ? 0 : res;
}
```

---
## [61. Rotate List](https://leetcode.com/problems/rotate-list/#/description)
* 解析: 旋转链表，将链表从右往左的第k个节点作为分割进行旋转。注意：
* 边界：全部和<x
* 思路：遍历链表，统计链表长度，使链表收尾相接！！！求出实际分割点，进行分割。
* 时间复杂度：O(n^2)

```c++
ListNode* rotateRight(ListNode* head, int k) {
    if (!head) return NULL;
    
    ListNode *tail = head;;
    int length = 1;
    while(tail -> next){
        tail = tail -> next;
        length++;
    }
    tail -> next = head;
    if (k %= length) {
    for (int i = 0; i < length - k; ++i) {
        tail = head;
        head = head -> next;
    }
    }
    tail -> next = NULL;
    
    return head;
    
}
```