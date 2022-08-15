# 起始页帮助

## 主页

本站支持离线访问 基于 Service Worker

本站的UI基于MDUI

## 设置

### 名字

![image-20220815120238870](https://wfile.wmza.cn/wpsg/images/9a52d2e4083ad76301c58fc44d623d85.png)

在首页显示

![](https://wfile.wmza.cn/wpsg/images/bf725c769221de5ce8cdb2f6e5c6080a.png)

### 搜索引擎设置

![image-20220815120916975](https://wfile.wmza.cn/wpsg/images/143639e46bc02bea4645bc7ac082c655.png)

### 一言语句功能

 ![image-20220815120942323](https://wfile.wmza.cn/wpsg/images/97fc2b0fbaed1cd7c41f6a4c51d15636.png)

作为主页的一言

![image-20220815121035547](https://wfile.wmza.cn/wpsg/images/28aa5390ebd887951e1f0c0ce461a5d9.png)

### 邮箱设置

![image-20220815121151432](https://wfile.wmza.cn/wpsg/images/be015fcbc588f98093ba0348a67bb262.png)

### 设置卡片

![image-20220815121223655](https://wfile.wmza.cn/wpsg/images/404fb387e127bf75ef332043fd6a9686.png)

#### 参数

| 参数 | 是否必填 | 参数类型 |
| :--: | :------: | :------: |
| name |   必填   |  字符串  |
| url  |   必填   |  字符串  |
| icon |   选填   |  字符串  |



#### 完整设置

```json
{"name":"w03.cc", "url":"http://w03.cc", icon:"http://me.w03.cc"}
```

#### 精简设置

省略的icon会自动获取 其url的`favicon.ico`

```json
{"name":"w03.cc", "url":"http://w03.cc"}
```

#### 多个设置

```json
{"name":"w03.cc", "url":"http://w03.cc"},{"name":"w03.cc", "url":"http://w03.cc"}
```

#### 其他

此选项作为首页的卡片设置

![image-20220815121638952](https://wfile.wmza.cn/wpsg/images/5ed7844c0798fbec018bc6b22d2da081.png)![image-20220815121744254](https://wfile.wmza.cn/wpsg/images/4c98490ec28971b8b65e46a0fe76e936.png) 

### 简介

设置中的内容不向服务器进行发送 内容只在`localStorage`中存储

第一项`名字`并不是账户密码的账户 仅用作每次打开首页的提示

![image-20220815120747653](https://wfile.wmza.cn/wpsg/images/bf725c769221de5ce8cdb2f6e5c6080a.png)

第三项`一言语句功能`会向一言服务器发起请求

