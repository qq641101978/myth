/**
 * 验证 obj 是否是 plain-object
 * @param {*} obj 
 */
export default function isPlainObject(obj) {
  if (typeof obj !== 'object') return false

  return Object.getPrototypeOf(obj) === Object.prototype

}