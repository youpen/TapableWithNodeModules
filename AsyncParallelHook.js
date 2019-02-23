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

const stage = new AsyncParallelHook();

stage.tapAsync('1', (next) => {
    console.log('1111', next);
    next();
});

stage.tapAsync('1', (next) => {
    console.log('2222', next);
    next(1);
});

stage.tap('1', (next) => {
    console.log('3333', next);
    next(1);
});


// 只注册一个函数的情况
// function anonymous(_callback
// ) {
//     "use strict";
//     var _context;
//     var _x = this._x;
//     var _fn0 = _x[0];
//     _fn0(_err0 => {
//         if(_err0) {
//             _callback(_err0);
//         } else {
//             _callback();
//         }
//     });
//
// }
/*
可以看出，AsyncParallelHook注册时会多出一个next函数，这个函数由我们自己决定在什么时候调用，当调用了，就会执行callAsync中注册的回调
*/


//当我们注册两个函数的时候，我们才能看到Parallel的意义，一般我们用Async系列钩子，是因为我们注册的函数中包含异步操作
//使用AsyncParallelHook，不会等待上一个注册函数中的异步操作执行完便继续执行下一个注册函数
// next函数中依旧可以传一个error参数，传入的话下一个函数也会终止
//而使用使用AsyncSeriesHook则会等待上一个注册函数的所有函数执行完才等下一步，
function anonymous(_callback
) {
    "use strict";
    var _context;
    var _x = this._x;
    do {
        var _counter = 2;
        var _done = () => {
            _callback();
        };
        if(_counter <= 0) break;
        var _fn0 = _x[0];
        _fn0(_err0 => {
            // 调用这个函数的时间不能确定，有可能已经执行了接下来的几个注册函数
            if(_err0) {
                // 如果还没执行所有注册函数，终止
                if(_counter > 0) {
                    _callback(_err0);
                    _counter = 0;
                }
            } else {
                if(--_counter === 0) _done(); // 此处--的用法效果和c一样
            }
        });
        //这个判断在注册函数没用异步调用next的情况下，对是否返回error进行检查
        if(_counter <= 0) break;
        var _fn1 = _x[1];
        var _hasError1 = false;
        // 此处好像是调用了tap的效果，上面的是调用了tapAsync
        try {
            _fn1();
        } catch(_err) {
            _hasError1 = true;
            if(_counter > 0) {
                _callback(_err);
                _counter = 0;
            }
        }
        if(!_hasError1) {
            if(--_counter === 0) _done();
        }
    } while(false);

}




stage.callAsync((err)=>{console.log(err)})
