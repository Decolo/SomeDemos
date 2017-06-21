var $ = require('jquery')
var Barrel = function() {
    function _Barrel($ct, imgNum, baseHeight) {
        this.$ct = $ct
        this.ctWidth = $ct.width()
        this.imgNum = imgNum
        this.baseHeight = baseHeight
        this.rowList = []
        this.loadImg()
    }
    _Barrel.prototype.loadImg = function() {
        var urlArr = this.getImgUrls(this.imgNum),
            _this = this

        $.each(urlArr, function(idx, url) {
            var img = new Image()
            img.src = url
            img.onload = function() {
                var ratio = this.width / this.height
                var imgInfo = {
                    target: img,
                    width: ratio * _this.baseHeight,
                    height: _this.baseHeight
                }
                _this.renderImg(imgInfo) //每加载完一次图片就渲染
                console.log('loadimg')
            }
        })
    }
    _Barrel.prototype.getImgUrls = function(num) {
        var width, height, urls = []
        for (let i = 0; i < num; i++) {
            width = Math.floor(Math.random() * 500 + 400)
            height = Math.floor(Math.random() * 500 + 300)
            urls.push(`https://unsplash.it/${width}/${height}`)
        }
        return urls
    }

    _Barrel.prototype.renderImg = function(imgInfo) {
        this.rowList.push(imgInfo)
        var rowWidthSum = 0
        var newRowHeight = 0
        var lastImgInfo = imgInfo
        for (let i = 0; i < this.rowList.length; i++) {
            rowWidthSum += this.rowList[i].width
            if (rowWidthSum > this.ctWidth) {
                rowWidthSum -= lastImgInfo.width
                this.rowList.pop()

                newRowHeight = (this.ctWidth / rowWidthSum) * this.baseHeight
                this.layOut(newRowHeight) //一行放不下了，才开始重现设置图片长宽，并渲染到页面上

                this.rowList = []
                this.rowList.push(lastImgInfo)
            }
        }
    }
    _Barrel.prototype.layOut = function(newRowHeight) {
        var _this = this
        var $rowCt = $('<div class="img-row"></div>')
        $.each(this.rowList, function(idx, item) {
            var $imgCt = $('<div class="img-box"></div>')
            var $img = $(item.target)
            var ratio = item.width / item.height
            var newImgWidth = ratio * newRowHeight
            $img.width(newImgWidth)
            $imgCt.append($img)
            $rowCt.append($imgCt)
        })
        this.$ct.append($rowCt)
    }

    return {
        init: function($ct, imgNum, baseHeight) {
            $ct.each(function(idx, node) {
                new _Barrel($(node), imgNum, baseHeight)
            })
        }
    }
}()

module.exports = Barrel


//1.获取图片地址，填装进一个arr中 
//2.对于arr中的每一项图片地址，遍历，并且等待img.onload就是指图片加载后，设置图片的信息对象。
//3.根据图片的信息对象，对图片进行木桶式布局的渲染。木桶布局是高度一样，宽度不一样，对于每一张图片，等比缩放或扩大使得高度都是基础的设定高度baseHeight。
//  3.1这时候我们首先需要一个数组，来记录加载进来，并且赋予它们新的宽度的图片的宽度值。每增添一次新的宽度值到数组中，我们就做一个判断。
//  3.2这个判断是，遍历记录宽度的数组，如果宽度之和已经大于容器了，那么这时候才去渲染页面，也就是说图片是整行整行地进行渲染的。
//  3.3对于每一行的图片来说，当它们的固定高度后等比变化的宽度的之和比容器大了，那就把最后一张图片拿掉，这个时候这行图片的宽度是不到容器的宽度的，那么将这行
//      图片整体的宽度扩大到与容器相等，注意是等比扩大，那么它们的高度肯定也就变了。
//  3.4每一张高度重新设定的图片，装填到div（img-box）中，设置它们的浮动，总宽度正好一行，再塞到容器中。
//4.完成一行的渲染，我们需要把记录图片宽度的数组清空，来记录新一行数组的宽度。这时，把上一行中最后被拿出的那张加载完成的图片的宽度，放到数组作为第一个。之后图片
//  又有新的载入，宽度输入到数组=》判断=》设置新的图片高度，使得整行宽度等于容器的宽度=》装填标签，插入到document的相应父容器中，over