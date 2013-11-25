test('bind/unbind click handler to document', function() {
  var clicked = 0;

  function handle() {
    clicked++;
  }

  equal(clicked, 0);

  $(document).on('click', handle);
  $(document).trigger('click');
  equal(clicked, 1);
  $(document.body).trigger('click');
  equal(clicked, 2);

  $(document).off('click', handle);
  $(document).trigger('click');
  equal(clicked, 2);
});

test('bind/unbind click handler to document element', function() {
  var clicked = 0;

  function handle() {
    clicked++;
  }

  equal(clicked, 0);

  $(document.documentElement).on('click', handle);
  $(document.documentElement).trigger('click');
  equal(clicked, 1);
  $(document.body).trigger('click');
  equal(clicked, 2);

  $(document.documentElement).off('click', handle);
  $(document.documentElement).trigger('click');
  equal(clicked, 2);
});

test('bind/unbind click handler to window', function() {
  var clicked = 0;

  function handle() {
    clicked++;
  }

  equal(clicked, 0);

  $(window).on('click', handle);
  $(window).trigger('click');
  equal(clicked, 1);
  $(document).trigger('click');
  equal(clicked, 2);

  $(window).off('click', handle);
  $(window).trigger('click');
  equal(clicked, 2);
});

test('bind/unbind delegated tag name click handler to document', function() {
  var clicked = 0;

  function handle() {
    clicked++;
  }

  equal(clicked, 0);

  $(document).on('click', 'body', handle);
  $(document).trigger('click');
  equal(clicked, 0);
  $(document.body).trigger('click');
  equal(clicked, 1);

  $(document).off('click', 'body', handle);
  $(document.body).trigger('click');
  equal(clicked, 1);
});

test('bind/unbind delegated class click handler to document', function() {
  var clicked = 0;

  function handle() {
    clicked++;
  }

  equal(clicked, 0);

  $(document).on('click', '.foo', handle);
  document.body.className = 'foo';
  $(document).trigger('click');
  equal(clicked, 0);
  $(document.body).trigger('click');
  equal(clicked, 1);

  $(document).off('click', '.foo', handle);
  document.body.className = '';
  $(document.body).trigger('click');
  equal(clicked, 1);
});

test('bind/unbind delegated universal click handler to document', function() {
  var clicked = 0;

  function handle() {
    clicked++;
  }

  equal(clicked, 0);

  $(document).on('click', '*', handle);
  $(document).trigger('click');
  equal(clicked, 0);
  $(document.body).trigger('click');
  equal(clicked, 2);

  $(document).off('click', '*', handle);
  $(document.body).trigger('click');
  equal(clicked, 2);
});

test('bind/unbind delegated sizzle-only click handler to document', function() {
  var clicked = 0;

  function handle() {
    clicked++;
  }

  equal(clicked, 0);

  $(document).on('click', ':visible', handle);
  $(document).trigger('click');
  equal(clicked, 0);
  $(document.body).trigger('click');
  equal(clicked, 2);

  $(document).off('click', ':visible', handle);
  $(document.body).trigger('click');
  equal(clicked, 2);
});

test('bind/unbind namespaced click handler to document', function() {
  var clicked = 0;

  function handle() {
    clicked++;
  }

  equal(clicked, 0);

  $(document).on('click.foo', handle);
  $(document).on('click.bar', handle);
  $(document).trigger('click');
  equal(clicked, 2);
  $(document.body).trigger('click');
  equal(clicked, 4);
  $(document.body).trigger('click.foo');
  equal(clicked, 5);

  $(document).off('click.foo', handle);
  $(document).off('click.bar', handle);
  $(document).trigger('click');
  $(document).trigger('click.foo');
  $(document).trigger('click.bar');
  equal(clicked, 5);
});

test('bind/unbind delegated namespaced click handler to document', function() {
  var clicked = 0;

  function handle() {
    clicked++;
  }

  equal(clicked, 0);

  $(document).on('click.foo', 'body', handle);
  $(document).on('click.bar', 'body', handle);
  $(document).trigger('click');
  equal(clicked, 0);
  $(document.body).trigger('click');
  equal(clicked, 2);
  $(document.body).trigger('click.foo');
  equal(clicked, 3);

  $(document).off('click.foo', 'body', handle);
  $(document).off('click.bar', 'body', handle);
  $(document.body).trigger('click');
  $(document.body).trigger('click.foo');
  $(document.body).trigger('click.bar');
  equal(clicked, 3);
});

test('bind/unbind focus event handler to document', function() {
  var focused = 0;

  function handle() {
    focused++;
  }

  equal(focused, 0);

  $(document).on('focus', 'body', handle);
  $(document).on('focusin', 'body', handle);
  $(document).focus();
  equal(focused, 0);
  $(document.body).focus();
  equal(focused, 2);

  $(document).off('focus', 'body', handle);
  $(document).off('focusin', 'body', handle);
  $(document.body).focus();
  equal(focused, 2);
});

test('bind/unbind namespaced focus event handler to document', function() {
  var focused = 0;

  function handle() {
    focused++;
  }

  equal(focused, 0);

  $(document).on('focus.foo', 'body', handle);
  $(document).on('focusin.foo', 'body', handle);
  $(document).on('focus.bar', 'body', handle);
  $(document).on('focusin.bar', 'body', handle);
  $(document).focus();
  equal(focused, 0);
  $(document.body).focus();
  equal(focused, 4);
  $(document.body).trigger('focus');
  equal(focused, 8);
  $(document.body).trigger('focus.foo');
  equal(focused, 10);

  $(document).off('focus.foo', 'body', handle);
  $(document).off('focusin.foo', 'body', handle);
  $(document).off('focus.bar', 'body', handle);
  $(document).off('focusin.bar', 'body', handle);
  $(document.body).focus();
  equal(focused, 10);
  $(document.body).trigger('focus');
  equal(focused, 10);
  $(document.body).trigger('focus.foo');
  equal(focused, 10);
});

test('return false from delegated document click handler', function() {
  function handle() {
    return false;
  }

  var event;

  $(document).on('click', 'body', handle);
  event = $.Event('click');
  $(document.body).trigger(event);
  equal(event.isDefaultPrevented(), true);
  equal(event.isPropagationStopped(), true);
  equal(event.result, false);

  $(document).off('click', 'body', handle);
  event = $.Event('click');
  $(document.body).trigger(event);
  equal(event.isDefaultPrevented(), false);
  equal(event.isPropagationStopped(), false);
  equal(event.result, undefined);
});

test('preventDefault from delegated document click handler', function() {
  function handle(event) {
    event.preventDefault();
  }

  var event;

  $(document).on('click', 'body', handle);
  event = $.Event('click');
  $(document.body).trigger(event);
  equal(event.isDefaultPrevented(), true);
  equal(event.isPropagationStopped(), false);
  equal(event.result, undefined);

  $(document).off('click', 'body', handle);
  event = $.Event('click');
  $(document.body).trigger(event);
  equal(event.isDefaultPrevented(), false);
  equal(event.isPropagationStopped(), false);
  equal(event.result, undefined);
});

test('stopPropogation from delegated document click handler', function() {
  function handle(event) {
    event.stopPropagation();
  }

  var event;

  $(document).on('click', 'body', handle);
  event = $.Event('click');
  $(document.body).trigger(event);
  equal(event.isDefaultPrevented(), false);
  equal(event.isPropagationStopped(), true);
  equal(event.result, undefined);

  $(document).off('click', 'body', handle);
  event = $.Event('click');
  $(document.body).trigger(event);
  equal(event.isDefaultPrevented(), false);
  equal(event.isPropagationStopped(), false);
  equal(event.result, undefined);
});

test('stopImmediatePropagation from delegated document click handler', function() {
  function handle(event) {
    event.stopImmediatePropagation();
  }

  var event;

  $(document).on('click', 'body', handle);
  event = $.Event('click');
  $(document.body).trigger(event);
  equal(event.isDefaultPrevented(), false);
  equal(event.isPropagationStopped(), true);
  equal(event.result, undefined);

  $(document).off('click', 'body', handle);
  event = $.Event('click');
  $(document.body).trigger(event);
  equal(event.isDefaultPrevented(), false);
  equal(event.isPropagationStopped(), false);
  equal(event.result, undefined);
});
