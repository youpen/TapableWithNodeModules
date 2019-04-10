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

const stage = new AsyncSeriesHook();

stage.tapAsync('1', (next) => {
  console.log(1);
});

stage.tap('1', (next) => {
  console.log(1);
});


// 这种形式比较简单，直接将下一个注册函数在上一个函数的next函数中执行。
// function anonymous(_callback) {
//   var _context;
//   var _x = this._x;
//   var _fn0 = _x[0];
//   _fn0(_err0 => {
//     if (_err0) {
//       _callback(_err0);
//     } else {
//       var _fn1 = _x[1];
//       _fn1(_err1 => {
//         if (_err1) {
//           _callback(_err1);
//         } else {
//           _callback();
//         }
//       });
//     }
//   });
// }




stage.callAsync();