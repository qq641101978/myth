- 资料：
> [理论](https://zhuanlan.zhihu.com/p/34943332)
> [实践](https://juejin.im/post/6844904129987526663#comments)
> [实践](https://juejin.im/post/6844904135951646733)

# Nginx
>nginx学习：“Nginx是一款轻量级的HTTP服务器，采用事件驱动的异步非阻塞处理方式框架，这让其具有极好的IO性能，时常用于服务端的反向代理和负载均衡。

>自我了解：跨域。

>学习了解：是一个开源可靠且高性能的 http 中间件，代理服务

>中间件概念：连接两个独立应用程序或独立系统的软件

>优势：功能是企业最长常使用和需要的。轻量级(功能模块少，代码模块少)，高性能，多路IO复用（ epoll 模型）


### 安装nginx

安装：稳定版
yum -y install nginx

基本参数使用：

- 1.安装目录：
rpm -ql nginx
etc目录：核心配置
usr目录：用户
var目录：

- 2.编译参数：
- 3.Nginx 基本配置语法

- 反向代理：代购。

####  环境配置确认：四项确认，两项安装，一次初始化
四项确认：
- 1、确认系统网络 ping www.baidu.com
- 2、确认yum可用 yum list|grep gcc
- 3、确认关闭iptables规则 
iptables -L 查看是否有规则 
iptables -F 关闭规则
保险做法：
iptables -t net -L 查表规则
iptables -t net -F
- 4、确认停用selinux 
getenforce 查看是否开启
setenforce 0 关闭

两项安装：库安装
yum -y install gcc gcc-c++ autoconf pcre pcre-devel make automake
yum -y install wget httpd-tools vim

一次初始化：在opt目录下创建文件
cd /opt: mkdir app download logs work backup
app 代码目录
download 下载的源码目录
logs 自定义日志管理
work shell 脚本
backup 文件备份

### 云服务器环境搭建
- 链接远程服务器：
- 1.ssh root@47.97.64.134
- 2.输入密码 @

- server start nginx 启动服务

- nginx -s reload 重新加载

- nginx -t检查配置

- nginx -s stop 关闭
- ss -luntp 正在启用的服务器端口

- nginx.conf是典型的分段配置文件


### nginx虚拟主机基于多端口配置：
- ss -luntp 正在启用的服务器端口,不与现有使用的端口冲突
- nginx.conf 文件添加对应的端口配置
- 阿里云需要在 网络与安全->安全组里申请端口

### Nginx虚拟主机基于host域名的配置(本地)：
- mac：需要权限，sudo su -
- vim etc/hosts 编辑hosts问题，添加域名
- ping 对应的域名是否联通
- 配置 nginx.conf 文件

### 日志类型
error.log :错误状态
access_log:访问状态
配置 nginx.conf 文件 字段：log_format main 信息，
配置 log_format main 变量类型：
http请求变量：arg_PARAMETER, http_HEADER, sent_http_HEADER
内置变量： Nginx 内置变量
自定义变量：自己定义

### nginx 模块
- nginx官方模块：源码包默认携带的模块
- nginx第三方模块：非nginx官方的
- nginx -V 可以查看到携带的模块
Syntax: 配置语法
Default:默认配置
Content: 限制范围

### stub_status 模块:Nginx的客户端状态
Syntax: stub_status; 输入字段，直接打开功能
Default: -;没有默认配置
Content: server,location; 范围限制在 server 和 location 中
location /mystatus {
    stub_status;
}
![stub_status 模块](./img/stub_status模块.jpg)

### random_index 模块:目录中选择一个随机主页
Syntax: random_index on | off;
Default:random_index off;
Content: location
location / {
  root   /opt/app/code1;
  random_index on;
  #index  index.html index.htm;
}

### sub_module 模块:HTTP内容替换
- http_sub_module 

- sub_filter
Syntax: sub_filter string replacement; string 表示替换的内容， replacement 替换后的内容对象
Default: ——;
Content: http, server, location; 在http下面，可以对多个server进行替换
location / {
  root   /opt/app/code1;
  index  index.html index.htm;
  sub_filter '<a>ni hao' '<a>NI HAO';  把html页面中 '<a>ni hao' 替换成'<a>NI HAO'
}
>ps:注意清理浏览器缓存或者强制刷新
- sub_filter_once
<!-- 匹配html代码第一个还是全部 on:第一个 off:全部 -->
Syntax: sub_filter_once on|off;
Default: sub_filter_once on;
Content: http, server, location;

- sub_filter_last_modified
<!-- 校验内容是否有变更：主要用于缓存 -->
Syntax: sub_filter_last_modified on|off;
Default: sub_filter_last_modified off;
Content: http, server, location;

### Nginx 对请求限制
- 链接频率的限制：limit_conn_module
- 请求频率的限制：limit_req_module

### 链接限制
Syntax: limit_conn_zone key zone=name:size;
Default: -;
Content: http;

Syntax: limit_conn zone number;
Default: -;
Content: http, server, location;

### 请求限制
Syntax: limit_req_zone key zone=name:size rate=rate;
Default: -;
Content: http;

Syntax: limit_req zone=name[burst=number][nodelay];
Default: -;
Content: http, server, location;

### http_access_module:访问控制
Syntax: allow address |CIDR | unix: | all;
Default: -;
Content: http, server, location, limit_except;

Syntax: deny address |CIDR | unix: | all;
Default: -;
Content: http, server, location, limit_except;
