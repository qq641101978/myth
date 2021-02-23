/**
 * 数字数组去重 利用迭代的性质
 * @param {Array} array 
 */
function unique(array) {
  return Array.from(new Set(array));
}

/**
 * 对象数组去重
 * @param {[]} arr 
 * @param {*} b 
 */
function sortFn(arr, b) {
  let p = []
  b.forEach(el => {
    p.push(arr[el])
  })
  arr.unshift(...p)
  const obj = {};
  arr = arr.reduce((item, next) => {
    obj[next.id] ? '' : obj[next.id] = true && item.push(next);
    return item;
  }, []);
  console.log(obj)
}