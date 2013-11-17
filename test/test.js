test('bind/unbind click event to document', function() {
  var clicked = 0;

  function handle() {
    clicked++;
  }

  equal(clicked, 0);

  $(document).on('click', handle);
  $(document).trigger('click');
  equal(clicked, 1);

  $(document).off('click', handle);
  $(document).trigger('click');
  equal(clicked, 1);
});
