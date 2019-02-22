const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook
} = require("tapable");

const stage = new SyncBailHook(['arg1']);

stage.tap('1', function (arg1, arg2) {
  console.log('11111');
});

/*
  function anonymous(arg1) {
    "use strict";
    var _context;
    var _x = this._x;
    var _fn0 = _x[0];
    var _result0 = _fn0(arg1);
    if(_result0 !== undefined) {
      return _result0;
    } else {

    }
  }
*/

/*function anonymous(arg1) {
  "use strict";
  var _context;
  var _x = this._x;
  var _fn0 = _x[0];
  var _result0 = _fn0(arg1);
  if (_result0 !== undefined) {
    return _result0;
  } else {
    var _fn1 = _x[1];
    var _result1 = _fn1(arg1);
    if (_result1 !== undefined) {
      return _result1;
    } else {
    }
  }
}*/

stage.tap('1', function (arg1, arg2) {
  console.log('222222');
});
// 可见SyncBailHook于SyncHook的区别在于，SyncBailHook会检查第一个绑定事件的返回值，如果存在返回值，后面的函数都不会执行，可能用于中断操作？有点类似于函数运行，遇到return就终止
// tap是水龙头，bail有往外舀水的意思，可以猜测是终止

stage.call();
