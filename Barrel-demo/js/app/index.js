var Exposure = require('../com/exposure')
var Barrel = require('../com/barrel')
var $ = require('jquery')

var lazyLoad = function() {
    return {
        init: function($target, callback) {
            $target.each(function(idx, node) {
                new Exposure($(node), callback)
            })
        }
    }
}()

//底部loading一出现，就去执行回调。也就是获取图片，并用木桶布局进行渲染。
lazyLoad.init($('.load'), function() {
    Barrel.init($('.img-preview'), 17, 200)
})