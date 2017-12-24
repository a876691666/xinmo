/**
 * Created by gxk on 2017/8/28.
 */
export function postFetch(url, data, successCall, eCall) {
  let userCookie = getCookie('userCookie');
  let token = '...000';
  if (userCookie != null && userCookie != "") {
    token = JSON.parse(userCookie).token
  }
  var fromData = new FormData();
  for (var key in data) {
    fromData.append(key, data[key])
  }
  console.log(token)
  fromData.append('token', token);
  fetch(`http://fudao.sinmore.vip${url}`, {
    method: 'POST',
    mode: 'cors',
    body: fromData
  }).then(response => response.json())
    .then(data => successCall(data))
    .catch(e => console.log(e))
}

function getCookie(c_name) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ""
}
