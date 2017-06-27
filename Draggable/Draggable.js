var Draggable = function(element) {
    function _Draggable(element) {
        //初始化
        this.element = element
        this.elementWidth = this.element.offsetWidth
        this.elementHeight = this.element.offsetHeight
        this.startX = 0
        this.startY = 0
        this.mouseStartX = 0
        this.mouseStartY = 0
            //元素坐标x和y的最大值
        this.maxX = document.documentElement.clientWidth - parseInt(this.elementWidth / 2)
        this.maxY = document.documentElement.clientHeight - parseInt(this.elementHeight / 2)
            //事件绑定执行
        this.bindEvent()
    }
    _Draggable.prototype.bindEvent = function() {
        this.element.addEventListener('mousedown', this.mouseDown.bind(this))
        this.element.addEventListener('mousemove', this.mouseMove.bind(this))
        this.element.addEventListener('mouseup', this.mouseUp.bind(this))
        console.log('bind')
    }
    _Draggable.prototype.mouseDown = function(event) {
        this.element.classList.add('draggable')
            //鼠标点击时，元素的初始坐标
        this.startX = this.element.offsetLeft
        this.startY = this.element.offsetTop
            //鼠标点击时，鼠标的初始坐标
        this.mouseStartX = event.pageX
        this.mouseStartY = event.pageY
    }
    _Draggable.prototype.mouseMove = function(event) {
        if (this.element.classList.contains('draggable')) {
            //鼠标移动的水平与垂直距离

            var distanceX = event.pageX - this.mouseStartX
            var distanceY = event.pageY - this.mouseStartY
            var x = this.startX + distanceX
            var y = this.startY + distanceY
                // x= Math.min(Math.max(0,x),this.maxX)
                // y = Math.min(Math.max(0,y),this.maxY)
            if (x > (this.elementWidth / 2) && y > (this.elementHeight / 2) && x < this.maxX && y < this.maxY) {
                this.element.style.left = x + 'px'
                this.element.style.top = y + 'px'
            }


        }
    }
    _Draggable.prototype.mouseUp = function(event) {
        this.element.classList.remove('draggable')
    }
    return {
        init: function(elementsArr) {
            console.log(elementsArr.length)
            Array.prototype.forEach.call(elementsArr, function(element) {
                new _Draggable(element)
            })
        }
    }
}()