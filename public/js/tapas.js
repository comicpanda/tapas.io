(function () {
  var md = new MobileDetect(window.navigator.userAgent),
    ua = md.ua;

  if (/like Mac OS X/.test(ua)) {
    $('.app-store-btn.google').addClass('hidden');
  } else if (/Android/.test(ua)) {
    $('.app-store-btn.apple').addClass('hidden');
  }

})();