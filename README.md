# jQuery SelectorSet patch

Speeds up jQuery event delegation by using [SelectorSet](https://github.com/josh/selector-set) for matching event targets.


## Installation

Available on [Bower](http://bower.io) as **jquery-selector-set**.

```
$ bower install jquery-selector-set
```

This should also download the dependencies, [**jquery**](https://github.com/jquery/jquery) and [**selector-set**](https://github.com/josh/selector-set).

Alternatively you can download the `jquery.selector-set.js` and `selector-set.js` files individually. I'll assume you probably already have jQuery itself setup at this point.

```
$ curl -O https://raw.github.com/josh/jquery-selector-set/master/jquery.selector-set.js
$ curl -O https://raw.github.com/josh/selector-set/master/selector-set.js
```


### Usage

There are no new APIs, use jQuery event handlers as you would.

Be sure to load the patch right after you load jQuery.

``` html
<script src="jquery.js"></script>
<script src="selector-set.js"></script>
<script src="jquery.selector-set.js"></script>
<script src="app/foo.js"></script>
<script src="app/bar.js"></script>
```

## Supported jQuery versions

This plugin is currently tested on jQuery 1.8.x, 1.9.x, 1.10.x, 2.0.x and 2.1.x.


## Performance

This patch improves the event dispatch code path for delegated jQuery event handlers. For any user event, `click`, `keydown`, etc, `jQuery.event.dispatch` is invoked. This also applies to custom events using trigger: `$(el).trigger('menu.open')`.

This jsPerf shows a typical GitHub code snippet (a typical deeply nested tree) and a handful of globally delegated selectors.

http://jsperf.com/jquery-selector-set-trigger


## Development

Clone the repository from GitHub.

```
$ git clone https://github.com/josh/jquery-selector-set
```

You'll need to have [Grunt](http://gruntjs.com) installed. If you don't have the `grunt` executable available, you can install it with:

```
$ npm install -g grunt-cli
```

Now just `cd` into the directory and install the local npm dependencies.

```
$ cd jquery-selector-set/
$ npm install
```

Use `grunt test` to run the test suite.

```
$ grunt test
Running "jshint:all" (jshint) task
>> 5 files lint free.

Running "qunit:all" (qunit) task
Testing test/test.html .....................OK
>> 100 assertions passed (50ms)

Done, without errors.
```


## License

Copyright (c) 2013 Joshua Peek

Distributed under an MIT-style license. See LICENSE for details.
