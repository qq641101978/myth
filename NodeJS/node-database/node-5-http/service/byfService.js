let byfDao = require('../dao/byf');
//业务不复杂，基本没有业务逻辑
function queryAllByf (success) {
  byfDao.queryAllByf(success)
}
function queryByfByStuNum(stuNum, success){
  byfDao.queryByfByStuNum(stuNum, success)
}
module.exports = {
  'queryAllByf': queryAllByf,
  'queryByfByStuNum':queryByfByStuNum
}