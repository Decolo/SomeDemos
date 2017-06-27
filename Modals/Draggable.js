var Draggable = (function _Draggable(element) {
        //初始化
        this.element = element
        this.elementWidth = this.element.offsetWidth
        this.elementHeight = this.element.offsetHeight
        this.startX = 0
        this.startY = 0
        this.mouseStartX = 0
        this.mouseStartY = 0
            //元素坐标x和y的最大值
        this.maxX = document.documentElement.clientWidth - this.elementWidth
        this.maxY = document.documentElement.clientHeight - this.elementHeight
            //事件绑定执行
        this.bindEvent()
    }
    _Draggable.prototype.bindEvent = function() {
        this.element.addEventListener('mousedown', this.mouseDown.bind(this))
        this.element.addEventListener('mousemove', this.mouseMove.bind(this))
        this.element.addEventListener('mouseup', this.mouseUp.bind(this))
    }
    _Draggable.prototype.mouseDown = function(event) {
        this.element.classList.add('draggable')
            //鼠标点击时，元素的初始坐标
        this.startX = this.element.offsetLeft
        this.startY = this.elementoffsetTop
            //鼠标点击时，鼠标的初始坐标
        this.mouseStartX = event.pageX
        this.mouseStartY = event.pageY
    }
    _Draggable.prototype.mouseMove = function(event) {
        if (this.element.classList.contains('draggable')) {
            //鼠标移动的水平与垂直距离
            var distanceX = event.pageX - mouseStartX
            var distanceY = event.pageY - mouseStartY
            var x = this.startX + distanceX
            var y = this.startY + distanceY
            if (x > 0 && x < this.maxX && y > 0 && y < this.maxY) {
                // x= Math.min(Math.max(0,x),this.maxX)
                // y = Math.min(Math.max(0,y),this.maxY)
                div.style.left = x + 'px'
                div.style.top = y + 'px'
            }
        }
    }
    _Draggable.prototype.mouseUp = function(event) {
        div.classList.remove('draggable')
    }
    return {
        init: funciton(elementsArr) {
            elementsArr.forEach(function(element) {
                new _Draggable(element)
            })
        }
    }
)()