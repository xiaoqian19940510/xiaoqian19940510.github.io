---
title: 'Tensorflow安装'
date: 2018-10-10
permalink: /posts/2018/10/tensorflow-install/
tags:
  - 中文
  - Tensorflow
---

## 基础环境环境

1. CPU : 32  Intel(R) Xeon(R) CPU E5-2667 v3 @ 3.20GHz  
```cat /proc/cpuinfo | grep name | cut -f2 -d: | uniq -c```
2. GPU :  两块Tesla K80 (12GB显存)  
```lspci|grep -i nvidia```  
```nvidia-smi```可以查看显卡信息及运行情况
3. 内存 : 256G  
```cat /proc/meminfo 或者 free -m```

## 步骤

> 参考[TensorFlow安装教程](https://www.tensorflow.org/install/pip?hl=zh-cn)

1. 安装Anaconda
2. 安装NVIDIA显卡驱动，查看版本`cat /proc/driver/nvidia/version`.
3. 安装CUDA，查看版本`cat /usr/local/cuda/version.txt`.
4. 安装cuDNN，查看版本`cat /usr/local/cuda/include/cudnn.h | grep CUDNN_MAJOR -A 2`
5. 使用预编译版本直接安装
    * pip
    * Docker
6. 从源码编译
    * 安装gcc、bazel，编译TensorFlow源代码
    * 生成pip安装包并安装
    * 查看安装TensorFlow版本  

```python3 -c 'import tensorflow as tf; print(tf.__version__)'```

> 需要注意的是, 234机没拿到root权限, 安装软件很受限, 不能使用yum、docker。只能使用wget，编译、安装、加入PATH的方式。

## 非root用户使用pip虚拟环境安装最新版

> 参考 https://www.tensorflow.org/install/pip?hl=zh-cn

1. 前置条件：python3/pip3/virtualenv, 下载安装anaconda都可以解决前两个

   ```shell
   wget https://repo.anaconda.com/archive/Anaconda3-5.3.0-Linux-x86_64.sh
   bash Anaconda3-5.3.0-Linux-x86_64.sh
   ```

   安装viertualenv
   ```
    $ curl -O https://pypi.python.org/packages/source/v/virtualenv/virtualenv-X.X.tar.gz
    $ tar xvfz virtualenv-X.X.tar.gz
    $ cd virtualenv-X.X
    $ [sudo] python setup.py install
   ```
2. 使用虚拟环境安装软件
   ```shell
   virtualenv --system-site-packages -p python3 ./venv
   source ./venv/bin/activate  # sh, bash, ksh, or zsh
   ```
   该虚拟环境与主机环境互不影响，但主机安装的软件该环境可以使用，[介绍](https://virtualenv.pypa.io/en/stable/)。
3. 后续下载安装如果使用pip命令很慢可以，使用idm下载whl文件到本地PC上，然后拷贝到234机上并看需要什么安装什么
    ```shell
    pip install https://storage.googleapis.com/tensorflow/linux/cpu/tensorflow-1.11.0-cp36-cp36m-linux_x86_64.whl
    ```
4. 最新版本TensorFlow需要
    * NVIDIA® GPU drivers —CUDA 9.0 requires 384.x or higher.
    * CUDA® Toolkit —TensorFlow supports CUDA 9.0.
    * CUPTI ships with the CUDA Toolkit.
    * cuDNN SDK (>= 7.2)
    * (Optional) NCCL 2.2 for multiple GPU support.
    * (Optional) TensorRT 4.0 to improve latency and throughput for inference on some models.  

    受到显卡驱动限制（234机显卡驱动为375.x版本），所以后续步骤都无法进行。