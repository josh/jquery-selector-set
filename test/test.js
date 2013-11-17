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
