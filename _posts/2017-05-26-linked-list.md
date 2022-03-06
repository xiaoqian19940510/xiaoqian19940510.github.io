---
title: 'Algorithms: Linked List'
date: 2017-05-26
permalink: /posts/2017/05/linked-list/
tags:
  - 中文
  - LeetCode
  - Algorithms
---

## 链表题目是有套路的，如下4个方法：
> * 链表逆序 (n个节点进行逆序，实际上循环进行n-1次)
> * 2个指针 (拆分、拼接、合并、求中点)
> * 链表成环
> * 使用额外空间保存

---
## [143. Reorder List](https://leetcode.com/problems/reorder-list/)
```c++
Given a singly linked list L: L0→L1→…→Ln-1→Ln,
reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…

You must do this in-place without altering the nodes' values.

For example,
Given {1,2,3,4}, reorder it to {1,4,2,3}.
```
* 该题目涵盖很多方法
1. 使用2个指针，求出链表中点
2. 将后半段链表逆序
3. 使用3个指针，将2两个链表拼接起来
```c++
void reorderList(ListNode* head) {
    ListNode preHead1 = ListNode(INT_MIN);
    preHead1.next = head;
    
    ListNode *preMid = &preHead1, *mid = head;
    while (head && head->next) {
        preMid = mid;
        mid = mid -> next;
        head = head -> next -> next;
    }
    preMid -> next = NULL;
    
    ListNode preHead2 = ListNode(INT_MIN);
    preHead2.next = mid;
    ListNode *pre = &preHead2, *cur = pre->next, *nex = NULL;
    while (cur && (nex = cur->next)) {
        cur->next = nex->next;
        nex->next = pre->next;
        pre->next = nex;
    }
    
    ListNode *left = preHead1.next, *right = preHead2.next, *pt = &preHead1;
    while (left && right) {
        pt->next = left;
        left = left->next;
        pt = pt->next;
        
        pt->next = right;
        right = right->next;
        pt = pt->next;
    }
    head = preHead1.next;
}
```
---
## [92. Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/#/description)
```c++
Reverse a linked list from position m to n. Do it in-place and in one-pass.

For example:
Given 1->2->3->4->5->NULL, m = 2 and n = 4,

return 1->4->3->2->5->NULL.

Note:
Given m, n satisfy the following condition:
1 ≤ m ≤ n ≤ length of list.
```
* 对链表中一段区域进行逆序。思路很清楚：找出该段的的前一个节点，对该段长度的节点进行逆序，并将pre节点和后面的连接起来。
```c++
ListNode* reverseBetween(ListNode* head, int m, int n) {
    ListNode preHead = ListNode(INT_MIN);
    preHead.next = head;
    ListNode *pre = &preHead;
    for (int i = 1; i <= m - 1; ++i)
        pre = pre -> next;
    
    ListNode *cur = pre->next, *nex = cur->next;
    for (int i = 0; i < n - m; ++i) {
        cur->next = nex->next;
        nex->next = pre->next;
        pre->next = nex;
        nex = cur->next;
    }
    
    return preHead.next;
}
```
---
## [25. Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/#/description)
```c++
Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes in the end should remain as it is.

You may not alter the values in the nodes, only nodes itself may be changed.

Only constant memory is allowed.

For example,
Given this linked list: 1->2->3->4->5

For k = 2, you should return: 2->1->4->3->5

For k = 3, you should return: 3->2->1->4->5
```
* 每k个节点为一组，内部逆序
* 求出链表长度，当链表长度 >= k时才进行循环，每k个节点进行逆序并和之前拼接
* left记录上组最后一个，pt记录本组第一个，right记录本组的遍历
```c++
ListNode* reverseKGroup(ListNode* head, int k) {
    if(head==NULL||k==1) return head;
    ListNode preHead = ListNode(INT_MIN);
    preHead.next = head;
    
    int count=0;
    ListNode *pre = &preHead, *cur = &preHead, *nex = NULL;
    while(cur = cur->next) 
        count++;
    while(count>=k) {
        cur = pre->next;
        nex = cur->next;
        for(int i=1;i<k;++i) {
            cur->next=nex->next;
            nex->next=pre->next;
            pre->next=nex;
            nex=cur->next;
        }
        pre = cur;
        count -= k;
    }
    return preHead.next;
}
```
---
## [141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/#/description)
```c++
Given a linked list, determine if it has a cycle in it.

Follow up:
Can you solve it without using extra space?
```
* 经典的求链表是否有环的问题，使用快慢指针解决，如果会相遇则有环。
```c++
bool hasCycle(ListNode *head) {
    if (!head) return false;
    ListNode *slow = head, *fast = head;
    while (slow && fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}
```
---
## [142. Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/#/description)
```c++
Given a linked list, return the node where the cycle begins. If there is no cycle, return null.

Note: Do not modify the linked list.

Follow up:
Can you solve it without using extra space?
```
* 如果不考虑空间复杂度，可以使用set保存已经访问过的节点。
* 空间复杂度为O(1)的方法是，快慢指针相遇的地方离入口的距离和从头出发的距离是一样的。[具体原因](https://discuss.leetcode.com/topic/5284/concise-o-n-solution-by-using-c-with-detailed-alogrithm-description/2)
```c++
ListNode *detectCycle(ListNode *head) {
    if (!head) return NULL;
    ListNode *slow = head, *fast = head, *entry = head;
    while (slow && fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            while (entry != slow) {
                slow = slow->next;
                entry = entry->next;
            }
            return entry;
        }
    }
    return NULL;
}
```
---
## [19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/#/description)
```c++
Given a linked list, remove the nth node from the end of list and return its head.

For example,

   Given linked list: 1->2->3->4->5, and n = 2.

   After removing the second node from the end, the linked list becomes 1->2->3->5.
Note:
Given n will always be valid.
Try to do this in one pass.
```
* 去除倒数第k个节点。使用2个指针，指针的距离为k+1。
```c++
ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode preHead = ListNode(INT_MIN);
    preHead.next = head;
    
    ListNode *left = &preHead, *right = head;
    int count = 0;
    while (right) {
        if (count >= n) left = left->next;
        right = right->next;
        ++count;
    }
    
    if (left->next) left->next = left->next->next;
    return preHead.next;
}
```
---
## [83. Remove Duplicates from Sorted List](https://leetcode.com/problems/remove-duplicates-from-sorted-list/#/description)
```c++
Given a sorted linked list, delete all duplicates such that each element appear only once.

For example,
Given 1->1->2, return 1->2.
Given 1->1->2->3->3, return 1->2->3.
```
* 有序链表去重。使用2个指针，当right的指针指向的值大于left指针指向的值，则left指针的下一个指向该right指针指向的节点，并移动left指针。
```c++
ListNode* deleteDuplicates(ListNode* head) {
    if (!head) return head;
    ListNode preHead = ListNode(INT_MIN);
    preHead.next = head;
    ListNode *left = head, *right = head;
    while (right) {
        if (right->val > left->val) {
            left->next = right;
            left = left->next;
        }
        right = right->next;
    }
    left->next = NULL;
    return preHead.next;
}
```
---
## [82. Remove Duplicates from Sorted List II](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/)
```c++
Given a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list.

For example,
Given 1->2->3->3->4->4->5, return 1->2->5.
Given 1->1->1->2->3, return 2->3.
```
* 1. left负责加入不重复节点，right负责遍历数组
* 2. right每次遇到新元素便遍历到该值的最后一个节点
```c++
ListNode* deleteDuplicates(ListNode* head) {
    if (!head) return head;
    ListNode preHead = ListNode(INT_MIN);
    preHead.next = head;
    ListNode *left = &preHead, *right = head;
    
    while (right) {
        bool duplicated = false;
        while (right && right->next && right->val == right->next->val) {
            right = right->next;
            duplicated = true;
        }
        if (!duplicated) {
            left->next = right;
            left = left->next;
        }
        right = right->next;
    }
    left->next = NULL;
    return preHead.next;
}
```
---
## [86. Partition List](https://leetcode.com/problems/partition-list/#/description)
```c++
Given a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.

You should preserve the original relative order of the nodes in each of the two partitions.

For example,
Given 1->4->3->2->5->2 and x = 3,
return 1->2->2->4->3->5.
```
* 将链表拆分成2部分，最后连接起来
* 1. 新建两个dump节点leftHead、rightHead
* 2. left、right两个指针负责为两个新链表添加节点
* 3. head负责遍历原始链表
```c++
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
```
---
## [23. Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/#/description)
```c++
Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.
Input:
[
  1->4->5,
  1->3->4,
  2->6
]
Output: 1->1->2->3->4->4->5->6
```
* 这道题目可以使用在每个链表中当前节点中选取val最小的，然后拼接起来。或者递归地两两合并，利用分治的思想。时间复杂度分别是O(kn)、O(nlogk)。然而实际使用分治的方法要快很多。
```c++
ListNode *mergeTwoLists(ListNode* l1, ListNode* l2) {
    if (NULL == l1) return l2;
    else if (NULL == l2) return l1;
    if (l1->val <= l2->val) {
        l1->next = mergeTwoLists(l1->next, l2);
        return l1;
    }
    else {
        l2->next = mergeTwoLists(l1, l2->next);
        return l2;
    }
}
ListNode *mergeKLists(vector<ListNode *> &lists) {
    if (lists.empty()) return NULL;
    int len = lists.size();
    while (len > 1) {
        for (int i = 0; i < len / 2; ++i) {
            lists[i] = mergeTwoLists(lists[i], lists[len - 1 - i]);
        }
        len = (len + 1) / 2;
    }
    
    return lists.front();
}
```
---
## [61. Rotate List](https://leetcode.com/problems/rotate-list/)
```c++
Given a list, rotate the list to the right by k places, where k is non-negative.

For example:
Given 1->2->3->4->5->NULL and k = 2,
return 4->5->1->2->3->NULL.
```
* 1. 遍历链表，求出链表长度，并将链表首尾相连
* 2. 遍历到len - (k%len)的位置，将链表断开
```c++
ListNode* rotateRight(ListNode* head, int k) {
    if (!head) return head;
    int len = 1;
    ListNode *newH = head, *tail = head;
    while (tail -> next) {
        len++;
        tail = tail -> next;
    }
    tail -> next = head;
    if (k %= len) {
        for (int i = 0; i < len - k; ++i) tail = tail->next;
    }
    
    newH = tail->next;
    tail->next = NULL;
    
    return newH;
}
```