---
title: 碎碎念 09
date: 2025-12-30T13:14:00.000+08:00
lang: zh
duration: 5min
---

Skill 解决了 prompt engineering 的一大痛点 —— 「prompt 不是确定性的」，
就是相同的 prompt 在相同的 model 下每一次的生成结果都可能是不同的。

Skill 就是把 prompt 中能确定性的部分单独拆出来抽象成 script/binary ，
这种把非确定性逻辑和确定性逻辑相互隔离的分治法类似于 Rust
一直在做的把 unsafe 和 safe 相互隔离的哲学：既然避免不了非确定性和 unsafe ，不如建立厚厚的安全墙，
让非确定性和 unsafe 的区域越来越小，让确定性和 safe 的区域越来越大，这样的应用才会越来越可靠。
