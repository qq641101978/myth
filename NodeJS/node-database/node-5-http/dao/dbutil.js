// 一个表对应一个文件操作
let mysql = require('mysql');
// 表连接的配置
// 创建一个连接

function createConnection() {
  let connection = mysql.createConnection(({
    host: '127.0.0.1',
    port:'3306',
    user:'root',
    password:'623398',
    database:'byf'
  }));
  return connection
}

module.exports.createConnection = createConnection

// let querySql = 'select * from student;';
// // 创建一个数据库连接
// connection.connect()
// // 查询数据
// connection.query(querySql,(error,result)=>{
//   if(error == null) {
//     console.log(result)
//   } else {
//     console.log(error)
//   }
// })
// // 关闭查询
// connection.end()

// 数据库操作：建立配置连接——连接数据库——查询数据库——关闭连接
// 数据库操作：命令行
// 关闭数据库
// /usr/local/mysql/support-files/mysql.server stop
// 重制密码 先关闭数据库
// 进入终端输入：cd /usr/local/mysql/bin/
// 回车后 登录管理员权限 sudo su
// 回车后输入以下命令来禁止mysql验证功能 ./mysqld_safe --skip-grant-tables &
// 回车后mysql会自动重启（偏好设置中mysql的状态会变成running）
// 输入命令 ./mysql
// 回车后，输入命令 FLUSH PRIVILEGES
// 回车后，输入命令 SET PASSWORD FOR 'root'@'localhost' = PASSWORD('你的新密码');

// mysql命令
// show databases ;
// use byf;
// insert into student (stu_num, name, age, class)
// values (4,'峰',18,3);
// # 全部的 age 修改成19
// update student set age = 19;
//
// # 条件修改
// update student set age = 19,class= 12 where name = '白';
//
// # 查询所有
// select * from student;
// # 查询姓名，年龄
// select name,age from student;
// # 查询年龄在18的所有数据
// select * from student where age=18;
// # 查询年龄在18下的姓名和班级
// select name,class from student where age=18;
// # 查询总人数
// select  count(1) from student;
// # 查询班级的总人数，条件，二班的并且年龄是18的
// select  count(1) from student where class=2 and age=18;
// # 查询班级的总人数，条件，二班的或者年轻为18的
// select  count(1) from student where class=2 or age=18;
// # 求年纪和
// select sum(age) from student;
// # 求平均年龄 (as 给字段改名 别名显示)
// select avg(age) as avg_age from student;
// # 求每个班级有多少人 (group by 对字段进行分组)
// select class, count(1) as '合计' from student group by class;
// # 分页 偏移2 每页显示2条
// select * from student limit 2,2;
// # 查询排序 desc 倒序
// select * from student order by id desc ;
// # 正序
// select * from student order by id ;
//
// # 删除数据  删除年龄为18的数据
// delete from student where age=18;


