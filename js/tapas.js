(function () {
  var md = new MobileDetect(window.navigator.userAgent),
    ua = md.ua,
    phoneNumber,
    $textMeCallbackMsg = $('.text-me-callback-msg');

  if (/like Mac OS X/.test(ua)) {
    $('.app-store-btn.google').addClass('hidden');
  } else if (/Android/.test(ua)) {
    $('.app-store-btn.apple').addClass('hidden');
  } else {
    $('.text-me-wrap').removeClass('hidden');
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

  var $dots = $('.dot-wrap').find('li'),
    $cards = $('.info-card'),
    $shots = $('.screen-shot').find('.screen-img'),
    dotLen = $dots.length,
    currentIdx = 0,
    timerId;

  var timer = function() {
    timerId = setTimeout(function() {
      var nextIdx = currentIdx + 1;
      changeCard($dots.eq(nextIdx === dotLen ? 0 : nextIdx));
    }, 5000);
  };
  timer();
  var changeCard = function(self) {
      clearTimeout(timerId);
      var _self = $(self);
      $dots.removeClass('active');
      _self.addClass('active');
      $cards.addClass('hide');
      $(_self.data('card')).removeClass('hide');

      var $prevShot = $shots.filter('.active');
      var $nextShot = $(_self.data('shot'));
      $prevShot.removeClass('active').addClass('hide');
      $nextShot.removeClass('hide').addClass('active');
      currentIdx++;
      if(currentIdx === dotLen) {
        currentIdx = 0;
      }
      timer();
  };
  $('.js-dot').on('click tap', function() {
    changeCard(this);
  });
  $('.js-info').on('swipeleft', function () {
    var $activatedDot = $('.js-dot.active');
    if ($activatedDot.next().length > 0) {
      $activatedDot.next().click();
    }
  });

  $('.js-info').on('swiperight', function () {
    var $activatedDot = $('.js-dot.active');
    if ($activatedDot.prev().length > 0) {
      $activatedDot.prev().click();
    }
  });

  $('.js-story').each(function () {
    var _self = $(this),
      link = _self.find('a').attr('href'),
      $desc = _self.find('p');

    $desc.on('click tap', function () {
      window.open(link, '_blank');
    });
  });

  // pagination
  var paginationItemCnt = $('.js-page-dot').length;
  var $prevBtn = $('.js-page-item.first');
  var $nextBtn = $('.js-page-item.last');
  var changeNews = function (idx) {
    var nextPage = $('.js-news-item-' + idx);

    $('.js-news').addClass('hidden').filter(nextPage).removeClass('hidden');
  };

  $('.js-page-dot').on('click tap', function (e) {
    stopEvent(e);
    var self = $(this),
      idx = self.data('idx');

    $('.js-page-dot').removeClass('active').filter('[data-idx='+idx+']').addClass('active');
    if (idx === 0) {
      $prevBtn.removeClass('active');
      $nextBtn.addClass('active');
    } else if (idx === paginationItemCnt - 1) {
      $prevBtn.addClass('active');
      $nextBtn.removeClass('active');
    } else {
      $prevBtn.addClass('active');
      $nextBtn.addClass('active');
    }

    changeNews(idx);
  });
  $('.js-page-item').on('click tap', function (e) {
    stopEvent(e);
    var self = $(this),
      $current = $('.js-page-dot.active'),
      currentIdx = $current.data('idx'),
      goPrev = self.hasClass('first');

    if (goPrev) {
      if (currentIdx === 0) {
        return ;
      }

      var $prev = $current.prev(),
        prevIdx = $prev.data('idx');

      self.toggleClass('active', prevIdx !== 0);
      $nextBtn.addClass('active');
      $prev.click();
    } else {
      if (currentIdx === paginationItemCnt - 1) {
        return ;
      }

      var $next = $current.next(),
        nextIdx = $next.data('idx');

      self.toggleClass('active', nextIdx !== paginationItemCnt - 1);
      $prevBtn.addClass('active');
      $next.click();
    }

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

  $('.js-team-img').on('mouseenter mouseleave', function () {
    var _self = $(this),
      $img = _self.find('i'),
      overImg = $img.data('alter'),
      originalImg = $img.attr('class'),
      $desc = _self.next().find('p:last-child'),
      specialTxt = $desc.data('special'),
      title = $desc.text();

    $img.removeClass().addClass(overImg).data('alter', originalImg);
    $desc.text(specialTxt).data('special', title).toggleClass('open', !$desc.hasClass('open'));
  });
})();
