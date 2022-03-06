---
title: 'Linux查看CPU信息，机器型号，内存等信息'
date: 2018-09-10
permalink: /posts/2018/09/linux-information/
tags:
  - 中文
  - LeetCode
  - Algorithms
---

## 1. 系统

| 命令                 | 含义                      |
| :------------------- | :------------------------ |
| uname -a             | 查看内核/操作系统/CPU信息 |
| head -n 1 /etc/issue | 查看操作系统版本          |
| cat /proc/cpuinfo    | 查看CPU信息               |
| hostname             | 查看计算机名              |
| lspci -tv            | 列出所有PCI设备           |
| lsusb -tv            | 列出所有USB设备           |
| lsmod                | 列出加载的内核模块        |
| env                  | 查看环境变量              |
|lspci \| grep -i nvidia| 查看NVIDIA显卡

---

## 2. 资源

| 命令                        | 含义                           |
| :-------------------------- | :----------------------------- |
| free -m                     | 查看内存使用量和交换区使用量   |
| df -h                       | 查看各分区使用情况             |
| du -sh <目录名>             | 查看指定目录的大小             |
| grep MemTotal /proc/meminfo | 查看内存总量                   |
| grep MemFree /proc/meminfo  | 查看空闲内存量                 |
| uptime                      | 查看系统运行时间、用户数、负载 |
| cat /proc/loadavg           | 查看系统负载                   |

---

## 3. 磁盘和分区

| 命令               | 含义                          |
| :----------------- | :---------------------------- |
| mount              | column -t                     | 查看挂接的分区状态        |
| fdisk -l           | 查看所有分区                  |
| swapon -s          | 查看所有交换分区              |
| hdparm -i /dev/hda | 查看磁盘参数(仅适用于IDE设备) |
| dmesg              | grep IDE                      | 查看启动时IDE设备检测状况 |

---

## 4. 网络

| 命令          | 含义                   |
| :------------ | :--------------------- |
| ifconfig      | 查看所有网络接口的属性 |
| iptables -L   | 查看防火墙设置         |
| route -n      | 查看路由表             |
| netstat -lntp | 查看所有监听端口       |
| netstat -antp | 查看所有已经建立的连接 |
| netstat -s    | 查看网络统计信息       |

---

## 5. 进程

| 命令   | 含义             |
| :----- | :--------------- |
| ps -ef | 查看所有进程     |
| top    | 实时显示进程状态 |

---

## 6. 用户

| 命令                    | 含义                   |
| :---------------------- | :--------------------- |
| w                       | 查看活动用户           |
| id <用户名>             | 查看指定用户信息       |
| last                    | 查看用户登录日志       |
| cut -d: -f1 /etc/passwd | 查看系统所有用户       |
| cut -d: -f1 /etc/group  | 查看系统所有组         |
| crontab -l              | 查看当前用户的计划任务 |

---

## 7. 服务

| 命令                        | 含义                   |
| :-------------------------- | :--------------------- |
| chkconfig --list            | 列出所有系统服务       |
| chkconfig --list \| grep on | 列出所有启动的系统服务 |

---

## 8. 程序

| 命令    | 含义                 |
| :------ | :------------------- |
| rpm -qa | 查看所有安装的软件包 |

---

## 9. 查看CPU信息（型号）

* CPU型号   
`cat /proc/cpuinfo | grep name | cut -f2 -d: | uniq -c`

* 几颗核心  
`cat /proc/cpuinfo | grep physical | uniq -c `  

* 查看CPU模式  
```getconf LONG_BIT```

* 查看CPU运算flags  
```cat /proc/cpuinfo | grep flags | grep ' lm ' | wc -l ```

* 完整看cpu详细信息  
```dmidecode | grep 'Processor Information```

* 查看内存信息  
```cat /proc/meminfo```

* 查看当前操作系统内核信息  
```uname -a```

* 查看当前操作系统发行版信息    
```cat /etc/issue | grep Linux```

* 查看机器型号  
```dmidecode | grep "Product Name```

* 查看网卡信息  
```dmesg | grep -i eth```

## 10. GPU相关命令

* 查看显卡信息  
```lspci | grep -i vga```
* 若使用NVIDIA显卡  
```lspci | grep -i nvidia```
* 查看显卡详情  
```lspci -v -s 00:0f.0```
* 查看显存使用情况  
```nvidia-smi```
* 周期性输出显卡使用情况  
```watch -n 10 nvidia-smi```
* 查看cuda版本  
```cat /usr/local/cuda/version.txt```
* 查看cudnn版本  
```cat /usr/local/cuda/include/cudnn.h | grep CUDNN_MAJOR -A 2```
