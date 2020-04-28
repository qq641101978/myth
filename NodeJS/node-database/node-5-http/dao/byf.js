let dbutil = require('./dbutil')
// 全部查询

function queryAllByf (callback) {
  let querySql = 'select * from student;';
  let connection = dbutil.createConnection() //每一次请求斗创建一个新的连接
  connection.connect()
  connection.query(querySql,(error,result)=>{
    if(error == null) {
      console.log(result)
      callback(result)
    } else {
      console.log(error)
    }
  })
  connection.end()
}
queryAllByf()

// 条件查询 班级和年龄
function queryByfByClass (className, age) {
  let querySql = 'select * from student where class = ? and age = ?;';
  let connection = dbutil.createConnection()
  connection.connect()
  connection.query(querySql,[...arguments],(error,result)=>{
    if(error == null) {
      console.log(result)
    } else {
      console.log(error)
    }
  })
  connection.end()
}

// 输入密码查询
function queryByfByStuNum (stuNum, success) {
  let querySql = 'select * from student where stu_Num = ?;';
  let connection = dbutil.createConnection()
  connection.connect()
  connection.query(querySql,stuNum,(error,result)=>{
    if(error == null) {
      // console.log(result)
      success(result)
    } else {
      console.log(error)
    }
  })
  connection.end()
}
module.exports = {
  'queryAllByf':queryAllByf,
  'queryByfByClass':queryByfByClass,
  'queryByfByStuNum':queryByfByStuNum
}