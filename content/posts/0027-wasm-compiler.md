---
title: 适合分享的 WebAssembly 编译器
date: 2025-01-31T10:20:00
lang: zh
duration: 18min
---

我在想一个问题用 `JavaScript` 实现的编译为 `WebAssembly` 语言可以有多小、多简单。

之前看到一个 269 字节 的 WebAssembly 编译器。

我认为最终的结果是一个编译器，它接受一个算术表达式，并将其编译为有效的 WebAssembly 模块。该模块导出一个函数，该函数返回原始算术表达式的结果。如下所示：

```js
let c=(b,l)=>WebAssembly.instantiate(new Int8Array(
[,97,115,109,1,,,,1,5,1,96,,1,127,3,2,1,,7,4,1,,,,10,
l=(b=b.split` `.flatMap(t=>t>-1?[65,t]:107+'-*/'.indexOf(t)))
.length+4,1,l-2,,...b,11]))
```

下面是一个如何使用它的示例：

```js
(await c('11 11 1 - + 4 * 2 /')).instance.exports['']()
```

可以在这里看看[源代码](https://stackblitz.com/edit/stackblitz-starters-th8sn3nx?file=index.js)

---

## 格式

为了让他更容易阅读，我们的第一步就是格式化他。

```js
let c1 = (b, l) =>
  WebAssembly.instantiate(
    new Int8Array([
      , 97, 115, 109, 1, , , , 1, 5, 1, 96, , 1, 127, 3, 2, 1, , 7, 4, 1, , , , 10,
      (l = (b = b.split` `.flatMap(
            (t) => t > -1 ? [65, t] : 107 + "-*/".indexOf(t)
           )).length + 4),
      1, l - 2, , ...b, 11
    ])
  );
```

尽管代码目前仍相当难以阅读，但我们至少可以区分出其中的不同部分。

从高层次来看，我们的工作流程是：对表达式进行基础解析，将其转换为对应的 WebAssembly 字节码，然后手动构建一个单函数模块的字节序列。

在更复杂的编译器中，通常会使用库来生成 WebAssembly 模块并编译表达式。但由于这里的主要考量是代码体积，我们选择直接将字节码写入数组。

## 避免使用赋值表达式

我们第一个技巧就是使用[赋值表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Assignment)

在 JavaScript 中，赋值运算符是一个表达式。这意味着它在求值后会生成一个结果，如以下示例所示：

```js
let a, b;
console.log('a', a = 42);
a = b = 43;
console.log('b', b);
```

上面的代码将输出：

```js
a 42
b 43
```

这是因为 `a = 42` 将 42 赋值给 a ，而整个赋值表达式的结果就是被赋的值。

在 `a = b = 43` 中，我们将 `b = 43` 的计算结果赋值给 a 。下面这个等效的表达式可能更容易理解：`a = (b = 43)`。

在我们的代码中，我们利用这种技巧来重用变量，并在可以使用被赋值的值的地方更新它们的值。它还允许我们在一个表达式中实现编译器的逻辑，避免了使用大括号、分号和返回语句的需要。

为了撤销这种做法，我们将函数的主体转换为一个代码块，并将每个赋值操作分别放在单独的行上：

```js {2-5}
let c2 = (b, l) => {
  b = b.split` `.flatMap(
    (t) => (t > -1 ? [65, t] : 107 + "-*/".indexOf(t))
  );
  l = b.length + 4;
  return WebAssembly.instantiate(
    new Int8Array([
      , 97, 115, 109, 1, , , , 1, 5, 1, 96, , 1, 127, 3, 2, 1, , 7, 4, 1, , , ,
      10, l, 1, l - 2, , ...b, 11
    ]),
  );
};
```

## 撤销变量技巧

现在，赋值操作更容易识别了，但变量和函数参数的含义仍然难以理解。让我们通过撤销一些变量技巧来解决这个问题。

第一步是停止使用单字母变量，改用更具描述性的名称。下一步是停止重用变量：例如，变量b最初用于存储要编译的代码，但一旦我们不再需要它时，又将其重用为存储字节码指令。

为了撤销这种做法，我们将引入一个新的变量 `instrs` ，并将 `b` 重命名为 `code` 。我们还将 `l` 重命名为 `len` 。这个变量的值接近字节码的数量。

通过在函数体中声明 `l` ，我们可以将其从函数参数列表中移除。我们之前使用这种技巧是为了避免使用 `let` 或 `const` 来声明它，从而节省一些字节和函数体的需要。

这种技巧的原理是在函数参数列表的末尾添加未使用的参数，并将它们用作局部变量。我们的编译器函数只期望接收一个包含代码的参数；l是供我们使用的，因为我们不期望调用者为其提供任何值。

以下是不使用这种技巧的代码：

```js {2-5}
let c3 = (code) => {
  const instrs = code.split` `.flatMap(
    (t) => (t > -1 ? [65, t] : 107 + "-*/".indexOf(t))
  );
  const len = instrs.length + 4;
  return WebAssembly.instantiate(
    new Int8Array([
      , 97, 115, 109, 1, , , , 1, 5, 1, 96, , 1, 127, 3, 2, 1, , 7, 4, 1, , , ,
      10, len, 1, len - 2, , ...instrs, 11
    ]),
  );
};
```

## 添加缺失的零

如果你查看我们代码中的数组，你可能会注意到有很多逗号后面跟着另一个逗号而不是值。这种语法定义了“稀疏数组”。例如：

```js
const a1 = [,,];
console.log(a1.length); // 输出：2
console.log(a1); // 输出：[ <2 个空元素> ]
```

这相当于：

```js
const a2 = new Array(2);
console.log(a2.length); // 输出：2
console.log(a2); // 输出：[ <2 个空元素> ]
```

我们使用这种语法技巧是为了每次需要在数组中出现 `0` 时节省一个字节。这是因为类型化数组会将所有数组项强制转换为数字，而 `空元素` 将被转换为 0：

```js
new Int8Array([0, null, undefined,,0])
```

生成的结果为： `Int8Array(5) [ 0, 0, 0, 0, 0 ]`

让我们通过添加所有缺失的零来撤销这种技巧：

```js
let c4 = (code) => {
const instrs = code.split` `.flatMap(
    (t) => (t > -1 ? [65, t] : 107 + "-*/".indexOf(t))
);
const len = instrs.length + 4;
return WebAssembly.instantiate(
    new Int8Array([
      0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 127, 3, 2, 1, 0, 7, 4, 1, 0, 0, 0,
      10, len, 1, len - 2, 0, ...instrs, 11
    ]),
);
};
```

## 去除长度定义中的额外4字节

在我们的代码中，变量 `len` 包含一个接近编译表达式中字节码数量的数字，但并不完全相同：

```js
const len = instrs.length + 4;
```

在 WebAssembly 模块中，我们需要在两个地方使用函数体（要计算的表达式）的字节数：

- 定义代码段的长度

- 定义函数体的长度

由于代码段中只有一个函数，这两个值非常相似：

- 代码段需要额外的两个字节（段标识符和代码条目数）

- 函数体需要另外两个字节（局部变量数量和 end 指令）

为了避免两次编写 `b.length` ，我们在需要代码段字节数的地方将 `l` 赋值为 `b.length + 4` ，然后在需要函数体字节数的地方计算 `l - 2 * (b.length + 2)`。

```js
[
...
l=(b=b.split` `.flatMap(t=>t>-1?[65,t]:107+'-*/'.indexOf(t))).length+4,1,l-2
...
]
```

这都是为了避免两次编写 `b.length` 的技巧。

让我们将长度赋值给 `len` ，并在每个地方计算正确的值：

```js
let c5 = (code) => {
const instrs = code.split` `.flatMap(
    (t) => (t > -1 ? [65, t] : 107 + "-*/".indexOf(t))
);
const len = instrs.length;
return WebAssembly.instantiate(
    new Int8Array([
      0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 127, 3, 2, 1, 0, 7, 4, 1, 0, 0, 0,
      10, 4 + len, 1, 2 + len, 0, ...instrs, 11
    ]),
);
};
```


## 去除字符串模板字面量代替函数调用

接下来需要撤销的技巧是 `code.split()` 。在这种情况下，我们使用了字符串模板字面量的标记模板功能。
让我们通过创建一个简单的标记模板来了解其工作原理，该模板将字符串转换为大写：
```js
function upper(s) {
  return s[0].toUpperCase();
}
```

并使用它：

```js
upper(`Hello, World!`)
> "HELLO, WORLD!"
```

正如你所见，标记模板函数的第一个参数是一个数组。幸运的是，`String.prototype.split` 的第一个参数以以下方式处理：

> 所有不是 `undefined` 或具有 `Symbol.split` 方法的对象的值都会被强制转换为字符串。

将包含一个字符串的数组强制转换为字符串，与字符串本身相同：

```js
["hello"].toString()
> "hello"
```

由于我们要调用的函数只接受一个字符串参数，因此我们可以将其用作标记模板，从而节省函数调用中的括号。
让我们将其写为函数调用：

```js
let c6 = (code) => {
const instrs = code.split(' ').flatMap(
    (t) => (t > -1 ? [65, t] : 107 + "-*/".indexOf(t))
);
const len = instrs.length;
return WebAssembly.instantiate(
    new Int8Array([
      0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 127, 3, 2, 1, 0, 7, 4, 1, 0, 0, 0,
      10, 4 + len, 1, 2 + len, 0, ...instrs, 11
    ]),
);
};
```

## 去除三元运算符

接下来，让我们撤销三元运算符，将其改为 `_if_` 语句。
三元运算符的每个分支都有表达式，为我们节省了 `return` 语句。以下是使用 `_if_` 语句时的代码：

```js
let c7 = (code) => {
const instrs = code.split(" ").flatMap((t) => {
    if (t > -1) {
      return [65, t];
    } else {
      return 107 + "-*/".indexOf(t);
    }
});
const len = instrs.length;
return WebAssembly.instantiate(
    new Int8Array([
      0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 127, 3, 2, 1, 0, 7, 4, 1, 0, 0, 0,
      10, 4 + len, 1, 2 + len, 0, ...instrs, 11
    ]),
);
};
```

## 去除带有强制转换的数字检查

接下来需要撤销的技巧在以下代码中出现了两次：

```js
if (t > -1) {
  return [65, t];
}
```

首先我们在 `t > -1` 中使用强制转换来检查令牌 `t` 是否是表示正数的字符串。然后我们再次在 `[65, t]` 中使用强制转换，让 `JavaScript` 在 `Int8Array` 中将 `t` 转换为数字：

```js
new Int8Array([65, '42'])
```

让我们明确写出解析和检查的代码：

```js
let c8 = (code) => {
const instrs = code.split(" ").flatMap((t) => {
    const num = parseInt(t, 10);
    if (Number.isFinite(num)) {
      return [65, num];
    } else {
      return 107 + "-*/".indexOf(t);
    }
});
const len = instrs.length;
return WebAssembly.instantiate(
    new Int8Array([
      0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 127, 3, 2, 1, 0, 7, 4, 1, 0, 0, 0,
      10, 4 + len, 1, 2 + len, 0, ...instrs, 11
    ]),
);
};
```

在这里，我们的编译器语义发生了些许变化。原始版本仅接受正整数作为输入；
如果你想输入负数，你需要从零中减去它：`0 - 1` 来得到 `-1`。新版本允许负数，因为它使用 `Number.isFinite(num)` 而不是 `t > -1` 来进行检查。

## 去除 `indexOf -1` 技巧

接下来的技巧在 `_else_` 分支中：

```js
return 107 + "-*/".indexOf(t);
```

我们的计算器编译器只接受四种算术运算：`+`、`-`、`*` 和 `/`。但在上述代码中你只能看到三种：`-*/` 和一个神奇的数字：`107`。
以下是它的原理——这些是 WebAssembly 中算术运算的字节码编号：

- +：106
- -：107
- *：108
- /：109

只有在令牌 `t` 不是数字时，我们才会进入这个分支，这意味着它只能是上述算术运算符之一。因此，给定一个字符，它是这四个运算符之一，我们希望生成相应的操作码。
我们可以写成 `106 + "+-*/".indexOf(t)` 。也就是说，我们在字符串中找到符号的索引：

- +：0
- -：1
- *：2
- /：3

……然后加上 `106` 得到字节码编号。但当 `t` 不在字符串中时，`"+-*/"` 的 `indexOf` 返回 `-1`。我们可以利用这一点，将 `-1` 视为“加号或任何其他令牌”：

- +：-1（任何其他令牌也会是 -1）
- -：0
- *：1
- /：2

这就是为什么我们加上 `107` 而不是 `106`。让我们撤销 `-1` 技巧：

```js
let c9 = (code) => {
const instrs = code.split(" ").flatMap((t) => {
    const num = parseInt(t, 10);
    if (Number.isFinite(num)) {
      return [65, num];
    } else {
      return 106 + "+-*/".indexOf(t);
    }
});
const len = instrs.length;
return WebAssembly.instantiate(
    new Int8Array([
      0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 127, 3, 2, 1, 0, 7, 4, 1, 0, 0, 0,
      10, 4 + len, 1, 2 + len, 0, ...instrs, 11
    ]),
);
};
```

在这里，语义再次发生了一些变化。
以前，如果找不到令牌 `t`，表达式将计算为 `107 + -1`，这将映射到加法。
现在它将计算为 `106 + -1`，这将映射到字节码 `105`，即 `popcnt` 指令。
但别担心，我们将在下一步修复它。

## 去除 indexOf 技巧

在解释了 indexOf 技巧的工作原理并去除了 -1 部分之后，让我们继续完全去除这个技巧。为此，我们将创建一个对象，将算术运算符映射到其字节码：

```js
const OP_TO_BYTECODE = {
"+": 106,
"-": 107,
"*": 108,
"/": 109,
};
let c10 = (code) => {
const instrs = code.split(" ").flatMap((t) => {
    const num = parseInt(t, 10);
    if (Number.isFinite(num)) {
      return [65, num];
    } else {
      return OP_TO_BYTECODE[t] ?? 106;
    }
});
const len = instrs.length;
return WebAssembly.instantiate(
    new Int8Array([
      0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 127, 3, 2, 1, 0, 7, 4, 1, 0, 0, 0,
      10, 4 + len, 1, 2 + len, 0, ...instrs, 11
    ]),
);
};
```

为了保持最初的语义，如果令牌不是有效的运算符，我们返回加法的字节码：`OP_TO_BYTECODE[t] ?? 106` 。

## 去除空的导出名称

从文章开头的使用示例中，你可能注意到导出函数的名称是空字符串：

```js
(await c('11 11 1 - + 4 * 2 /')).instance.exports['']()
```

我们这样做是为了节省指定导出名称所需的字节数，同时因为导出名称的长度为 0，我们还可以使用稀疏数组语法在 WebAssembly 模块数组中留下一个空位，从而节省一个额外的字节 `/` 字符。

为了撤销这个技巧，我们将导出的函数命名为 `a`，在 UTF-8 中它是字节 `97`：

```js
const OP_TO_BYTECODE = {
"+": 106,
"-": 107,
"*": 108,
"/": 109,
};
let c11 = (code) => {
const instrs = code.split(" ").flatMap((t) => {
    const num = parseInt(t, 10);
    if (Number.isFinite(num)) {
      return [65, num];
    } else {
      return OP_TO_BYTECODE[t] ?? 106;
    }
});
const len = instrs.length;
return WebAssembly.instantiate(
    new Int8Array([
      0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 127, 3, 2, 1, 0, 7, 5, 1, 1, 97, 0, 0,
      10, 4 + len, 1, 2 + len, 0, ...instrs, 11
    ]),
);
};
```

现在我们可以用一个更友好的名称调用它：

```js
(await c11('11 11 1 - + 4 * 2 /')).instance.exports.a()
```

## 隐含的设计决策
我们的初始实现仅支持正数，但这并不是我们编译器中唯一的数字限制。

为了使 WebAssembly 模块尽可能小，数字使用一种名为 `LEB128` 的可变长度编码算法进行编码。你可以通过查看编码数字的代码部分 `[65,t]` 来判断我们没有实现完整的算法。我们假设要编码的数字可以放入7位，这是最短的 `LEB128` 表示形式。

让我们尝试我们实现的极限：

```js
(await c('63')).instance.exports['']();
> 63
```

```js
(await c('64')).instance.exports['']();
> -64
```

这意味着唯一能正确解析的数字是从 0 到 63。

```js
(await c('127')).instance.exports['']();
> -1
```

```js
(await c('128')).instance.exports['']();
```

失败并报错：

> Uncaught CompileError: WebAssembly.instantiate(): Compiling function #0 failed: function body must end with “end” opcode @+33

在最后一个例子中，我们超出了7位，模块在验证过程中被拒绝。

解释和实现 LEB128 需要大量的文字和代码。如果你想了解更多，我们在书中有一个关于 LEB128 的深入探讨。

## 一个差点成功的技巧

在代码高尔夫阶段，我突然想到了一个主意，但遗憾的是它没有成功。

这个想法是通过使用 `UTF-8` 字符编码加上偏移量来简化 `106 + "+-*/".indexOf(t)`，像这样：`63 + t.charCodeAt()`，从而节省 3 个字节。它没有成功的原因是字符 `+-*/` 在 `UTF-8` 和 WebAssembly 字节码中的顺序并不相同。

解释数组中的数字

最后一个需要展开/解释的部分是用于构建 WebAssembly 模块的数字数组。

要解释数组中的每一个字节，需要很大一部分规范，但以下是一个带有注释的版本，应该能让你对每一部分的作用有一个大致的了解：

```js
[
      // WebAssembly 模块的魔术数字 '\0asm'
      0, 97, 115, 109,
      // WebAssembly 版本 1.0
      1, 0, 0, 0,
      // ----- 类型段 -----
      1, // 段标识符
      5, // 段的字节大小
      1, // 后续条目数量
      // 类型段 - 条目 0
      96, // 类型 `function`
      0,  // 参数数量
      1,  // 返回值数量
      127, // 返回类型 i32
      // ----- 函数段 -----
      3, // 段标识符
      2, // 段的字节大小
      1, // 后续条目数量
      // 函数段 - 条目 0
      0, // 类型段条目索引
      // ----- 导出段 -----
      7, // 段标识符
      5, // 段的字节大小
      1, // 后续条目数量
      // 导出段 - 条目 0
      1,  // 名称的字节大小
      97, // 字符串的 UTF-8 字节，表示 'a'
      0,  // 导出类型 `function`
      0,  // 函数索引
      // ----- 代码段 -----
      10, // 段标识符
      4 + len, // 段的字节大小
      1, // 后续条目数量
      // 代码段 - 条目 0
      2 + len, // 条目的字节大小
      0, // 局部变量数量
      ...instrs,
      11, // `end` 指令
    ]
```
