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

const stage = new SyncWaterfallHook(['arg1']);

stage.tap('1', (arg) => {
  console.log('first===>', arg);
  return 10
})

stage.tap('1', (arg) => {
  console.log('second===>', arg);
  return
})


/*function anonymous(arg1) {
  var _context;
  var _x = this._x;
  var _fn0 = _x[0];
  var _result0 = _fn0(arg1);
  if (_result0 !== undefined) {
    arg1 = _result0;
  }
  var _fn1 = _x[1];
  var _result1 = _fn1(arg1);
  if (_result1 !== undefined) {
    arg1 = _result1;
  }
  return arg1;
}*/

// 前一个注册函数的返回值会直接当做下一个注册函数的参数


stage.call();
