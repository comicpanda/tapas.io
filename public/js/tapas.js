(function () {
  var md = new MobileDetect(window.navigator.userAgent),
    ua = md.ua;

  if (/like Mac OS X/.test(ua)) {
    $('.app-store-btn.google').addClass('hidden');
  } else if (/Android/.test(ua)) {
    $('.app-store-btn.apple').addClass('hidden');
  }

  $('.js-line').each(function () {
    var _self = $(this),
      $question = _self.find('.question');

    $question.on('click tap', function (e) {
      stopEvent(e);
      _self.toggleClass('active', !_self.hasClass('active'));
    });
  });

  $('.js-nav-line').find('li').each(function () {
    var $li = $(this),
      $a = $li.find('a');

    $a.on('click tap', function (e) {
      stopEvent(e);
      $('.js-nav-line').find('li').removeClass('active');
      $li.addClass('active');
      autoScroll(e, $(this));
    });
  });

  $('.js-nav-selected').on('click tap', function (e) {
    stopEvent(e);
    var _self = $(this);
    _self.toggleClass('open', !_self.hasClass('open'));
  });

  $('.js-nav-item').find('li').each(function () {
    var $li = $(this),
      $a = $li.find('a');

    $a.on('click tap', function (e) {
      stopEvent(e);
      autoScroll(e, $(this));
      $('.js-nav-selected').removeClass('open');
    });
  });

  var stopEvent = function (e) {
    if (!e) {
      return;
    }

    if (e.stopPropagation) {
      e.stopPropagation();
    }

    if (e.preventDefault) {
      e.preventDefault();
    }
  };

  var autoScroll = function (e, $el) {
    stopEvent(e);

    var _self = $el,
      $dest = $(_self.data('id')),
      scrollTop = $dest.offset().top,
      distance = Math.ceil(Math.abs($(window).scrollTop() - scrollTop)),
      duration = Math.min(distance ? Math.max(distance * 0.45, 450) : 0, 2000);

    $('html , body').animate(
      {scrollTop : scrollTop},
      { duration : duration, easing : 'easeInOutQuad'});
  };
})();