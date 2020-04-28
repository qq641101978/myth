window.onload = function () {
  let xhr = new XMLHttpRequest();

  xhr.open('GET','getData2', true)
  xhr.send(null)

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.responseText)
      console.log(typeof xhr.responseText)
    }
  }
}