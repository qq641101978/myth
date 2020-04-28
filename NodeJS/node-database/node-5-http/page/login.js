window.onload = function () {
 // xhr()
}
function xhr () {
  let xhr = new XMLHttpRequest();
  xhr.open('GET','/getData', true)
  xhr.send(null)
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.responseText)
      console.log(typeof xhr.responseText)
    }
  }
}
// get请求
// function login () {
//   let stuNum = document.getElementById('stuNum').value;
//   let password = document.getElementById('password').value;
//   let params = `stuNum=${stuNum}&password=${password}`;
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET',`/login?${params}`, true)
//   xhr.send(null)
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       console.log(xhr.responseText)
//       console.log(typeof xhr.responseText)
//       alert(xhr.responseText)
//     }
//   }
// }
// post 请求
function login () {
  console.log('login...')
  let stuNum = document.getElementById('stuNum').value;
  let password = document.getElementById('password').value;
  let params = `stuNum=${stuNum}&password=${password}`;
  let xhr = new XMLHttpRequest();
  console.log(params)
  xhr.open('POST',`/login`, true)
  xhr.send(params)
  xhr.onreadystatechange = function () {
    console.log('login...1')
    if (xhr.readyState === 4 && xhr.status === 200) {
      // console.log(xhr.responseText)
      // console.log(typeof xhr.responseText)
      alert(xhr.responseText)
      // 借助ajax跳转页面
      if(xhr.responseText === 'ok') {
        location.href= './main.html'
      }
    }
  }
}