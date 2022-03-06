---
title: '学术搜索技巧'
date: 2018-12-15
permalink: /posts/2018/12/scholar-search-tricks/
tags:
  - 中文
  - Google Scholar
  - 学术
---

## 1. 搜索技巧
[Google scholar](https://scholar.google.com/)本质上还是一个搜索引擎，所以可以将搜索引擎常用的关键词、技巧加以应用
1. site: 搜索指定的网站  
   如`"kernel method" site:nips.cc`，搜索`nips`包含`kernel method`全部论文
2. source: 搜索指定来源，与site类似，有时site范围太广，使用source更精确。
   如`"kernel method" source:"Advances in Neural Information Processing"`，搜索`nips`包含`kernel method`全部论文
3. filetype：搜索制定的文件类型   
   如`"kernel method" filetype:pdf`，搜索包含`kernel method`且有pdf的论文
4. 双引号完全匹配  
   如`"kernel method"`而不是`kernel method`，搜索包含`kernel method`的论文
5. intile：限定标题  
   如`intitle:"kernel method"`
6. intext: 限定内容
   如`intext:("kernel method" -"semi-supervised learning")`，搜索内容中包含`kernel mehtod`且不包含`semi-supervised learning`的论文
7. author: 限定作者  
   如`author:"Jian Li" AND intitle:"Multi-class"`
8. `AND & + , `空格都表示“与”关系
9. `OR |`表示“或”关系
10. `NOT -`表示“非”关系
11. 使用左侧选择时间限制及排序条件
12. 对于某网址对应多个期刊的情况，使用`source`而不是`site`进行界定。如TPAMI对应网址`ieee.org`有很多期刊，而其对应来源为`IEEE Transactions on Pattern Analysis and Machine Intelligence`

## 2. 举例说明

如下语句含义为搜索`nips、icml、TPAMI、JMLR、IJCAI、AAAI`中包含`random feature`或`kernel selection`的文章，并在左侧选择`2018年以来`进行时间限制

```
("random feature" OR "kernel selection") AND (site:nips.cc OR site:icml.cc OR source:"IEEE Transactions on Pattern Analysis and Machine Intelligence" OR site:jmlr.org OR site:ijcai.org OR site:aaai.org)
```

![](https://lijian.ac.cn/files/posts/scholar_search_strick.png)
## 3. 机器学习领域顶会网址(site)

|刊物缩写|网址site|
|:--|:--|
|nips|nips.cc|
|icml|icml.cc|
|jmlr|jmlr.org|
|ijcai|ijcai.org|
|aaai|aaai.org|
|uai|uai.org|
|ML汇刊|proceedings.mlr.press|
|Springer下刊物|link.springer.com|
|IEEE下刊物|ieeexplore.ieee.org|

## 4. 机器学习领域顶会来源(source)

|刊物缩写|刊物source|
|:--|:--|
|AI|Artificial Intelligence|
|TPAMI|IEEE Transactions on Pattern Analysis and Machine Intelligence|
|JMLR|Journal of Machine Learning Research|
|TNNLS|IEEE Transactions on Neural Networks and learning systems|
|Cybernetics|IEEE Transactions on Cybernetics|
|NIPS|Advances in Neural Information Processing Systems|
|ICML|International Conference on Machine Learning|
|IJCAI|International Joint Conference on Artificial Intelligence|
|AAAI|AAAI Conference on Artificial Intelligence|
|COLT|Annual Conference on Computational Learning Theory|
|UAI|Conference on Uncertainty in Artificial Intelligence|

## 5. 总结

灵活使用`site`、`source`及左侧时间限制，可以避免挨个会议查找过于耗时，及只查标题漏掉相关论文的问题。
