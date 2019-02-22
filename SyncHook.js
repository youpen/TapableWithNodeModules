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

const stage = new SyncHook(['arg1', 'arg2', 'arg3']);

stage.tap('1', function (arg1, arg2) {
	console.log(arg1, arg2, 1)
});
stage.tap('1111', function (arg1, arg2) {
	console.log(22222)
});
/*
	call方法每次会编译出一个函数，这个函数的参数为new Hook时传入的参数列表
	内容如下
function anonymous(arg1, arg2, arg3) {
	"use strict";
	var _context;
	var _x = this._x;
	var _fn0 = _x[0];
	_fn0(arg1, arg2, arg3);
	var _fn1 = _x[1];
	_fn1(arg1, arg2, arg3);
}
每多一个tap，就会在函数体内多一遍
`
	var _fnN = _x[n]
	_fnN(...)
`

*/

stage.tap('哈哈哈哈', function (arg1, arg2) {
	console.log(22222)
});

stage.call(1,2);

// tap(option:1 )

/*
stage为emitter，stage执行call的时候就是触发
stage
*/
