// jQuery SelectorSet
//
//= require jquery
//= require selector-set

(function(window, $) {
  var document = window.document;
  var SelectorSet = window.SelectorSet;
  var originalEventAdd = $.event.add;
  var originalEventRemove = $.event.remove;
  var handleObjs = {};

  // Throw an error if SelectorSet dependency is undefined.
  if (!SelectorSet) {
    throw "SelectorSet undefined - https://github.com/josh/jquery-selector-set";
  }

  // Internal: Compute event propagation path using SelectorSet's fast match.
  //
  // event - jQuery Event
  //
  // Returns an Array of {elem: Element, handlers: Array}.
  function selectorSetHandlers(event) {
    var handlerQueue = [],
        cur = event.target,
        set = event.handleObj.selectorSet;

    do {
      // Stop if cur is no longer an Element. Normally breaks at document.
      if (cur.nodeType !== 1) {
        break;
      }

      // Use SelectorSet#matches.
      var matches = set.matches(cur);
      if (matches.length) {
        handlerQueue.push({elem: cur, handlers: matches});
      }
    } while (cur = cur.parentElement);

    return handlerQueue;
  }

  // Internal: Handle delegated event handler.
  //
  // Mostly duplicated from $.event.dispatch.
  //
  // event - jQuery Event
  //
  // Returns nothing.
  function selectorSetHandler(event) {
    var handlerQueue = selectorSetHandlers(event);
    var matched, i = 0;
    while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
      event.currentTarget = matched.elem;

      var handleObj, j = 0;
      while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
        var ret = handleObj.data.apply(matched.elem, arguments);

        if (ret !== undefined) {
          event.result = ret;
          if (ret === false) {
            event.preventDefault();
            event.stopPropagation();
          }
        }
      }
    }
  }

  // Public: Monkey patch $.event.add.
  //
  // elem     - Target Element
  // types    - String event types (including namespaces)
  // handler  - Function
  // data     - Optional data object
  // selector - String delegated selector
  //
  // Returns nothing.
  $.event.add = function(elem, types, handler, data, selector) {
    if (elem === document && !types.match(/\./) && !data && selector) {
      var ts = types.match(/\S+/g);
      var t = ts.length;

      while (t--) {
        var type = ts[t];
        var special = $.event.special[type] || {};
        type = special.delegateType || type;

        var handleObj = handleObjs[type];
        if (!handleObj) {
          handleObj = handleObjs[type] = {
            handler: selectorSetHandler,
            selectorSet: new SelectorSet()
          };
          handleObj.selectorSet.matchesSelector = $.find.matchesSelector;
          originalEventAdd.call(this, elem, type, handleObj);
        }
        handleObj.selectorSet.add(selector, handler);
        $.expr.cacheLength++;

        // if sizzle is available
        if ($.find.compile) {
          $.find.compile(selector);
        }
      }
    } else {
      originalEventAdd.call(this, elem, types, handler, data, selector);
    }
  };

  // Public: Monkey patch $.event.remove.
  //
  // elem        - Target Element
  // types       - String event types (including namespaces)
  // handler     - Function
  // selector    - String delegated selector
  // mappedTypes - Boolean
  //
  // Returns nothing.
  $.event.remove = function(elem, types, handler, selector, mappedTypes) {
    if (elem === document && types && !types.match(/\./) && selector) {
      var ts = types.match(/\S+/g);
      var t = ts.length;

      while (t--) {
        var type = ts[t];
        var special = $.event.special[type] || {};
        type = special.delegateType || type;

        var handleObj = handleObjs[type];
        if (handleObj) {
          handleObj.selectorSet.remove(selector, handler);
        }
      }
    }
    originalEventRemove.call(this, elem, types, handler, selector, mappedTypes);
  };
})(window, jQuery);
