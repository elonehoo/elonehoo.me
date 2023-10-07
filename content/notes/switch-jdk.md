---
navigation.title: Switch JDK
navigation.date: 2023-09-11T11:15:00.000+08:00
navigation.lang: en
navigation.duration: 1min
layout: 'default'
---

Check the java version installed on your computer

```bash
/usr/libexec/java_home -V
```

Check the current java version

```bash
java -version
```

Set version

```bash
open ~/.bash_profile
# SWITCH TO JAVA VERSION 8
export JAVA_HOME=`/usr/libexec/java_home -v 1.8`
```

Update configuration

```bash
source ~/.bash_profile
```
