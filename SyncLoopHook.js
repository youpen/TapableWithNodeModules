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

const stage = new SyncLoopHook();
let a = 10;
stage.tap('1', () => {
  console.log(a);
  a--;
  if (a < 0) {
    return
  }
  return a
});

stage.tap('1', () => {
  console.log(2);
  return undefined;
});

/*function anonymous() {
  var _context;
  var _x = this._x;
  var _loop;
  do {
    _loop = false;
    var _fn0 = _x[0];
    var _result0 = _fn0();
    if (_result0 !== undefined) {
      _loop = true;
    } else {
      var _fn1 = _x[1];
      var _result1 = _fn1();
      if (_result1 !== undefined) {
        _loop = true;
      } else {
        if (!_loop) {
        }
      }
    }
  } while (_loop);
}*/

// 从代码中可以看成， 以第一个注册的函数开始，不停的重复运行，直到返回undefined，才执行下一个注册函数
stage.call();

