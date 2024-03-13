export function storeInCookies(amount: number) {
  var date = new Date();
  date.setTime(date.getTime() + 2 * 60 * 1000);
  var expiracion = "; expires=" + date.toUTCString();
  document.cookie = "mi_numero=" + amount + expiracion + "; path=/";
}

function getCookie() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.indexOf("mi_numero=") === 0) {
      return parseInt(cookie.substring("mi_numero=".length, cookie.length));
    }
  }
  return null;
}
