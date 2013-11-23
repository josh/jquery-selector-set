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

test('bind/unbind delegated click handler to document', function() {
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

test('bind/unbind namespaced click handler to document', function() {
  var clicked = 0;

  function handle() {
    clicked++;
  }

  equal(clicked, 0);

  $(document).on('click.foo', handle);
  $(document).trigger('click');
  equal(clicked, 1);
  $(document.body).trigger('click');
  equal(clicked, 2);

  $(document).off('click.foo', handle);
  $(document).trigger('click');
  equal(clicked, 2);
});

test('bind/unbind delegated namespaced click handler to document', function() {
  var clicked = 0;

  function handle() {
    clicked++;
  }

  equal(clicked, 0);

  $(document).on('click.foo', 'body', handle);
  $(document).trigger('click');
  equal(clicked, 0);
  $(document.body).trigger('click');
  equal(clicked, 1);

  $(document).off('click.foo', 'body', handle);
  $(document.body).trigger('click');
  equal(clicked, 1);
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
