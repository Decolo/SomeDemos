var FadeSlide = function() {
    function _FadeSlide($node) {
        this.$node = $node
        this.init()
        this.bindEvent()
    }
    _FadeSlide.prototype.init = function() {
        this.$btnBack = this.$node.find('.back')
        this.$btnForward = this.$node.find('.forward')
        this.$ctImg = this.$node.find('.container-img')
        this.$bullet = this.$node.find('.bullet')
        this.imgLength = this.$ctImg.children().length
        this.currentIndex = 0
        this.isAnimate = false //避免重复点击
        this.$ctImg.children().eq(0).fadeIn()
        this.autoPlay()
    }
    _FadeSlide.prototype.autoPlay = function() {
        this.clock = setInterval(() => {
            this.playNext(1)
        }, 2500)
    }
    _FadeSlide.prototype.stopPlay = function() {
        clearInterval(this.clock)
    }

    _FadeSlide.prototype.bindEvent = function() {

        this.$btnForward.on('click', () => {
            this.playNext(1)
            console.log(this.currentIndex)
        })

        this.$btnBack.on('click', () => {
            this.playPre(1)
            console.log(this.currentIndex)
        })

        this.$bullet.on('click', 'li', (e) => { //点击bullet跳转
            console.log(e.target)
            let pageJump = $(e.target).index() - this.currentIndex //点击bullet时跳转的页数
            if (pageJump > 0) {
                this.playNext(pageJump)
            } else if (pageJump < 0) {
                this.playPre(-pageJump)
            }
            console.log(this.currentIndex)
        })
    }
    _FadeSlide.prototype.playNext = function(n) {
        if (this.isAnimate) return
        this.isAnimate = true
        this.$ctImg.children().eq(this.currentIndex).fadeOut()
        if (this.currentIndex === this.imgLength - 1) {
            this.currentIndex = 0
        } else {
            this.currentIndex += n
        }
        this.$ctImg.children().eq(this.currentIndex).fadeIn(() => {
            this.isAnimate = false
        })
        this.playBullet()
    }
    _FadeSlide.prototype.playPre = function(n) {
        if (this.isAnimate) return
        this.isAnimate = true
        this.$ctImg.children().eq(this.currentIndex).fadeOut()
        if (this.currentIndex === 0) {
            this.currentIndex = (this.imgLength - 1)
        } else {
            this.currentIndex -= n
        }
        this.$ctImg.children().eq(this.currentIndex).fadeIn(() => {
            this.isAnimate = false
        })
        this.playBullet()
    }
    _FadeSlide.prototype.playBullet = function() {
        this.$bullet.children().removeClass('active').eq(this.currentIndex).addClass('active')
    }

    return {
        init: function($ct) {
            $ct.each(function(idx, node) {
                new _FadeSlide($(node))
            })
        }
    }
}()