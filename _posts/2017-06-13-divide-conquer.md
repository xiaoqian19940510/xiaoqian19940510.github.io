---
title: 'Algorithms: Divide and Conquer'
date: 2017-06-13
permalink: /posts/2017/06/divide-conquer/
tags:
  - 中文
  - LeetCode
  - Algorithms
---

1. Divide: 将问题划分为一些子问题，子问题的形式和原问题一样，只是规模更小。
2. Conquer：递归地求解出子问题。如果子问题的规模足够小，则停止递归进行求解。
3. Combine：将子问题的解组合合并成原问题的解

>  二叉树的DFS中前序、中序、后序遍历实际上都利用了分治思想。

---
## [148. Sort List](https://leetcode.com/problems/sort-list/#/description)
## 使用对链表归并排序
```c++
class Solution {
public:
    ListNode* sortList(ListNode* head) {
       if (!head || !head->next) return head;
       ListNode preHead = ListNode(INT_MIN);
       preHead.next = head;
       ListNode *preMid = &preHead, *mid = head;
       while (head && head->next) {
           preMid = mid;
           mid = mid -> next;
           head = head -> next -> next;
       }

       preMid -> next = NULL;
       return merge(sortList(preHead.next), sortList(mid));
    }

    ListNode* merge(ListNode* left, ListNode* right) {
        ListNode preHead = ListNode(INT_MIN);
        ListNode *pt = &preHead;
        while (left && right) {
            if (left->val < right->val) {
                pt -> next = left;
                left = left -> next;
            } else {
                pt -> next = right;
                right = right -> next;
            }
            pt = pt->next;
        }

        pt->next = left?left:right;
        return preHead.next;
    }
};
```
---
## [4. Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/#/description)
```c++
There are two sorted arrays nums1 and nums2 of size m and n respectively.
Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
Example 1:
nums1 = [1, 3]
nums2 = [2]
The median is 2.0
Example 2:
nums1 = [1, 2]
nums2 = [3, 4]
The median is (2 + 3)/2 = 2.5
```
* 找出拍好序的2个数组中的第k大元素（此处为找出中点元素）。这个应该更像是二分查找，而不是分治思想，因为每个子问题下只有一个子问题。
* 注意每个子问题的去除k个或m+n-k个元素。 2个数组的2个元素比较，大的数组大的部分去掉， 小的数组小的部分去掉。
```c++
A[0], A[1], ... , A[pa-1], ... A[m-1]
B[0], B[1], ... , B[pb-1], ... B[n-1]
```
* 其中 B[pb-1], ... B[n-1]的长度加上A[0], ... , A[pa-1]的长度为k。  
* 如果 A[pa-1] > B[pb-1]，仅保留B[pb-1], ... B[n-1]和A[0], ... , A[pa-1]  
* 如果 A[pa-1] < B[pb-1]，仅保留A[pa-1], ... A[m-1]和B[0], B[1], ... , B[pb-1]  
* 如果 A[pa-1] == B[pb-1]，返回A[pa-1]  

```c++
class Solution {
public:
    // common solutin to get the k-th element in sorted array. k belongs to  [1, n]
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int m = nums1.size(), n = nums2.size();
        int len = m + n;
        if (len & 1)
            return helper(nums1, nums2, len / 2 + 1);
        else
            return (helper(nums1, nums2, len / 2) + helper(nums1, nums2, len / 2 + 1)) / 2;

    }

    double helper(vector<int> nums1, vector<int> nums2, int k) {
        int m = nums1.size(), n = nums2.size();
        if (m > n) return helper(nums2, nums1, k);
        if (m == 0) return nums2[k - 1];
        if (k == 1) return min(nums1[0], nums2[0]);

        int pa = min(k / 2, m), pb = k - pa;
        if (nums1[pa - 1] < nums2[pb - 1]) {
             nums1.erase(nums1.begin(), nums1.begin() + pa);
             nums2.erase(nums2.begin() + pb, nums2.end());
            return helper(nums1, nums2, k - pa);
        }
        else if (nums2[pb - 1] < nums1[pa - 1]) {
            nums2.erase(nums2.begin(), nums2.begin() + pb);
             nums1.erase(nums1.begin() + pa, nums1.end());
            return helper(nums1, nums2, k - pb);
        }
        else {
            return nums1[pa - 1];
        }
    }
};
```