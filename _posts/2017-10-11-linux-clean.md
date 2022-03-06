title: 'Linxu存储空间清理'
date: 2017-10-11
permalink: /posts/2017/10/linux-clean/
tags:
  - 中文
  - Linux storage
---

1. `df -h` ，这个命令用于查看服务器空间
2. `du -h --max-depth=1`，这个命令用于查看当前目录，哪个文件占用最大，运行效果如下：
3. `du -sh *`，这个命令也用于查看当前目录下各文件及文件夹占用大小，
4. 如果是日志文件占用空间过大，可以使用如下三个命令进行清理
    * `echo "" > /var/log/logfile`
    * `cat  /dev/null >  /var/log/logfile`
    * `echo -n  "" | sudo  tee /var/log/logfile`
5. 使用脚本清理日志文件
    ```shell
    #!/bin/sh
    
    sudo apt-get auto-clean
    sudo apt-get clean
    sudo apt-get autoremove
    
    echo -n "" | sudo tee /var/log/messages
    echo -n "" | sudo tee /var/log/user.log
    echo -n "" | sudo tee /var/log/auth.log
    echo -n "" | sudo tee /var/log/syslog
    echo -n "" | sudo tee /var/log/apache2/access.log
    echo -n "" | sudo tee /usr/local/nginx/logs/access.log
    echo -n "" | sudo tee /usr/local/nginx/logs/error.log
    
    exit
    ```