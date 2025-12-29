---
title: 简单阅读 DeepGEMM
date: 2025-02-27T10:00:00.000+08:00
lang: zh
duration: 5min
---

我其实只能以我的视角来解析一下我所理解的 DeepGEMM。

---

DeepSeek 一项重大进步是使用 FP8 精度进行训练。训练的本质其实是矩阵乘法。默认大家都使用 NVIDIA CUDA 库中提供的矩阵乘法。
DeepSeek 这个库在最优情况可以将矩阵乘法性能提升 2.7x . 可以加速训练速度。
另外在早些年一些商用 BLAS 库 (Basic Linear Algebra Subprograms ，包含矩阵乘法，通常性能比开源 BLAS 库好) 卖得很贵。
