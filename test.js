const { SyncHook } = require("tapable");

// 为了便于理解，取名为EventEmitter
const EventEmitter = new SyncHook();

// tap方法用于注册事件， 其中第一个参数仅用作注释，增加可读性，源码中并没有用到这个变量
EventEmitter.tap('Event1', function (param1, param2) {
  console.log('Calling Event1');
  console.log(param1);
  console.log(param2);
});
EventEmitter.tap('Event2', function (param1, param2) {
  console.log('Calling Event2');
  console.log(param1)
  console.log(param2)
});
const arg1 = 'test1';
const arg2 = 'test2';
EventEmitter.call(arg1, arg2);/**
 * Created by yupeng on 2019/2/24.
 */
