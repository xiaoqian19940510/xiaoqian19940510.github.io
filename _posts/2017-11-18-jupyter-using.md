---
title: '使用Jupyter Notebook'
date: 2017-11-18
permalink: /posts/2017/11/jupter-using/
tags:
  - 中文
  - Jupyter Notebook
  - Python
---

## 1. 安装

* 最简单的方式是通过Anaconda进行安装。  
```shell
anaconda install jupyter
```

> Anaconda是Python的一个科学计算发行版，内置了数百个Python经常会使用的库，也包括很多做机器学习或数据挖掘的库，包括Scikit-learn、Numpy、Scipy和Pandas等，也有些TensorFlow的依赖库。

* 使用pip进行安装  
```shell
python3 -m pip install --upgrade pip
python3 -m pip install jupyter
```

## 2. 使用

1. 设置可远程访问
    * 生成一个notebook配置文件  
    ```jupyter notebook --generate-config```  
    非root用户的配置文件位置即为当前文件夹下`.jupyter/jupyter_notebook_config.py`
    * 生成密码  
    ```jupyter notebook password```
    * 修改配置文件  
    在`jupyter_notebook_config.py`中找到下面的行，取消注释并修改  
    ```vim
    c.NotebookApp.ip='*' # 设置可远程访问
    c.NotebookApp.open_browser = False
    c.NotebookApp.port =8888 # 默认端口
    c.NotebookApp.allow_root = False
    ```
    * 查看帮助  
    ```jupyter notebook --help```

2. 启动

    * 脚本启动
    ```shell
    jupyter notebook --no-browser --port 9999
    ```

    * 后台运行
    ```shell
    nohup jupyter notebook --no-browser --port 9999 > jupyter.out 2>&1 &
    ```